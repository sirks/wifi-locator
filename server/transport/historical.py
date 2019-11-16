import json
from os import walk

from server.db import points
from server.db.points import fetch


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
                floor = notification['hierarchyDetails']['floor']['name']
                lat = notification['geoCoordinate']['latitude']
                lon = notification['geoCoordinate']['longitude']

                batch.append(points.Point(timest, deviceId, floor, lat, lon))
                if len(batch) >= 99:
                    points.save(batch)
                    batch = []

    points.save(batch)


if __name__ == '__main__':
    print(fetch('00:00:68:7d:04:fb'))
    # points.save([
    #     points.Point(123, 'qwe', '2', 123.456, 654.321),
    #     points.Point(122, 'qwe', '2', 123.456, 654.321)
    # ])
    # parse_files()
    # sleep(9)
