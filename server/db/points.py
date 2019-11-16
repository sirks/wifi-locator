from dataclasses import dataclass
from typing import List

from cassandra.query import BatchStatement, SimpleStatement

from server.db import session


@dataclass
class Point:
    ts: int
    deviceid: str
    floor: str
    lat: float
    long: float


# TODO try some cassandra ORM
point_insert = session.prepare('INSERT INTO points (ts,deviceid,floor,lat,long) VALUES (?,?,?,?,?)')
fetch_points = session.prepare('select * from points where deviceid = ? order by ts')


def save(points: List[Point]):
    batch = BatchStatement()
    for point in points:
        batch.add(point_insert, (point.ts, point.deviceid, point.floor, point.lat, point.long))
    session.execute_async(batch)


def fetch(device_id: str) -> List[Point]:
    rows = session.execute(fetch_points, (device_id,))
    return [Point(r.ts, r.deviceid, r.floor, r.lat, r.long) for r in rows]
