from dataclasses import dataclass
from typing import List

from cassandra.query import BatchStatement

from server.db import session


@dataclass
class Point:
    ts: int
    deviceid: str
    floor: str
    lat: float
    long: float


point_insert = session.prepare(
    'INSERT INTO points (ts,deviceid,floor,lat,long) VALUES (?,?,?,?,?)'
)


def save(points: List[Point]):
    batch = BatchStatement()
    for point in points:
        batch.add(point_insert, (point.ts, point.deviceid, point.floor, point.lat, point.long))
    session.execute_async(batch)
