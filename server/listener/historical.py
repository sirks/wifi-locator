from server.db import points

if __name__ == '__main__':
    points.save(points.Point(123, 'qwe', 2, 123.456, 654.321))
