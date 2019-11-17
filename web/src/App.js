import React, {useEffect, useState} from "react";
import Point from "./Point";

import "./App.css";

let timeout = null;

function App() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (index >= data.length - 1) {
        fetch('http://localhost:5000/points')
        .then(response => response.json())
        .then(json => setData(json))
        .finally(() => setIndex(0))
      } else {
        setIndex(index + 1);
      }
    }, 1000);
  }, [index, data.length]);

  console.log(data, index);

  return (
    <div className="wrapper">
      {data[index] && <Point latitude={data[index].lat} longitude={data[index].long}/>}
    </div>
  );
}

export default App;
