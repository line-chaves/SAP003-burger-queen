import React from 'react';
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

function Nav () {
  return (
    <nav className={css(styles.nav)}>
      <ul>
        <li>
          <Link to="/salao"><strong>Salão</strong></Link>
        </li>
        <li>
          <Link to="/cozinha"><strong>Cozinha</strong></Link>
        </li>
      </ul>
    </nav>

  );
};
const styles = StyleSheet.create({
  nav:{
    display:'flex',
    color:'#ffffff'
  }
});

export default Nav