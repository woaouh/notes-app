import React, { useState, useEffect } from 'react';
import { Note } from '../components/Note/Note';
import { AddForm } from '../components/Form/AddForm';
import { EditForm } from '../components/Form/EditForm/EditForm';
import axios from 'axios';

export function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [editing, setEditing] = useState(false);
  const [addedTrigger, setAddedTrigger] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      await axios
        .get('https://notes-app-d4005.firebaseio.com/notes.json')
        .then((res) => {
          if (!res.data) return;
          const serializeNotes = Object.keys(res.data).map((key) => {
            let arr = res.data[key];
            arr.id = key;
            return arr;
          });
          setNotes(serializeNotes);
        })
        .catch((error) => Promise.reject(error));
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

  const editNote = (id, title, text) => {
    setEditing(true);
    setCurrentNote({ id: id, title: title, text: text });
  };

  const updateNote = (id, updatedNote) => {
    setEditing(false);
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    axios
      .put(`https://notes-app-d4005.firebaseio.com/notes/${id}.json`, {
        title: updatedNote.title,
        text: updatedNote.text,
      })
      .catch((error) => Promise.reject(error));
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
      {notes.length ? (
        notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
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
