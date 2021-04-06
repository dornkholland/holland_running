"""added videos table

Revision ID: 19252cb75fd5
Revises: ffdc0a98111c
Create Date: 2021-04-05 10:51:12.033182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19252cb75fd5'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('videos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=400), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=5000), nullable=False),
    sa.Column('demo', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('videos')
    # ### end Alembic commands ###