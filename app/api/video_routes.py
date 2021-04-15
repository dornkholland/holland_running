from flask import Blueprint, request
from app.models import db, Video
from flask_login import current_user, login_required
from app.forms import VideoForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)
from datetime import date
from app.api.auth_routes import validation_errors_to_error_messages

video_routes = Blueprint("videos", __name__)


@video_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": ["Please upload a thumbnail."]}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": ["Sorry, that file type is not permitted."]}, 400
        
        image.filename = get_unique_filename(image.filename)


        

        upload = upload_file_to_s3(image)

        # THIS IS WHERE IT ERRORS OUT 
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        # flask_login allows us to get the current user from the request

        new_video = Video(thumbnail_url=url, created_at=date.today())
        form.populate_obj(new_video)
        db.session.add(new_video)
        db.session.commit()
        return {"url": url}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@video_routes.route ("/<videoId>/byId")
@login_required
def get_video(videoId):
    user = current_user.to_dict()
    premium = False
    if user["role"] == "owner":
        premium = True
    video = Video.query.filter(Video.id == videoId).one()
    if premium or video.demo:
        return {"video": video.to_dict()}
    else:
        return {"errors": "not authorized"}, 401

@video_routes.route ("/<videoType>/")
@login_required
def get_videos(videoType):
    user = current_user.to_dict()
    if user["role"] == "owner":
        videos = Video.query.filter(Video.type == videoType).all()
    else:
        videos = Video.query.filter(Video.type == videoType).filter(Video.demo == True).all()
    returnObj = {}
    for video in videos:
        returnObj[video.id] = video.to_dict()
    return {"videos":returnObj}

@video_routes.route ("/<videoId>/", methods=["DELETE"])
@login_required
def delete_video(videoId):
    videoUrl = request.get_json()['thumbnail_url']
    print(videoUrl.split("/")[-1])
    fileName = videoUrl.split('/')[-1]
    s3_delete = delete_file_from_s3(fileName)
    print(s3_delete)
    if s3_delete["response"]:
        video = Video.query.filter(Video.id == videoId).delete()
        db.session.commit()
    return {"video": videoId}
    return {"errors": s3_delete["errors"]}

@video_routes.route ("/<videoId>/", methods=["PUT"])
@login_required
def update_video(videoId):
    video = Video.query.filter_by(id=videoId).one()
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": ["Sorry, that file type is not permitted."]}, 400
        fileName = video.thumbnail_url.split('/')[-1]
        image.filename = fileName
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(video)
        db.session.commit()
        print(video)
        return {"video": video.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        

