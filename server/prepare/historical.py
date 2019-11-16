import json
from os import walk

from server.db import points
from server.db.Point import Point

floors = {
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


def parse_files():
    fnames = []
    for (dirpath, dirnames, filenames) in walk('../../data'):
        fnames.extend(filenames)
        break
    batch = []
    for fname in fnames:
        with open(f'../../data/{fname}') as f:
            try:
                data = json.load(f)
            except:
                print(fname + ' failure')
                continue
            print(fname)

            for notif in data:
                notification = notif['notifications'][0]

                deviceId = notification['deviceId']
                timest = notification['timestamp']
                floor = floors[notification['hierarchyDetails']['floor']['name']]
                lat = notification['geoCoordinate']['latitude']
                lon = notification['geoCoordinate']['longitude']

                batch.append(Point(timest, deviceId, floor, lat, lon))
                if len(batch) >= 99:
                    points.save(batch)
                    batch = []

    points.save(batch)


if __name__ == '__main__':
    # print(fetch('00:00:68:7d:04:fb'))
    parse_files()
