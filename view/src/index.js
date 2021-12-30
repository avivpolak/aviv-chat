import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import TwoFactorFirst from './components/TwoFactorFirst';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<TwoFactorFirst />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
