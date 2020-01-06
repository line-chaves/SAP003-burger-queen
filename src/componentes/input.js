import React from 'react';

function Input(props) {
  return (
      <input
        label = {props.label}
        id = {props.id}
        className = {props.class}
        type= {props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.holder}
      />
  )
}
  
  export default Input;