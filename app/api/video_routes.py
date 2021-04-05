from flask import Blueprint, request
from app.models import db, Video
from flask_login import current_user, login_required
from app.forms import VideoForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint("videos", __name__)


@video_routes.route("/", methods=["POST"])
@login_required
def upload_video():
    form = VideoForm()
    if "video" not in request.files:
        return {"errors": "video required"}, 400

    video = request.files["video"]

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400
    
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

    new_video = Video(url=url)
    form.populate_obj(new_video)
    db.session.add(new_video)
    db.session.commit()
    return {"url": url}
