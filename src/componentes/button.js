import React from 'react';

const Button = (props) =>{
    return (
        <button
        data-id={props.id}
        class = {props.class}>
        {props.title}
        </button>
    )
}

export default Button;