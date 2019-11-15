from server.db import points
import json
from os import walk

def parse_files():
    fnames = []
    for (dirpath, dirnames, filenames) in walk('../../historical'):
        fnames.extend(filenames)
        break
    fnames = [fnames[0]]
    print(fnames)
    batch = []
    for fname in fnames:
        with open(f'../../historical/{fname}') as f:
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

    points.save(batch)
                

if __name__ == '__main__':
    # points.save(points.Point(123, 'qwe', 2, 123.456, 654.321))
    parse_files()
