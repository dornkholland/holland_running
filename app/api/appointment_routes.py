from flask import Blueprint, request
from flask_login import current_user, login_required
import datetime

appointment_routes = Blueprint("appointments", __name__)

@appointment_routes.route("/", methods=["POST"])
@login_required
def add_appointment():
    print(request.json)
    print(request.json["date"])
    print(request.json["time"])
    return {'here': 'here'};
