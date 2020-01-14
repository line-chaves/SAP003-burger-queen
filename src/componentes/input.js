import React from 'react';

function Input(props) {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      id={props.id}
      className={props.className}
    />
  );
}

export default Input;