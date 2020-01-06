import React,{ useState, useEffect } from 'react';
import Button from '../componentes/button';
import Input from '../componentes/input'
import Menu from '../componentes/menu'
import firebase from '../utils.js/config'
import { StyleSheet, css } from "aphrodite";
import firestore from '../utils.js/config';


function Restaurante() {

  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [filterMenu, setFilterMenu] = useState("breakfast");

  useEffect(() => {

    firebase.collection('Menu')
      .get().then((snapshot) => {
        const products = snapshot.docs.filter(doc => doc.data().breakfast).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(products)

        const products2 = snapshot.docs.filter(doc => doc.data().lunch).map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(products2)

    })
  }, [])

  const addOrder = (item) => {
    setProductSelect([...productSelect, item])
  }

  const total = productSelect.reduce((acc, item) => acc + item.Valor, 0);

  const remove = (item) => {
    const index = (productSelect.indexOf(item));
    productSelect.splice(index, 1);
    setProductSelect([...productSelect]);
  }

  const sendOrderProduct = (item) => {
    const produtos = productSelect;
    const nomeCliente = document.querySelector('#nome').value;
    const mesaCliente = document.querySelector('#mesa').value;
    const time = new Date().toLocaleString('pt-BR')
    
    const order = {
      nomeCliente : nomeCliente,
      mesaCliente : mesaCliente,
      produtos : produtos,
      total : total,
      time:time,
    };

    firestore.collection("pedidos").doc().set(order).then(function() {
      alert("Pedido Enviado para Cozinha!");
  });
  }
  return (
    <div className="App" StyleSheet={style}>
      <header className="App-header">
      <div>
      <h2 className="menu">Menu</h2>
      <Button className="menu" text={'Breakfast'} handleClick={() => setFilterMenu('breakfast') } />
      <Button className="menu" text={'All Day'} handleClick={() => setFilterMenu('lunch') } />
      </div>
    
      <div>
        <div>
        <Menu 
          menuItens={filterMenu === "breakfast" ? item1 : item2} 
          handleClick={addOrder} 
          name={productSelect.Item} 
          price={productSelect.Valor} key={productSelect.id}/>
        </div>
        
        <div>
         <div>
          <Input className ="dados-cliente"  type ='text' id ='nome' placeholder="Nome do cliente" label='Nome do cliente:'/>
          <Input className ="dados-cliente" type ='number' id = 'mesa' placeholder="Nome do cliente" label='Número da mesa:'/>
         </div>
          {productSelect.map((product, index) => (
              <div key={index}> 
                {product.Item} R$ {product.Valor},00 
                <Button text={'X'} handleClick={(event) => {
                  event.preventDefault(); 
                  remove(product);
                }} />
              </div>
          
          ))}
          <p><strong>Total: R$ {total},00</strong></p>
          <p><Button text ="Enviar Pedido" handleClick={(event) =>{
            event.preventDefault();
            sendOrderProduct();
          }}></Button></p>
        </div>
      </div>
      </header>
    </div>
  );
} 

const style = StyleSheet.create({
  div: {
      backgroundColor:'red',
  }
});
export default Restaurante;