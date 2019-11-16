from server.common import loop
from server.transport.client import listen
from server.transport.serve import start_server, update_points

if __name__ == '__main__':
    loop.run_until_complete(start_server)
    loop.create_task(listen(update_points))
    loop.run_forever()
    loop.close()
