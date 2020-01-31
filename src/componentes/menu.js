import React from 'react';
import { StyleSheet, css } from "aphrodite";

const Menu = (props) => {
    return (
        <>
            {props.menuItens.map((menu) =>
            <button className={css(styles.botao)} key={menu.id} onClick={() => props.handleClick(menu)}>
                   <p>{menu.Item}</p>
                   <p className={css(styles.marginMenu)}>R$ {menu.Valor},00</p>
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
        alignItems: 'center',
        justifycontent: 'space-around',
        margin:'1%', 
        backgroundColor:'#F25C05',
        borderRadius: '10%',
        justifyContent: 'inherit',
        color:'#223459'
    },
    marginMenu:{
        margin:'1%',
    }
  });

export default Menu;