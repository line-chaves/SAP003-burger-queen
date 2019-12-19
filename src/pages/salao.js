import React, { useState, useEffect } from 'react';
import Menu from '../componentes/Menu.js'
import firebase  from '../firebase.js';
import Input from '../componentes/input.js'

const Restaurant = () => {
    const [menu, setmenu] = useState([])
    useEffect (()=> {
      firebase
      .firestore()
      .collection('Menu').get()
      .then((snapshot) => {
        const NewMenu = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        setmenu(NewMenu)
      })
  }, []);
    
  return(
    <div className="App">
      <Input class = 'input-pedido'></Input>
      <Input class = 'input-pedido'></Input>
      {menu.map((itemMenu)=>{
        return <Menu Item={itemMenu.Item} Valor={itemMenu.Valor} key={itemMenu.id}/>
      })}
    </div>
    );
}

export default Restaurant;