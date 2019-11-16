from sqlalchemy import Integer, Column, String, Float, BigInteger

from server.db import engine, Base


class Point(Base):
    __tablename__ = 'points'
    ts: int = Column(BigInteger(), primary_key=True, nullable=False)
    deviceid: str = Column(String(), primary_key=True, nullable=False)
    floor: int = Column(Integer(), nullable=False)
    lat: float = Column(Float(), nullable=False)
    long: float = Column(Float(), nullable=False)

    def __init__(self, ts: int, deviceid: str, floor: int, lat: float, long: float):
        self.ts = ts
        self.deviceid = deviceid
        self.floor = floor
        self.lat = lat
        self.long = long


if __name__ == '__main__':
    Point.metadata.create_all(engine)
