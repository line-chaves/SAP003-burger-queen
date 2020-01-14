import React, { useState, useEffect } from 'react';
import Button from '../componentes/button';
import Input from '../componentes/input';
import Menu from '../componentes/menu';
import firebase from '../utils.js/config';
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
        const products = snapshot.docs.filter(doc => doc.data().breakfast).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem1(products)

        const products2 = snapshot.docs.filter(doc => doc.data().lunch).map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem2(products2)

      })
  }, [])

  const counter = (item, action) => {
    const existProduct = productSelect.includes(item);
    const valorContador = item.contador
    console.log(item.contador)

    if (action === 'cresc') {
      if (existProduct) {
        item.contador++
        setProductSelect([...productSelect])
      }
    }
    if (action === 'desc') {
      if (valorContador > 0) {
        item.contador--
        setProductSelect([...productSelect])
      }
      else {
        remove(item);
      }
    }
  }

  const total = productSelect.reduce((acc, item) => acc + (item.Valor * item.contador), 0);

  const remove = (item) => {
    const index = (productSelect.indexOf(item));
    productSelect.splice(index, 1);
    setProductSelect([...productSelect]);
  }

  const sendOrderProduct = (item) => {
    const produtos = productSelect;
    const nomeCliente = document.querySelector('#nome').value;
    const mesaCliente = document.querySelector('#mesa').value;
    const time = new Date().toLocaleString('pt-BR');

    const order = {
      nomeCliente: nomeCliente,
      mesaCliente: mesaCliente,
      produtos: produtos,
      total: total,
      time: time,

    };

    firestore.collection("pedidos").doc().set(order).then(() => {
      alert("Pedido enviado para a Cozinha!");
      document.querySelector('#nome').value = null;
      document.querySelector('#mesa').value = null;
      setProductSelect([]);
    });
  }
  const addOrder = (item) => {
    setProductSelect([...productSelect, { ...item, contador: 1 }])
  }
  return (
    <div className={css(styles.container)}>
      <header className={css(styles.logo)}>
        <img className={css(styles.img)} src={require("../componentes/img/BurgerQueen.png")} />
      </header>
      <main>
        <section>
          <Button className={css(styles.btnBreakAllDay)} class='btnBreakAllDay' text={'Café da Manhã'} handleClick={() => setFilterMenu('breakfast')} />
          <Button className={css(styles.btnBreakAllDay)} text={'Lanches'} handleClick={() => setFilterMenu('lunch')} />
          <h2 className="menu">Menu</h2>
        </section>
        <section className={css(styles.menu)}>
          <Menu
            menuItens={filterMenu === "breakfast" ? item1 : item2}
            handleClick={addOrder}
            Opcao={productSelect.opcao ? (productSelect.map(i => <p>{i.opcao}</p>)) : null}
            name={productSelect.Item}
            price={productSelect.Valor} key={productSelect.id}
          />
        </section>
        <section>
          <Input className="dados-cliente" type='text' id='nome' placeholder='Nome do cliente' />
          <Input className="dados-cliente" type='number' id='mesa' placeholder='Número da mesa' />
          {productSelect.map((product, index) => (
            <div key={index}>
              <Button text={'+'} handleClick={(event) => {
                event.preventDefault();
                counter(product, 'cresc');
              }} />
              Quant: {product.contador}
              <Button text={'-'} handleClick={(event) => {
                event.preventDefault();
                counter(product, 'desc');
              }} />
              {product.Item} R$ {product.Valor * product.contador},00
                <Button text={'Del'} handleClick={(event) => {
                event.preventDefault();
                remove(product);
              }} />
            </div>

          ))}
          <p><strong>Total: R$ {total},00</strong></p>
          <p><Button text="Enviar Pedido" handleClick={(event) => {
            event.preventDefault();
            sendOrderProduct();
          }}></Button></p>
        </section>
      </main>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '33rem',
    flexdirection: 'row',
    justifycontent: 'space-between',
    backgroundColor: 'inherit',
    margin: '2%'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex'
  },
  img: {
    width: '30%',
  },
  btnBreakAllDay: {
    borderRadius: '50%',
    fontSize: '15px',
    width: '50%',
    height: '50px',
    backgroundColor: '#75542C',
    color: '#1F0C17'
  }
});
export default Restaurante;