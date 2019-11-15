from os import path

# import cassandra
from cassandra.auth import PlainTextAuthProvider
from cassandra.cluster import Cluster

from server.common import config

CONCURRENCY_LEVEL = 32
TOTAL_QUERIES = 10000
db = config['db']
auth_provider = PlainTextAuthProvider(username=db['user'], password=db['pass'])

ssl_options = {'ca_certs': path.dirname(__file__) + '/ca.pem'}

cluster = Cluster(
    contact_points=[db['host']],
    port=int(db['port']),
    auth_provider=auth_provider,
    ssl_options=ssl_options
)
session = cluster.connect()
session.execute(f"use {db['keyspace']}")
