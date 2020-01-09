import React,{ useState, useEffect } from 'react';
import firebase from '../utils.js/config';

// alterar o nome das funções e variaveis, os pedidos estão no 'pedidos', jogar os pedidos na tela
function GetOrder (){
    const [pedidos, setPedidos] = useState([]);

    useEffect(()=>{
        firebase.collection('pedidos').orderBy('time','asc').get().then((snapshot)=>{
            const newPedidos = snapshot.docs.map((doc)=>({
                id : doc.id,
                ...doc.data()
            }))
            setPedidos(newPedidos)
        })
    },[]);
    
    return (
        <div className = 'style-order'>
          {pedidos.map((i,index)=>{
            return (<div key = {index}>
              <ol>Nome: {i.nomeCliente}</ol>
              <ol>Mesa: {i.mesaCliente}</ol>
              <ol>Pedidos:{i.produtos.map((i)=>i.Item).join(', -')}</ol>
              <ol>Horário do Pedido:<p>{i.time}</p></ol>
            </div>)
          })}
      </div>
    
    );
};

export default GetOrder;