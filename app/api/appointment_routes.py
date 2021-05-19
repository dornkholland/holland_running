from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Appointment, db
import datetime


appointment_routes = Blueprint("appointments", __name__)


@appointment_routes.route("/<date>/<offset>/")
@login_required
def get_availability(date, offset):
    user = current_user.to_dict()

    # get availability
    appointmentsQuery = Appointment.query.filter(Appointment.availability == True).all()
    def appointmentFormatter(appointment):
        updated = appointment.to_dict();
        updated["date_time"] -= datetime.timedelta(minutes = int(offset))
        return updated;
    appointments = list(map(appointmentFormatter, appointmentsQuery))
    # appointments = list(filter(lambda x: (x["date_time"] - datetime.timedelta(days=int(offset))).date() == date, appointments))
    appointments = list(filter(lambda x: x['date_time'].strftime("%Y-%m-%d") == date, appointments))
    return_dict = {}
    for appointment in appointments:
        return_dict[appointment["date_time"].strftime("%H:%M")] = appointment

    # get booked appointments
    if user["role"] == "owner":
        appointmentsQuery = Appointment.query.filter(Appointment.availability == False).all()
    else:
        appointmentsQuery = Appointment.query.filter(Appointment.user_id == user["id"]).all()
    appointments = list(map(appointmentFormatter, appointmentsQuery))
    booked = list(filter(lambda x: x['date_time'] >= datetime.datetime.now(), appointments))
    return_2 = {}
    for appointment in booked:
        return_2[appointment["date_time"].strftime("%H:%M")] = appointment

    return {"available": {**return_dict},
            "booked": {**return_2},
            }

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

@appointment_routes.route("/", methods=["PUT"])
@login_required
def book_appointment():
    data = request.json
    print(data)
    dateString = request.json["date"].split("T")[0].split("-")
    date = list(map(lambda x: int(x), dateString))
    timeString = request.json["time"].split(":")
    time = list(map(lambda x: int(x), timeString))
    dateData = datetime.datetime(*date, *time)
    dateData += datetime.timedelta(minutes=data["offset"])

    user = current_user.to_dict()

    to_book = Appointment.query.filter(Appointment.date_time == dateData).first()
    to_book.availability = False
    print (to_book.availability)
    to_book.user_id = user["id"]
    db.session.commit()
    print(to_book.to_dict())
    return_dict = to_book.to_dict()
    return {(return_dict["date_time"] - datetime.timedelta(minutes=data["offset"])).strftime("%H:%M") : return_dict};

