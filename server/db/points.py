from dataclasses import dataclass

from server.db import session


@dataclass
class Point:
    ts: int
    deviceid: str
    floor: int
    lat: float
    long: float


point_insert = session.prepare(
    'INSERT INTO points (ts,deviceid,floor,lat,long) VALUES (?,?,?,?,?)'
)


def save(point: Point):
    session.execute_async(point_insert, (point.ts, point.deviceid, point.floor, point.lat, point.long))
