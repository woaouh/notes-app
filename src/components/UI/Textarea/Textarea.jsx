import React from 'react';

export function Textarea(props) {
  return (
    <textarea
      className='textarea'
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.change}
      required={props.required}
    />
  );
}
