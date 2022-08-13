import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const backStyle = {
  backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
  backgroundColor: "#cccccc",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

interface userLoginInfo {
  email: string;
  password: string
}

const App = (): JSX.Element => {
  return (
    <div className="App h-100">
      Test
    </div>
  );
}

export default App;
