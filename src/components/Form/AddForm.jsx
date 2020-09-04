import React, { useState } from 'react';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

export function AddForm(props) {
  const initialFormState = { title: '', text: '' };
  const [note, setNote] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!note.title || !note.text) return;

    props.addNote(note);
    setNote(initialFormState);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Input
        type='text'
        name='title'
        placeholder='title'
        value={note.title}
        change={handleInputChange}
        required
        autofocus
      />
      <Input
        type='text'
        name='text'
        placeholder='text'
        value={note.text}
        change={handleInputChange}
        required
      />
      <Button>Submit</Button>
    </form>
  );
}
