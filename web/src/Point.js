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
      {data[index] && <div className="point" style={{background: color, left: `${getX(data[index])}%`, top: `${getY(data[index])}%`}}/>}
    </>
  );
}

export default Point;
