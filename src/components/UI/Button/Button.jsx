import React from 'react';

export function Button(props) {
  return <button onClick={props.clicked}>{props.children}</button>;
}
