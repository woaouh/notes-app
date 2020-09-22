import React, { useState, useEffect } from 'react';
import classes from './Home.module.sass';

import axios from 'axios';

import { Note } from '../components/Note/Note';
import { AddForm } from '../components/Form/AddForm';
import { EditForm } from '../components/Form/EditForm/EditForm';
import { Loader } from '../components/UI/Loader/Loader';

export function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addedTrigger, setAddedTrigger] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      await axios
        .get('https://notes-app-d4005.firebaseio.com/notes.json')
        .then((res) => {
          if (!res.data) return setIsLoading(false);
          const serializeNotes = Object.keys(res.data).map((key) => {
            let arr = res.data[key];
            arr.id = key;
            return arr;
          });
          setIsLoading(false);
          setNotes(serializeNotes);
        })
        .catch((error) => {
          Promise.reject(error);
        });
    };
    fetchNotes();
  }, [addedTrigger]);

  const addNote = (note) => {
    axios
      .post(
        'https://notes-app-d4005.firebaseio.com/notes.json',
        JSON.stringify({
          title: note.title,
          text: note.text,
          date: note.date,
        })
      )
      .then(() => setAddedTrigger(addedTrigger + Math.random()))
      .catch((error) => Promise.reject(error));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    axios
      .delete(`https://notes-app-d4005.firebaseio.com/notes/${id}.json`)
      .catch((error) => Promise.reject(error));
  };

  const editNote = (id, title, text, date) => {
    setEditing(true);
    setCurrentNote({ id: id, title: title, text: text, date: date });
  };

  const updateNote = (id, updatedNote) => {
    setEditing(false);
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    axios
      .put(`https://notes-app-d4005.firebaseio.com/notes/${id}.json`, {
        title: updatedNote.title,
        text: updatedNote.text,
        date: updatedNote.date,
      })
      .catch((error) => Promise.reject(error));
  };

  return (
    <div className={classes.Home}>
      {editing ? (
        <EditForm
          setEditing={setEditing}
          currentNote={currentNote}
          updateNote={updateNote}
        />
      ) : (
        <AddForm addNote={addNote} />
      )}
      {isLoading ? (
        <Loader />
      ) : notes.length ? (
        <div className={classes.Notes}>
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              date={note.date}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          ))}
        </div>
      ) : (
        <div>There is no notes.</div>
      )}
    </div>
  );
}
