import React from 'react';
import { StyleSheet, css } from "aphrodite";
import Input from '../componentes/input.js';

const Menu = (props) => {
    return (
        <>
            {props.menuItens.map((menu) =>
            <button className={css(styles.botao)} key={menu.id} onClick={() => props.handleClick(menu)}>
                   <p>{menu.Item}</p>
                   {/* <p>{menu.opcao}</p> */}
                   <p>R$ {menu.Valor},00</p>
            </button>  
            )}
        </>
    )
}

const styles = StyleSheet.create({
    botao: {
        display:'flex',
        width: '10rem',
        height: '5rem',
        display: 'flex',
        alignitems: 'center',
        justifycontent: 'space-around',
    }
  });

export default Menu;