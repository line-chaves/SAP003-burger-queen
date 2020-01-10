import React from 'react';
import './App.css';
import Restaurant from './pages/salao.js';
import GetOrder from './pages/cozinha';
import Nav from './componentes/nav.js';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { StyleSheet, css } from "aphrodite";

function App() {
  return(
      <Router>
        <Nav/>
       <div>
        <Switch>
           <Router path="/salao">
           <Restaurant />
           </Router>
           <Router path="/cozinha">
             <GetOrder />
           </Router>
         </Switch>
       </div>
     </Router>
    );
};

const styles = StyleSheet.create({
  nav: {
      backgroundColor:'#FF9900',
  }
});

export default App;