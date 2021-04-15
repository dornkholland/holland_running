from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField
from wtforms.validators import DataRequired 


class VideoForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    vimeo_url = StringField('vimeo_url', validators=[DataRequired()])
    demo = BooleanField('demo')
