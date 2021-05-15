from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Appointment, db
import datetime


appointment_routes = Blueprint("appointments", __name__)

@appointment_routes.route("/", methods=["POST"])
@login_required
def add_appointment():
    print(request.json)
    data = request.json
    print(request.json["date"].split("T")[0])
    dateString = request.json["date"].split("T")[0].split("-")
    date = list(map(lambda x: int(x), dateString))
    timeString = request.json["time"].split(":")
    time = list(map(lambda x: int(x), timeString))
    dateData = datetime.datetime(*date, *time)
    dateData += datetime.timedelta(minutes=data["offset"])

    new_appointment = Appointment(date_time=dateData, availability=True)
    db.session.add(new_appointment)
    db.session.commit()
    print(dateData)
    return {'appointment': new_appointment.to_dict()};
