import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import { Button , Container , Row ,Col , Form, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//IMPORT SCREENS
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Cart from './pages/Cart';
import AddGame from './pages/AddGame';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}  />
          <Route path="/dashboard" element={<Dashboard />}  />
          <Route path="/addnewgame" element={<AddGame/>}  />
          <Route path="/game" element={<Game/>}  />
          <Route path="/cart" element={<Cart />}  />
        </Routes>
      </Router>
    </>
  );
}

export default App;