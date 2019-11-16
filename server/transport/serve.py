import asyncio
from dataclasses import dataclass
from time import time
from typing import List

import websockets
from websockets import WebSocketServerProtocol

from server.common import loop, log
from server.db.points import Point


@dataclass
class Path:
    ts: float
    points: List[Point]


path = Path(time(), [])


def update_points(points_: List[Point]):
    path.points = [(p.ts, p.long, p.lat) for p in points_]
    path.ts = time()


async def subscribe(websocket: WebSocketServerProtocol, uri):
    log.info('client subscribed')
    last_shown = time()
    while websocket.open:
        if path.ts > last_shown:
            # await websocket.send(1)
            await websocket.send(str(path.points))
            last_shown = path.ts
            log.info('data sent')
        await asyncio.sleep(1)
    log.info('client unsubscribed')


start_server = websockets.serve(subscribe, "localhost", 8888)

if __name__ == '__main__':
    loop.run_until_complete(start_server)
    loop.run_forever()
