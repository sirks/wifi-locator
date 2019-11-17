from time import sleep
from typing import List

import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

from server.db.points import Point, fetch, fetch_all


def visualize_points(points: List[Point]):
    data = np.array([[p.lat, p.long, p.floor] for p in points if p.floor == 0])
    fig = plt.figure()
    # ax = fig.add_subplot(111, projection='3d')
    ax = fig.add_subplot(111)
    lat = data[:, 0]
    long = data[:, 1]
    floor = data[:, 2]
    # ax.scatter(lat, long, floor, s=1, c='r')
    ax.scatter(lat, long, s=1)
    # for i in range(len(points)):
    #     lat = data[:i, 0]
    #     long = data[:i, 1]
    #     floor = data[:i, 2]
    # ax.scatter(lat, long, s=1, c=data[:i, 2])
    # plt.pause(0.1)
    plt.show()


if __name__ == '__main__':
    # points = fetch('00:00:68:7d:04:fb')
    points = fetch_all()
    visualize_points(points)
