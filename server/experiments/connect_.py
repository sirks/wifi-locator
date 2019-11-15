"""
Inserts multiple rows in a table asynchronously, limiting the amount
of parallel requests with a Queue.
"""

import time
import uuid
from ssl import SSLContext

from cassandra.auth import PlainTextAuthProvider
from six.moves import queue

from cassandra.cluster import Cluster

CONCURRENCY_LEVEL = 32
TOTAL_QUERIES = 10000

auth_provider = PlainTextAuthProvider(username='cassandra', password='cassandra')
ssl_options = {'ca_certs': 'ca.pem'}
ssl_context = SSLContext.wrap_socket(**ssl_options)

cluster = Cluster(
    contact_points=['cassandra-ae06c69-stukens-9f1f.aivencloud.com'],
    port=15513,
    auth_provider=auth_provider
)
session = cluster.connect()

session.execute(("CREATE KEYSPACE IF NOT EXISTS examples "
                 "WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }"))
session.execute("USE examples")
session.execute("CREATE TABLE IF NOT EXISTS tbl_sample_kv (id uuid, value text, PRIMARY KEY (id))")
prepared_insert = session.prepare("INSERT INTO tbl_sample_kv (id, value) VALUES (?, ?)")


def clear_queue():
    while True:
        try:
            futures.get_nowait().result()
        except queue.Empty:
            break


start = time.time()
futures = queue.Queue(maxsize=CONCURRENCY_LEVEL)

# Chunking way, when the max concurrency level is reached, we
# wait the current chunk of requests to finish
for i in range(TOTAL_QUERIES):
    future = session.execute_async(prepared_insert, (uuid.uuid4(), str(i)))
    try:
        futures.put_nowait(future)
    except queue.Full:
        clear_queue()
        futures.put_nowait(future)

clear_queue()
end = time.time()

print("Finished executing {} queries with a concurrency level of {} in {:.2f} seconds.".
    format(TOTAL_QUERIES, CONCURRENCY_LEVEL, (end - start)))
