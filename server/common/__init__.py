import configparser
from os import path

config = configparser.ConfigParser()
config.read(path.dirname(__file__) + '/../config.ini')
