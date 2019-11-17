import React, {useEffect, useState} from "react";
import "./App.css";

/**
 * 60.186099, 24.824482
 */
const LAT_MAX = 60.18623494565414;
const LAT_MIN = 60.184588771371594;

const LONG_MAX = 24.82630950411653;
const LONG_MIN = 24.82260691123721;

const LAT_DIFF = LAT_MAX - LAT_MIN;
const LONG_DIFF = LONG_MAX - LONG_MIN;

const getX = point => (point.long - LONG_MIN) / LONG_DIFF * 100;
const getY = point => (LAT_MAX - point.lat) / LAT_DIFF * 100;

const UltimateDogo = ({fill}) => {
  return (
    <svg width="30px" height="27px" viewBox="0 0 254 276" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="#000000ff">
        <path fill="#000000" opacity="1.00"
              d=" M 67.04 28.07 C 67.51 21.27 67.18 14.04 70.39 7.83 C 71.58 17.76 73.36 27.62 76.00 37.27 C 76.42 39.60 77.70 42.70 75.52 44.55 C 72.31 46.98 68.94 49.29 65.28 51.01 C 66.19 43.39 66.39 35.71 67.04 28.07 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 189.30 38.29 C 193.54 32.35 199.84 28.20 203.74 21.98 C 206.45 27.68 208.41 33.73 209.87 39.87 C 212.12 50.78 209.87 61.95 206.68 72.42 C 203.79 82.54 202.26 94.24 207.97 103.66 C 194.31 91.89 178.47 82.18 167.40 67.64 C 166.10 66.37 165.27 64.76 165.11 62.93 C 168.12 61.37 169.86 58.44 172.00 55.96 C 177.72 50.03 183.71 44.35 189.30 38.29 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 44.97 91.86 C 49.08 86.22 59.68 87.08 62.06 93.93 C 63.37 98.17 62.59 103.25 59.56 106.58 C 55.99 109.14 51.62 111.91 47.06 110.16 C 44.39 107.68 45.31 103.23 45.92 100.01 C 46.93 95.81 51.72 95.11 55.36 94.96 C 54.40 92.13 51.19 93.02 48.89 93.03 C 44.35 93.80 42.20 98.78 41.34 102.73 C 41.26 98.83 42.72 95.00 44.97 91.86 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 114.57 104.53 C 121.54 99.85 129.97 103.69 136.31 107.57 C 138.34 109.94 141.17 111.39 143.42 113.51 C 144.37 115.86 141.37 117.54 140.35 119.42 C 135.17 123.80 128.09 125.82 121.37 125.65 C 119.22 121.51 117.34 116.68 118.95 112.03 C 120.26 109.34 123.37 109.33 125.93 108.93 C 125.56 105.29 120.67 105.90 117.93 105.99 C 113.16 105.91 110.46 110.90 110.09 115.08 C 109.94 118.04 109.28 122.14 112.65 123.57 C 111.81 123.66 110.79 123.77 110.30 122.88 C 108.29 121.27 105.42 120.46 104.23 118.05 C 105.36 112.23 110.41 108.31 114.57 104.53 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 36.40 131.14 C 39.54 128.20 42.20 124.80 45.77 122.35 C 44.34 127.10 38.24 128.25 36.39 132.82 C 46.00 131.75 56.71 132.27 64.58 138.55 C 68.24 142.12 69.20 149.49 64.36 152.51 C 57.14 157.97 50.09 164.70 41.03 166.74 C 33.22 166.90 29.38 158.88 26.77 152.74 C 28.84 150.92 31.80 151.38 34.31 150.78 C 32.52 148.74 29.68 148.19 27.62 146.48 C 26.91 145.45 26.13 144.47 25.33 143.52 C 27.21 138.06 31.80 134.29 36.40 131.14 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 25.94 175.26 C 27.96 175.48 29.95 176.07 31.99 176.03 C 34.73 175.72 37.27 174.37 40.04 174.29 C 47.99 175.07 55.06 178.97 62.47 181.60 C 67.28 183.38 71.77 186.34 77.04 186.56 C 87.08 187.92 96.68 183.48 106.62 183.36 C 105.86 184.63 104.92 185.82 103.54 186.44 C 95.34 190.63 86.07 191.76 77.03 192.71 C 71.71 193.25 66.31 192.12 61.58 189.66 C 52.62 186.51 44.28 181.63 34.94 179.55 C 31.70 178.80 28.07 178.09 25.94 175.26 Z"/>
        <path fill="#000000" opacity="1.00"
              d=" M 25.56 223.34 C 29.11 226.68 31.63 230.92 34.36 234.93 C 35.79 235.23 36.50 234.49 36.48 232.72 C 39.37 236.10 42.37 239.42 46.02 242.02 C 49.49 244.63 53.03 248.91 57.85 247.92 C 58.09 247.61 58.55 246.99 58.78 246.68 C 64.14 249.81 70.11 252.24 76.27 253.16 C 75.98 251.35 74.94 249.85 73.53 248.75 C 87.32 250.12 101.15 251.79 115.03 250.82 C 115.59 249.96 115.45 249.16 114.61 248.42 C 124.88 246.55 135.17 244.84 145.40 242.80 C 143.24 239.62 138.55 241.11 135.32 240.44 C 135.33 240.23 135.34 239.81 135.35 239.59 C 140.72 238.68 145.19 235.38 150.15 233.36 C 157.49 230.25 164.29 225.88 171.96 223.58 C 173.31 223.10 174.76 223.16 176.17 223.15 C 175.62 225.20 173.12 224.71 171.58 225.47 C 162.75 229.08 155.32 235.32 146.76 239.46 C 148.17 241.99 152.51 240.63 153.16 243.63 C 143.94 244.84 134.88 247.05 125.65 248.17 C 126.33 249.54 127.77 250.06 129.08 250.66 C 119.53 254.35 109.11 254.67 99.02 255.54 C 93.25 255.81 87.57 254.45 81.85 253.86 C 81.82 254.63 81.76 256.19 81.73 256.97 C 74.35 256.28 68.00 251.70 60.69 250.86 C 61.19 251.70 61.70 252.54 62.22 253.38 C 61.78 253.65 61.33 253.92 60.88 254.20 C 56.50 252.59 52.72 249.78 49.22 246.75 C 45.13 243.92 42.08 239.66 37.36 237.77 C 36.96 239.25 36.75 240.88 35.66 242.05 C 30.93 236.70 27.97 229.99 25.56 223.34 Z"/>
      </g>
      <g id="#d8d8d8ff">
        <path fill={fill} opacity="1.00"
              d=" M 70.09 0.00 L 73.85 0.00 C 79.02 4.76 81.32 11.67 83.50 18.15 C 87.13 27.18 96.59 31.57 101.91 39.36 C 107.26 39.79 112.55 40.75 117.84 41.68 C 128.08 43.47 138.56 42.04 148.81 43.73 C 153.12 44.26 157.62 45.33 161.89 44.11 C 173.12 33.22 185.38 23.42 196.74 12.66 C 200.20 10.33 203.52 6.38 208.10 7.02 C 210.63 7.37 211.95 9.80 213.39 11.63 C 222.13 26.05 225.32 43.40 223.72 60.09 C 222.27 69.24 217.27 77.51 217.43 86.97 C 219.34 87.33 221.26 87.68 223.17 88.02 C 222.94 89.39 222.71 90.76 222.48 92.13 C 223.39 93.53 224.29 95.04 223.64 96.76 C 225.01 98.23 226.23 99.85 227.09 101.69 C 226.24 103.89 227.26 106.10 227.06 108.34 C 228.15 109.04 229.21 109.71 230.34 110.40 C 229.67 110.77 228.35 111.50 227.69 111.87 C 229.61 114.70 231.36 117.67 232.31 120.98 C 231.28 121.53 230.25 122.08 229.23 122.64 C 229.74 124.76 230.28 126.98 229.46 129.10 C 230.20 132.49 232.30 135.27 233.86 138.29 C 237.92 148.15 236.85 159.28 240.83 169.17 C 245.05 179.14 249.46 189.16 251.57 199.83 C 253.02 209.04 251.66 218.46 248.30 227.11 C 245.02 234.98 243.78 244.33 247.69 252.21 C 249.18 258.40 253.84 263.50 253.95 270.05 C 253.99 272.03 254.16 274.09 253.48 276.00 L 10.03 276.00 C 7.98 273.78 6.41 271.04 6.08 268.00 C 5.72 258.88 5.96 249.76 7.06 240.71 C 6.25 239.87 5.44 239.02 4.64 238.17 C 6.84 238.03 9.04 237.89 11.23 237.68 C 10.10 236.12 8.89 234.62 7.68 233.13 C 9.80 232.60 11.92 232.04 14.04 231.46 C 13.35 229.97 12.56 228.53 12.00 226.99 C 12.65 225.32 14.69 224.53 15.41 222.84 C 16.88 219.56 15.11 216.09 13.99 213.00 C 10.76 205.36 7.12 197.90 4.26 190.12 C 2.30 185.05 3.11 179.51 2.06 174.26 C 0.98 168.94 -0.62 163.54 0.32 158.06 C 1.32 151.11 1.11 143.92 3.24 137.17 C 6.19 129.79 9.31 122.48 12.42 115.16 C 14.67 108.30 15.38 101.06 16.24 93.93 C 17.89 82.40 25.36 71.84 35.87 66.73 C 42.76 62.94 50.36 60.77 57.43 57.38 C 60.05 55.89 60.81 52.67 61.71 50.01 C 65.20 37.34 62.67 24.01 64.60 11.13 C 65.11 6.93 66.58 2.63 70.09 0.00 M 67.04 28.07 C 66.39 35.71 66.19 43.39 65.28 51.01 C 68.94 49.29 72.31 46.98 75.52 44.55 C 77.70 42.70 76.42 39.60 76.00 37.27 C 73.36 27.62 71.58 17.76 70.39 7.83 C 67.18 14.04 67.51 21.27 67.04 28.07 M 189.30 38.29 C 183.71 44.35 177.72 50.03 172.00 55.96 C 169.86 58.44 168.12 61.37 165.11 62.93 C 165.27 64.76 166.10 66.37 167.40 67.64 C 178.47 82.18 194.31 91.89 207.97 103.66 C 202.26 94.24 203.79 82.54 206.68 72.42 C 209.87 61.95 212.12 50.78 209.87 39.87 C 208.41 33.73 206.45 27.68 203.74 21.98 C 199.84 28.20 193.54 32.35 189.30 38.29 M 44.97 91.86 C 42.72 95.00 41.26 98.83 41.34 102.73 C 42.20 98.78 44.35 93.80 48.89 93.03 C 51.19 93.02 54.40 92.13 55.36 94.96 C 51.72 95.11 46.93 95.81 45.92 100.01 C 45.31 103.23 44.39 107.68 47.06 110.16 C 51.62 111.91 55.99 109.14 59.56 106.58 C 62.59 103.25 63.37 98.17 62.06 93.93 C 59.68 87.08 49.08 86.22 44.97 91.86 M 114.57 104.53 C 110.41 108.31 105.36 112.23 104.23 118.05 C 105.42 120.46 108.29 121.27 110.30 122.88 C 110.79 123.77 111.81 123.66 112.65 123.57 C 109.28 122.14 109.94 118.04 110.09 115.08 C 110.46 110.90 113.16 105.91 117.93 105.99 C 120.67 105.90 125.56 105.29 125.93 108.93 C 123.37 109.33 120.26 109.34 118.95 112.03 C 117.34 116.68 119.22 121.51 121.37 125.65 C 128.09 125.82 135.17 123.80 140.35 119.42 C 141.37 117.54 144.37 115.86 143.42 113.51 C 141.17 111.39 138.34 109.94 136.31 107.57 C 129.97 103.69 121.54 99.85 114.57 104.53 M 36.40 131.14 C 31.80 134.29 27.21 138.06 25.33 143.52 C 26.13 144.47 26.91 145.45 27.62 146.48 C 29.68 148.19 32.52 148.74 34.31 150.78 C 31.80 151.38 28.84 150.92 26.77 152.74 C 29.38 158.88 33.22 166.90 41.03 166.74 C 50.09 164.70 57.14 157.97 64.36 152.51 C 69.20 149.49 68.24 142.12 64.58 138.55 C 56.71 132.27 46.00 131.75 36.39 132.82 C 38.24 128.25 44.34 127.10 45.77 122.35 C 42.20 124.80 39.54 128.20 36.40 131.14 M 25.94 175.26 C 28.07 178.09 31.70 178.80 34.94 179.55 C 44.28 181.63 52.62 186.51 61.58 189.66 C 66.31 192.12 71.71 193.25 77.03 192.71 C 86.07 191.76 95.34 190.63 103.54 186.44 C 104.92 185.82 105.86 184.63 106.62 183.36 C 96.68 183.48 87.08 187.92 77.04 186.56 C 71.77 186.34 67.28 183.38 62.47 181.60 C 55.06 178.97 47.99 175.07 40.04 174.29 C 37.27 174.37 34.73 175.72 31.99 176.03 C 29.95 176.07 27.96 175.48 25.94 175.26 M 25.56 223.34 C 27.97 229.99 30.93 236.70 35.66 242.05 C 36.75 240.88 36.96 239.25 37.36 237.77 C 42.08 239.66 45.13 243.92 49.22 246.75 C 52.72 249.78 56.50 252.59 60.88 254.20 C 61.33 253.92 61.78 253.65 62.22 253.38 C 61.70 252.54 61.19 251.70 60.69 250.86 C 68.00 251.70 74.35 256.28 81.73 256.97 C 81.76 256.19 81.82 254.63 81.85 253.86 C 87.57 254.45 93.25 255.81 99.02 255.54 C 109.11 254.67 119.53 254.35 129.08 250.66 C 127.77 250.06 126.33 249.54 125.65 248.17 C 134.88 247.05 143.94 244.84 153.16 243.63 C 152.51 240.63 148.17 241.99 146.76 239.46 C 155.32 235.32 162.75 229.08 171.58 225.47 C 173.12 224.71 175.62 225.20 176.17 223.15 C 174.76 223.16 173.31 223.10 171.96 223.58 C 164.29 225.88 157.49 230.25 150.15 233.36 C 145.19 235.38 140.72 238.68 135.35 239.59 C 135.34 239.81 135.33 240.23 135.32 240.44 C 138.55 241.11 143.24 239.62 145.40 242.80 C 135.17 244.84 124.88 246.55 114.61 248.42 C 115.45 249.16 115.59 249.96 115.03 250.82 C 101.15 251.79 87.32 250.12 73.53 248.75 C 74.94 249.85 75.98 251.35 76.27 253.16 C 70.11 252.24 64.14 249.81 58.78 246.68 C 58.55 246.99 58.09 247.61 57.85 247.92 C 53.03 248.91 49.49 244.63 46.02 242.02 C 42.37 239.42 39.37 236.10 36.48 232.72 C 36.50 234.49 35.79 235.23 34.36 234.93 C 31.63 230.92 29.11 226.68 25.56 223.34 Z"/>
      </g>
    </svg>
  )
};

function Point({color}) {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (index >= data.length - 1) {
        fetch('http://40.85.77.124:5000/points')
        .then(response => response.json())
        .then(json => setData(json))
        .finally(() => setIndex(0))
      } else {
        setIndex(index + 1);
      }
    }, 1000);
  }, [index, data.length]);

  return (
    <>
      {data[index] &&
      <div className="point" style={{color: color, left: `${getX(data[index])}%`, top: `${getY(data[index])}%`}}>
        <UltimateDogo fill={color}/>
      </div>}
    </>
  );
}

export default Point;
