import React from 'react';

export function Button(props) {
  return (
    <button className={`button ${props.className}`} onClick={props.clicked}>
      {props.children}
    </button>
  );
}
