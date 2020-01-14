import React from 'react';
import './App.css';
import Restaurant from './pages/salao.js';
import GetOrder from './pages/cozinha';
import Nav from './componentes/nav.js';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Router path="/salao">
          <Restaurant />
        </Router>
        <Router path="/cozinha">
          <GetOrder />
        </Router>
      </Switch>
    </Router>
  );
};

export default App;