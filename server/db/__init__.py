from sqlalchemy import create_engine, orm
from sqlalchemy.ext.declarative import declarative_base

from server.common import config, DB_POOL_SIZE


_url = 'postgresql://{}:{}@{}:{}/{}'.format(
    config['db']['user'],
    config['db']['pass'],
    config['db']['host'],
    config['db']['port'],
    config['db']['db']
)

MAX_OVERFLOW = 5
engine = create_engine(_url, client_encoding='utf8', pool_size=DB_POOL_SIZE, max_overflow=MAX_OVERFLOW)
sessionmaker = orm.sessionmaker(bind=engine)
Base = declarative_base()


def get_session() -> orm.Session:
    return sessionmaker()


def db_close():
    sessionmaker.close_all()
