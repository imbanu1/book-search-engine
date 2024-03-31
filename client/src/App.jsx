import React from "react";
impport { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
