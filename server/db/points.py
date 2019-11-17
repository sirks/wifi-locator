from typing import List

from sqlalchemy.engine import ResultProxy

from server.db import get_session
from server.db.Point import Point


# TODO try some cassandra ORM
def save(points: List[Point]):
    ses = get_session()
    insert_sql = 'insert into points values '
    insert_sql += ','.join(
        f"({point.ts},'{point.deviceid}',{point.floor},{point.lat},{point.long},{point.confidence})"
        for point in points
    )
    insert_sql += ' on conflict do nothing'
    ses.execute(insert_sql)
    ses.commit()
    ses.close()


def fetch(device_id: str) -> List[Point]:
    ses = get_session()
    points = ses.query(Point).filter(Point.deviceid == device_id).order_by(Point.ts.asc()).all()
    ses.close()
    return points


def fetch_active() -> List[str]:
    ses = get_session()
    sql = 'select deviceid from points group by deviceid having count(1)>99'
    reuslt: ResultProxy = ses.execute(sql)
    ses.close()
    return [d[0] for d in reuslt.fetchall()]


def fetch_all() -> List[Point]:
    ses = get_session()
    rows = ses.query(Point).all()
    ses.close()
    return rows
