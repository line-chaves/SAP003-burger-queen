import React, { useState, useEffect } from 'react';
import firebase from '../utils.js/config';
import { StyleSheet, css } from "aphrodite";
import Button from '../componentes/button'
import firestore from '../utils.js/config';

function GetOrder() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    firebase.collection('pedidos').orderBy('time', 'asc').get().then((snapshot) => {
      const newPedidos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPedidos(newPedidos)
    })
  }, []);

  // const remove= ()=>{
  //   const id = event.target.dataset.id;
  //   firestore.collection('pedidos').doc(id).delete();
  // }
  const finishOrder = (order) => {
    firestore.collection("pedidosProntos").doc().set(order).then(() => {
      alert("Pedido finalizado!");
    });
    const id = order.id;
    firestore.collection('pedidos').doc(id).delete();
  }
  return (
    <div className={css(styles.styleOrder)}>
      {pedidos.map((i, index) => {
        return (
          <div key={index}>
            <main>
              <section className={css(styles.card)}>
                <div>
                  <p>Nome: {i.nomeCliente}</p>
                  <p>Mesa: {i.mesaCliente}</p>
                </div>
                <div>
                  <p>Pedidos:<br />{i.produtos.map((i) => i.Item).join(',  ')}</p>
                </div>
                <div>
                  <p>Horário do Pedido:{i.time}</p>
                </div>
                <div>
                  <Button className='btnPedidos' text='Pedido pronto!' handleClick={(event) => {
                event.preventDefault();
                finishOrder(i);
              }}/>
                </div>
              </section>
            </main>
          </div>)
      })}
    </div>

  );
};
const styles = StyleSheet.create({
  styleOrder: {
    display: 'flex',
    flexdirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    height: 'auto',
    width: '96%',
  },

  card: {
    border: '4px dotted #61897F',
    margin: '5%',
    fontSize: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '15rem',
    height: '15rem',
    // flexdirection:'row',
    justifycontent: 'space-between',
    backgroundColor: 'inherit'
  },
});
export default GetOrder;