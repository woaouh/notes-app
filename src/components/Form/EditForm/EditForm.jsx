import React, { useState, useEffect } from 'react';
import classes from '../Form.module.sass';

import { format } from 'date-fns';

import { Input } from '../../UI/Input/Input';
import { Textarea } from '../../UI/Textarea/Textarea';
import { Button } from '../../UI/Button/Button';

export function EditForm(props) {
  const [note, setNote] = useState(props.currentNote);

  useEffect(() => {
    setNote(props.currentNote);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value, date: format(new Date(), 'PPPPp') });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    props.updateNote(note.id, note);
  };

  return (
    <div className={`box ${classes.Form}`}>
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
        <Textarea
          name='text'
          placeholder='Type your note here'
          value={note.text}
          change={handleInputChange}
          required
        />
        <Button className='is-success'>Update</Button>
        <Button className='is-danger' clicked={() => props.setEditing(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
}
