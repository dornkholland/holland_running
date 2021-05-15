from flask import Blueprint, request
from flask_login import current_user, login_required
import datetime

appointment_routes = Blueprint("appointments", __name__)

@appointment_routes.route("/", methods=["POST"])
@login_required
def add_appointment():
    print(request.json)
    print(request.json["date"].split("T")[0])
    dateString = request.json["date"].split("T")[0].split("-")
    date = list(map(lambda x: int(x), dateString))
    timeString = request.json["time"].split(":")
    time = list(map(lambda x: int(x), timeString))
    print (datetime.datetime(*date, *time))
    return {'here': 'here'};
