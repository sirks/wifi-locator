import asyncio
import configparser
import logging
from concurrent.futures.thread import ThreadPoolExecutor
from os import path

from server.common.VipLoop import VipLoopPolicy

log = logging
log.basicConfig(format='%(asctime)s %(threadName)s %(message)s', level=log.INFO)
config = configparser.ConfigParser()
config.read(path.dirname(__file__) + '/../config.ini')
asyncio.set_event_loop_policy(VipLoopPolicy())
loop: VipLoop = asyncio.get_event_loop()

DB_POOL_SIZE = 20
db_pool = ThreadPoolExecutor(max_workers=DB_POOL_SIZE, thread_name_prefix='d')
