from flask import Blueprint, request
from backend.extensions import db
from backend.models import Event
from backend.schemas import EventSchema
from flask_jwt_extended import jwt_required
from backend.utils import admin_required

events_bp = Blueprint('events', __name__)
event_schema = EventSchema()
events_schema = EventSchema(many=True)

@events_bp.route('/', methods=['GET'])
def get_events():
    return events_schema.jsonify(Event.query.all())

@events_bp.route('/<int:id>', methods=['GET'])
def get_event(id):
    return event_schema.jsonify(Event.query.get_or_404(id))

@events_bp.route('/', methods=['POST'])
@jwt_required()
def create_event():
    new_event = event_schema.load(request.json)
    db.session.add(new_event)
    db.session.commit()
    return event_schema.jsonify(new_event), 201

@events_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_event(id):
    event = Event.query.get_or_404(id)
    updated = event_schema.load(request.json, instance=event)
    db.session.commit()
    return event_schema.jsonify(updated)

@events_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return '', 204
