import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

export function EditForm(props) {
  const [note, setNote] = useState(props.currentNote);

  useEffect(() => {
    setNote(props.currentNote);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    props.updateNote(note.id, note);
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
      <Button>Update</Button>
      <Button clicked={() => props.setEditing(false)}>Cancel</Button>
    </form>
  );
}
