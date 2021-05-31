from .db import db 
from app.models import User


class Appointment(db.Model):
  __tablename__ = 'appointments'

  id = db.Column(db.Integer, primary_key = True)
  date_time = db.Column(db.DateTime, nullable = False)
  availability = db.Column(db.Boolean, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  user = db.relationship(User, backref=db.backref('users'))


  def to_dict(self):
    return {
      "id": self.id,
      "date_time": self.date_time,
      "availability": self.availability,
      "user_id": self.user_id,
    }
