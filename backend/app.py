from flask import Flask
from backend.extensions import db, ma
from backend.config import Config
from backend.routes.clubs import clubs_bp
from backend.routes.events import events_bp
from backend.routes.memberships import memberships_bp
from backend.routes.reviews import reviews_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from backend.routes.auth import auth_bp  # <-- Add this import
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production!

    db.init_app(app)
    ma.init_app(app)
    CORS(app)
    JWTManager(app)
    Migrate(app, db)  # <-- Add this line

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')  # <-- Register auth blueprint
    app.register_blueprint(clubs_bp, url_prefix='/api/clubs')
    app.register_blueprint(events_bp, url_prefix='/api/events')
    app.register_blueprint(memberships_bp, url_prefix='/api/memberships')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')

    return app
