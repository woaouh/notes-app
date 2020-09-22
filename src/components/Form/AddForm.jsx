import React, { useState } from 'react';
import classes from './Form.module.sass';

import { format } from 'date-fns';

import { Input } from '../UI/Input/Input';
import { Textarea } from '../UI/Textarea/Textarea';
import { Button } from '../UI/Button/Button';

export function AddForm(props) {
  const initialFormState = { title: '', text: '' };
  const [note, setNote] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value, date: format(new Date(), 'PPPPp') });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!note.title || !note.text) return;

    props.addNote(note);
    setNote(initialFormState);
  };

  return (
    <div className={`box ${classes.Form}`}>
      <form onSubmit={submitFormHandler}>
        <Input
          type='text'
          name='title'
          placeholder='Title'
          value={note.title}
          change={handleInputChange}
          required
          autofocus
        />
        <Textarea
          name='text'
          placeholder='Type your note here'
          value={note.text}
          change={handleInputChange}
          required
        />
        <Button className='is-dark'>Submit</Button>
      </form>
    </div>
  );
}
