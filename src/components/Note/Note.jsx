import React from 'react';
import { Button } from '../UI/Button/Button';

export function Note({ title, text, id, deleteNote, editNote }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
      <Button clicked={() => editNote(id, title, text)}>Edit</Button>
      <Button clicked={() => deleteNote(id)}>Delete</Button>
    </div>
  );
}
