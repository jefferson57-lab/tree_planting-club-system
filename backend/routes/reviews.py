from flask import Blueprint, request
from backend.extensions import db
from backend.models import EventReview
from backend.schemas import EventReviewSchema

reviews_bp = Blueprint('reviews', __name__)
review_schema = EventReviewSchema()
reviews_schema = EventReviewSchema(many=True)

@reviews_bp.route('/', methods=['GET'])
def get_reviews():
    return reviews_schema.jsonify(EventReview.query.all())

@reviews_bp.route('/<int:id>', methods=['GET'])
def get_review(id):
    return review_schema.jsonify(EventReview.query.get_or_404(id))

@reviews_bp.route('/', methods=['POST'])
def create_review():
    review = review_schema.load(request.json)
    db.session.add(review)
    db.session.commit()
    return review_schema.jsonify(review), 201

@reviews_bp.route('/<int:id>', methods=['PUT'])
def update_review(id):
    review = EventReview.query.get_or_404(id)
    updated = review_schema.load(request.json, instance=review)
    db.session.commit()
    return review_schema.jsonify(updated)

@reviews_bp.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = EventReview.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return '', 204
