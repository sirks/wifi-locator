import asyncio
import json
import traceback

import aiohttp
from aiohttp import ClientSession

from server.common import loop, log
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

suspects = [
    '00:00:ed:57:a2:34',
    '00:00:77:b4:4e:62',
]


# _lat: np.ndarray = np.array([60.18539896897931])
# _long: np.ndarray = np.array([24.824788179242226])

# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.scatter(_lat, _long, s=1, c='r')


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
            confidence = notification['confidenceFactor']

            point = Point(timestamp, deviceId, floor, lat, long, confidence)
            batch.append(point)
            if deviceId in suspects:
                # global _lat, _long
                # _lat = np.append(_lat, [lat])
                # _long = np.append(_long, [long])
                # ax.scatter(_lat, _long, s=1, c='r')
                # plt.pause(0.1)
                log.info(point)
    except:
        traceback.print_exc()


if __name__ == '__main__':
    loop.run_until_complete(manage_points())
    loop.run_forever()
