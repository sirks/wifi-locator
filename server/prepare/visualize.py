from typing import List

import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

from server.db.points import Point, fetch_all

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


def visualize_points(points: List[Point]):
    data = np.array(
        [[p.lat, p.long, floors[p.floor]] for p in points
         if 60.1844 < p.lat < 60.1863 and 24.822 < p.long < 24.8266]
    )
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
