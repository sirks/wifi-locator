import React, {useEffect, useState} from "react";
import Point from "./Point";

import "./App.css";

const COLOR_COUNT = 99;

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

function App() {

  const [colors, setColors] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (colors.length < COLOR_COUNT) {
        setColors([...colors, randomColor()]);
      }
    }, 5000);
  }, [colors]);

  return (
    <>
      <div className="wrapper">
        {colors.map(color => <Point color={color} key={color}/>)}
      </div>
      <h1 className="wow">
        Much WoW!
      </h1>
      <h1 className="description">
        Live anonimized people tracking
      </h1>
    </>
  );
}

export default App;
