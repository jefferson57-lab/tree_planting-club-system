"""Set default value for role column in user table

Revision ID: 20250702_set_default_role
Revises: 
Create Date: 2025-07-02 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20250702_set_default_role'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.alter_column('user', 'role',
        existing_type=sa.VARCHAR(length=20),
        nullable=False,
        server_default='user'
    )

def downgrade():
    op.alter_column('user', 'role',
        existing_type=sa.VARCHAR(length=20),
        nullable=False,
        server_default=None
    )