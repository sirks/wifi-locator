from typing import List

import matplotlib.pyplot as plt
import numpy as np

from server.db.points import Point, fetch_all


def visualize_points(points: List[Point]):
    data = np.array([[p.lat, p.long, p.floor] for p in points])
    lat = data[:, 0]
    long = data[:, 1]
    floor = data[:, 2]
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(lat, long, floor, s=1)
    plt.show()


if __name__ == '__main__':
    # points = fetch('00:00:68:7d:04:fb')
    points = fetch_all()
    visualize_points(points)
