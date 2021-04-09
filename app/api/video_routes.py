from flask import Blueprint, request
from app.models import db, Video
from flask_login import current_user, login_required
from app.forms import VideoForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from datetime import date
from app.api.auth_routes import validation_errors_to_error_messages

video_routes = Blueprint("videos", __name__)


@video_routes.route("/", methods=["POST"])
@login_required
def upload_video():
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "video" not in request.files:
            return {"errors": ["Please upload a video file."]}, 400

        video = request.files["video"]

        if not allowed_file(video.filename):
            return {"errors": ["Sorry, that file type is not permitted."]}, 400
        
        video.filename = get_unique_filename(video.filename)


        

        upload = upload_file_to_s3(video)

        # THIS IS WHERE IT ERRORS OUT 
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        # flask_login allows us to get the current user from the request

        new_video = Video(url=url, date=date.today())
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
    demo = True
    if user["role"] == "owner":
        demo = False
    videos = Video.query.filter(Video.type == videoType).filter(Video.demo == demo).all()
    returnObj = {}
    for video in videos:
        returnObj[video.id] = video.to_dict()
    return {"videos":returnObj}
