from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(first_name='demo', last_name='user', email='demo@user.com',
                hashed_password=generate_password_hash('password'), role='user')
    owner = User(first_name='demo', last_name='owner', email='demo@owner.com',
                hashed_password=generate_password_hash('password'), role='owner')

    db.session.add(demo)
    db.session.add(owner)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
