import asyncio
from typing import Callable, List

from server.db import points
from server.db.points import Point


async def listen(callback: Callable[[List[Point]], None]):
    while True:
        await asyncio.sleep(5)
        callback(points.fetch('00:00:31:92:96:4b'))


if __name__ == '__main__':
    pass
    # loop.run_until_complete(start_server)
