from backend.extensions import ma
from backend.models import User, Club, Event, Membership, EventReview

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    username = ma.auto_field()
    email = ma.auto_field()
    password = ma.auto_field()

class ClubSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Club
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()
    location = ma.auto_field()
    owner_id = ma.auto_field()

class EventSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Event
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    date = ma.auto_field()
    description = ma.auto_field()
    trees_planted = ma.auto_field()
    club_id = ma.auto_field()

class MembershipSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Membership
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    club_id = ma.auto_field()
    role = ma.auto_field()
    joined_at = ma.auto_field()

class EventReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = EventReview
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    event_id = ma.auto_field()
    rating = ma.auto_field()
    comment = ma.auto_field()
    created_at = ma.auto_field()
