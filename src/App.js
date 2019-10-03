import React from 'react';

import './App.css'; // importa estilos css

import logo from './assets/logo.svg'; // importa logo do sistema.

import Routes from './routes'; // importa rotas.

function App() {

  return (
    <div className="container">
        <img src={logo} alt="AirCnC" />
        <div className="content">
            <Routes />
        </div>
    </div>
  );
}

export default App;
