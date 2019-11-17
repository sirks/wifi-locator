import React from "react";
import "./App.css";

/**
 * 60.186099, 24.824482
 */
const LAT_MAX = 60.1863;
const LAT_MIN = 60.1844;

const LONG_MAX = 24.8266;
const LONG_MIN = 24.822;

const LAT_DIFF = LAT_MAX - LAT_MIN;
const LONG_DIFF = LONG_MAX - LONG_MIN;

function Point({ latitude, longitude }) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = (longitude - LONG_MIN) / LONG_DIFF*100;
  const y = (LAT_MAX - latitude) / LAT_DIFF*100;

  console.log(`x=${x},y=${y},width=${width},height=${height}`)

  return <div className="point" style={{ left: `${x}%`, top: `${y}%` }} />;
}

export default Point;
