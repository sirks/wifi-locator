import React, {useEffect, useState} from "react";
import Point from "./Point";

import "./App.css";

let timeout = null;

function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (done) {
      fetch('http://localhost:5000/points')
      .then(response => response.json())
      .then(json => setData(json))
      .finally(() => {
        setDone(false);
        setIndex(0);
      })
    }
  }, [done]);


  useEffect(() => {
    // clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (index >= data.length - 1) {
        setDone(true);
      } else {
        setIndex(index + 1);
      }
    }, 3000);
  }, [index]);

  console.log(data, index, done);

  return (
    <div className="wrapper">
      {data[index] && <Point latitude={data[index].lat} longitude={data[index].long}/>}
    </div>
  );
}

export default App;
