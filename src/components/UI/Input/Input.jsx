import React from 'react';

export function Input(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.change}
      autoFocus={props.required}
      required={props.required}
    />
  );
}
