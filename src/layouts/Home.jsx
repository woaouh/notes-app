import React, { useState, useEffect } from 'react';
import { Note } from '../components/Note/Note';
import { AddForm } from '../components/Form/AddForm';
import { EditForm } from '../components/Form/EditForm/EditForm';
import axios from 'axios';

export function Home() {
  const initialFormState = { id: null, title: '', text: '' };
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(initialFormState);

  function convertObjToArr(obj) {
    Object.keys(obj).map((key) => {
      let arr = obj[key];
      arr.key = key;
      return arr;
    });
  }

  useEffect(() => {
    axios
      .get('https://notes-app-d4005.firebaseio.com/notes.json')
      .then((res) => {
        if (!res.data) return;
        const ak = Object.keys(res.data).map((key) => {
          let arr = res.data[key];
          arr.key = key;
          return arr;
        });
        setNotes(ak);
      })
      .catch((error) => Promise.reject(error));
  }, []);

  console.log(notes);

  const addNote = (note) => {
    const randomId = parseInt((Math.random() * 10000).toFixed());
    note.id = randomId;
    setNotes([...notes, note]);
    axios
      .post(
        'https://notes-app-d4005.firebaseio.com/notes.json',
        JSON.stringify({
          id: randomId,
          title: note.title,
          text: note.text,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res));
  };

  const deleteNote = (key) => {
    setNotes(notes.filter((note) => note.key !== key));
    const noteToRemove = notes
      .filter((note) => note.key === key)
      .map((note) => note.key);
    axios
      .delete(
        `https://notes-app-d4005.firebaseio.com/notes/${noteToRemove}.json`
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const editNote = (id, title, text) => {
    setEditing(true);

    setCurrentNote({ id: id, title: title, text: text });
  };

  const updateNote = (id, updatedNote) => {
    setEditing(false);

    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  return (
    <div>
      {editing ? (
        <EditForm
          setEditing={setEditing}
          currentNote={currentNote}
          updateNote={updateNote}
        />
      ) : (
        <AddForm addNote={addNote} />
      )}
      {notes ? (
        notes.map((note) => (
          <Note
            key={note.key}
            title={note.title}
            text={note.text}
            id={note.id}
            keyNum={note.key}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))
      ) : (
        <div>There is no Notes</div>
      )}
    </div>
  );
}
