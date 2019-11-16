import asyncio
from typing import Callable, List

from server.db import points
from server.db.points import Point


async def listen(callback: Callable[[List[Point]], None]):
    while True:
        await asyncio.sleep(5)
        callback(points.fetch('00:00:99:77:ba:4a'))


if __name__ == '__main__':
    pass
    # loop.run_until_complete(start_server)
