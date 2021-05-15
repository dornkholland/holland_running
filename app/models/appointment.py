from .db import db


class Appointment(db.Model):
  __tablename__ = 'appointments'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date(), nullable = False)
  thumbnail_url = db.Column(db.String(400), nullable = False)
  type = db.Column(db.String(40), nullable = False)
  name = db.Column(db.String(255), nullable = False)
  description = db.Column(db.String(5000), nullable = False)
  demo = db.Column(db.Boolean(), nullable = False)
  created_at = db.Column(db.Date(), nullable = False)


  def to_dict(self):
    return {
      "id": self.id,
      "vimeo_url": self.vimeo_url,
      "thumbnail_url": self.thumbnail_url,
      "type": self.type,
      "name": self.name,
      "description": self.description,
      "demo": self.demo,
      "created_at": self.created_at
    }
