import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://treeuser:treepass@localhost:5432/treeplanting'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
