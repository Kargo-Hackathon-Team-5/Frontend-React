import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TopNavBar from './components/Navbar';
import Footer from './components/Footer';


const App = (): JSX.Element => {
  return (
    <div className="App h-100">
      {/* <h1> Test</h1> */}
      <TopNavBar type='home' />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
