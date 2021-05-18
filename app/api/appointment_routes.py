from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Appointment, db
import datetime


appointment_routes = Blueprint("appointments", __name__)


@appointment_routes.route("/<date>/<offset>/")
@login_required
def get_availability(date, offset):
    appointmentsQuery = Appointment.query.filter(Appointment.availability == True).all()
    def appointmentFormatter(appointment):
        updated = appointment.to_dict();
        updated["date_time"] -= datetime.timedelta(minutes = int(offset))
        return updated;
    appointments = list(map(appointmentFormatter, appointmentsQuery))
    for appointment in appointments: 
        print(appointment["date_time"].date())
    # appointments = list(filter(lambda x: (x["date_time"] - datetime.timedelta(days=int(offset))).date() == date, appointments))
    appointments = list(filter(lambda x: x['date_time'].strftime("%Y-%m-%d") == date, appointments))
    return_dict = {}
    for appointment in appointments:
        return_dict[appointment["date_time"].strftime("%H:%M")] = appointment
    print (return_dict)
    return return_dict

    # add timedelta logic here


@appointment_routes.route("/", methods=["POST"])
@login_required
def add_appointment():
    data = request.json
    dateString = request.json["date"].split("T")[0].split("-")
    date = list(map(lambda x: int(x), dateString))
    timeString = request.json["time"].split(":")
    time = list(map(lambda x: int(x), timeString))
    dateData = datetime.datetime(*date, *time)
    dateData += datetime.timedelta(minutes=data["offset"])

    new_appointment = Appointment(date_time=dateData, availability=True)
    db.session.add(new_appointment)
    db.session.commit()
    return {(new_appointment.date_time - datetime.timedelta(minutes=data["offset"])).strftime("%H:%M"): new_appointment.to_dict()};

@appointment_routes.route("/", methods=["DELETE"])
@login_required
def delete_appointment():
    data = request.json
    dateString = request.json["date"].split("T")[0].split("-")
    date = list(map(lambda x: int(x), dateString))
    timeString = request.json["time"].split(":")
    time = list(map(lambda x: int(x), timeString))
    dateData = datetime.datetime(*date, *time)
    dateData += datetime.timedelta(minutes=data["offset"])

    to_delete = Appointment.query.filter(Appointment.date_time == dateData).one()
    db.session.delete(to_delete)
    db.session.commit()
    return_dict = to_delete.to_dict()
    return {(return_dict["date_time"] - datetime.timedelta(minutes=data["offset"])).strftime("%H:%M") : return_dict};
