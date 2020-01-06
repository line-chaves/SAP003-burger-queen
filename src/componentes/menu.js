import React from 'react'

const Menu = (props) => {
    return (
        <ol>
            {props.menuItens.map((menu) =>
            <button key={menu.id} onClick={() => props.handleClick(menu)}>
                <div className="burger">
                    {menu.Item}
                <h4 className="price">R$ {menu.Valor},00</h4>
                </div>
            </button>  
            )}
        </ol>
    )
}

export default Menu;