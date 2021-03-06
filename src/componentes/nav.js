import React from 'react';
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

function Nav() {
  return (
    <nav className={css(styles.nav)}>
      <ul className={css(styles.ul)}>
        <li className={css(styles.li)}>
          <Link to="/salao"><h3>Salão</h3></Link>
        </li>
        <li className={css(styles.li)}>
          <Link to="/cozinha"><h3>Cozinha</h3></Link>
        </li>
      </ul>
    </nav>

  );
};

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    color: '#ffffff',
    width: '3px'
  },
  ul:{
    display:'flex',
    margin:'3%',
    listStyleType:'none'
  },
  li:{
    margin:'3%'
  }

});

export default Nav