import React from 'react';
import Input from '../componentes/input.js';

const Menu = (props) => {
    return (
        <ol>
            {props.menuItens.map((menu) =>
            <button className='btn-menu' key={menu.id} onClick={() => props.handleClick(menu)}>
                <div className="burger">
                    {menu.Item}
                   <p>{menu.opcao}</p>
                <h4 className="price">R$ {menu.Valor},00</h4>
                </div>
            </button>  
            )}
        </ol>
    )
}

export default Menu;