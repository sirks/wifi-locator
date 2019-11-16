import asyncio
import json
import traceback
from typing import Callable, List

import aiohttp
from aiohttp import ClientSession

from server.common import loop
from server.db import points
from server.db.points import Point

URL = 'http://13.48.149.61:8000/notifycache.json'
FLOORS = {
    '0': 0,
    '0krs': 0,
    '0-krs': 0,
    '1': 1,
    '1krs': 1,
    '1-krs': 1,
    '2': 2,
    '2 krs': 2,
    '3': 3,
    '3krs': 3
}


async def listen(callback: Callable[[List[Point]], None]):
    while True:
        await asyncio.sleep(5)
        callback(points.fetch('00:00:31:92:96:4b'))


async def manage_points():
    session = aiohttp.ClientSession()
    while True:
        await asyncio.sleep(1)
        loop.create_task(get_points_once(session))


async def get_points_once(session: ClientSession):
    resp = await session.get(URL)
    try:
        raw = await resp.content.read()
        if not raw:
            return

        # cripple_json = '[' + raw.decode("utf-8").replace('\\n', '').replace('} {', '},{').strip('\n, ') + ']'
        cripple_json = '[' + raw.decode("utf-8").strip('\n, ') + ']'
        json_points = json.loads(cripple_json)
        batch = []
        for notif in json_points:
            notification = notif['notifications'][0]
            lat = notification['geoCoordinate']['latitude']
            if not (60.1844 < lat < 60.1863):
                continue
            long = notification['geoCoordinate']['longitude']
            if not (24.822 < long < 24.8266):
                continue
            deviceId = notification['deviceId']
            timestamp = notification['timestamp']
            floor = FLOORS[notification['hierarchyDetails']['floor']['name']]

            batch.append(Point(timestamp, deviceId, floor, lat, long))
            if len(batch) >= 999:
                points.save(batch)
                batch = []
        points.save(batch)
    except:
        traceback.print_exc()


if __name__ == '__main__':
    loop.run_until_complete(manage_points())
    loop.run_forever()
