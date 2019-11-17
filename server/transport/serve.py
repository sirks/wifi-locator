import json
from random import choice

from flask import Flask
from flask_cors import CORS

from server.db.points import fetch_active, fetch


app = Flask(__name__)
CORS(app)

active_device_ids = fetch_active()


@app.route('/points')
def points():
    device_id = choice(active_device_ids)
    return json.dumps([{'lat': point.lat, 'long': point.long, 'floor': point.floor} for point in fetch(device_id)])


def start():
    app.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    start()
