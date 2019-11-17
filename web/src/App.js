import React, { useState, useEffect } from "react";
import Point from "./Point";

import "./App.css";

import list from "./assets/wifidata/notify.json";

const DATA_LIST = list.map(item => ({
  ...item.notifications[0].geoCoordinate
}));

let timeout = null;
function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIndex(index >= DATA_LIST.lenght - 1 ? 0 : index + 1);
    }, 3000);
  }, [index]);

  return (
    <div className="wrapper">
      <Point latitude={DATA_LIST[index].latitude} longitude={DATA_LIST[index].longitude} />
    </div>
  );
}

export default App;
