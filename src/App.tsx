import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TopNavBar from './components/Navbar';
import Footer from './components/Footer';
import Shipments from './components/shipper/shipments/Shipments';
import Drivers from './components/transporter/drivers/Drivers';
import Trucks from './components/transporter/trucks/Trucks';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <div className="App h-100">
      {/* <h1> Test</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transporter/trucks" element={<Trucks />} />
          <Route path="/transporter/drivers" element={<Drivers />} />
          <Route path="/shipper/shipments" element={<Shipments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
