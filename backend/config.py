import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///treeplanting.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
