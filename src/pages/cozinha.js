import React,{ useState, useEffect } from 'react';
import firebase from '../utils.js/config';
import { StyleSheet, css } from "aphrodite";

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
        <div >
          {pedidos.map((i,index)=>{
            return (
              <div key = {index} >
              <ol>Nome: {i.nomeCliente}</ol>
              <ol>Mesa: {i.mesaCliente}</ol>
              <ol>Pedidos:{i.produtos.map((i)=>i.Item).join(', -')}</ol>
              <ol>Horário do Pedido:<p>{i.time}</p></ol>
              </div>)
          })}
      </div>
    
    );
};
// const styles = StyleSheet.create({
//   styleOrder: {
//       display:'flex',
//       flexDirection:'column',
//       justifyContent:'space-around',
//       alignItems:'center',
//       backgroundColor:'#ffffff',
//   },
//   //Container btn
//   card:{
//       display:'flex',
//       flexWrap:'wrap',
//       flexDirection: 'row',
//       width:'33rem',
//       flexdirection:'row',
//       justifycontent:'space-between',
//       boxShadow: '10px 10px 20px 0px rgba(0,0,0,.35)'
//   },
//   logo:{
//     justifyContent:'center',
//     alignItems:'center',
//     width:'100%',
//     display:'flex'
//   },
//   img:{
//     width:'30%',
//   },
//   btnBreakAllDay:{
//   borderRadius:'50%',
//   fontSize:'15px',
//   width:'50%',
//   height:'50px',
//   backgroundColor:'#75542C',
//   color:'#1F0C17'
//   }
// });
export default GetOrder;