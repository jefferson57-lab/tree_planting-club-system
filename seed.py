from backend.app import create_app
from backend.extensions import db
from backend.models import User, Club, Event, Membership, EventReview
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    user = User(username="admin", email="admin@example.com", password=generate_password_hash("password"))
    db.session.add(user)
    db.session.commit()

    club = Club(name="Green Earth", description="We plant trees weekly", location="NYC", owner_id=user.id)
    db.session.add(club)
    db.session.commit()

    event = Event(name="Park Cleanup", date="2025-07-01", description="Plant 100 trees", trees_planted=100, club_id=club.id)
    db.session.add(event)
    db.session.commit()
