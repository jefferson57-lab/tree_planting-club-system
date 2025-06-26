from flask import Flask
from backend.extensions import db, ma
from backend.config import Config
from backend.routes.clubs import clubs_bp
from backend.routes.events import events_bp
from backend.routes.memberships import memberships_bp
from backend.routes.reviews import reviews_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)

    # Register blueprints
    app.register_blueprint(clubs_bp, url_prefix='/api/clubs')
    app.register_blueprint(events_bp, url_prefix='/api/events')
    app.register_blueprint(memberships_bp, url_prefix='/api/memberships')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')

    return app
