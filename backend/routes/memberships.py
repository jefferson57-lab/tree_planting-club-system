from flask import Blueprint, request
from backend.extensions import db
from backend.models import Membership
from backend.schemas import MembershipSchema
from flask_jwt_extended import jwt_required
from backend.utils import admin_required

memberships_bp = Blueprint('memberships', __name__)
membership_schema = MembershipSchema()
memberships_schema = MembershipSchema(many=True)

@memberships_bp.route('/', methods=['POST'])
@jwt_required()
def create_membership():
    new_membership = membership_schema.load(request.json)
    db.session.add(new_membership)
    db.session.commit()
    return membership_schema.jsonify(new_membership), 201

@memberships_bp.route('/', methods=['GET'])
def list_memberships():
    return memberships_schema.jsonify(Membership.query.all())

@memberships_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_membership(id):
    membership = Membership.query.get_or_404(id)
    db.session.delete(membership)
    db.session.commit()
    return '', 204
