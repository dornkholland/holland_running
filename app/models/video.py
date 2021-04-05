from .db import db


class Video(db.Model):
  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key = True)
  url = db.Column(db.String(400), nullable = False)
  type = db.Column(db.String(40), nullable = False)
  name = db.Column(db.String(255), nullable = False)
  description = db.Column(db.String(5000), nullable = False)
  demo = db.Column(db.Boolean(), nullable = False)


