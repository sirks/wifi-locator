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
    }, 1000);
  }, [colors]);


  // const colors = Array(16).fill('').map(()=>'#'+Math.floor(Math.random()*16777215).toString(16));
  // console.log(colors);
  // debugger;

  return (
    <>
    <div className="wrapper">
      {colors.map(color => <Point color={color} key={color}/>)}
    </div>
      <h1 className="wow">
        Much WoW!
      </h1>
      </>
  );
}

export default App;
