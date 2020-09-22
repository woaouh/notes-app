import React from 'react';
import classes from './Note.module.sass';

import { Button } from '../UI/Button/Button';

export function Note({ title, text, id, deleteNote, editNote, date }) {
  return (
    <div className={`card ${classes.Note}`}>
      <header className='card-header'>
        <p className='card-header-title'>{title}</p>
      </header>

      <div className='card-content'>
        <div className='content'>
          <p>{text}</p>
          <time>{date}</time>
        </div>
      </div>

      <footer className='card-footer'>
        <Button
          className='card-footer-item'
          clicked={() => editNote(id, title, text, date)}
        >
          Edit
        </Button>
        <Button className='card-footer-item' clicked={() => deleteNote(id)}>
          Delete
        </Button>
      </footer>
    </div>
  );
}
