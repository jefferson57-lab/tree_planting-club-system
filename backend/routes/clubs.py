from flask import Blueprint, request
from backend.extensions import db
from backend.models import Club
from backend.schemas import ClubSchema
from flask_jwt_extended import jwt_required
from backend.utils import admin_required

clubs_bp = Blueprint('clubs', __name__)
club_schema = ClubSchema()
clubs_schema = ClubSchema(many=True)

@clubs_bp.route('/', methods=['GET'])
def get_clubs():
    clubs = Club.query.all()
    return clubs_schema.jsonify(clubs)

@clubs_bp.route('/<int:id>', methods=['GET'])
def get_club(id):
    club = Club.query.get_or_404(id)
    return club_schema.jsonify(club)

@clubs_bp.route('/', methods=['POST'])
@jwt_required()
def create_club():
    data = request.json
    new_club = club_schema.load(data)
    db.session.add(new_club)
    db.session.commit()
    return club_schema.jsonify(new_club), 201

@clubs_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_club(id):
    club = Club.query.get_or_404(id)
    updated = club_schema.load(request.json, instance=club)
    db.session.commit()
    return club_schema.jsonify(updated)

@clubs_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_club(id):
    club = Club.query.get_or_404(id)
    db.session.delete(club)
    db.session.commit()
    return '', 204
