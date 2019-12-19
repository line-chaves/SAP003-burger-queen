import React from  'react';
import Button from './button'

const Menu = (props)=>{
    return(
    <section>
       <p>{props.Item}</p>
       <p>{props.Valor}</p>
       <Button class='btn-menu' title='Adicionar'></Button>
    </section>
    )
}

export default Menu;