import React, { useState } from 'react';
import { Note } from '../components/Note/Note';
import { Form } from '../components/Form/Form';
import { EditForm } from '../components/EditForm/EditForm';

export function Home() {
  const initialNotes = [
    {
      title: 'Note-1',
      text: 'This is note-1',
      id: 1,
    },
    {
      title: 'Note-2',
      text: 'This is note-2',
      id: 2,
    },
    {
      title: 'Note-3',
      text: 'This is note-3',
      id: 3,
    },
    {
      title: 'Note-4',
      text: 'This is note-4',
      id: 4,
    },
    {
      title: 'Note-5',
      text: 'This is note-5',
      id: 5,
    },
    {
      title: 'Note-6',
      text: 'This is note-6',
      id: 6,
    },
  ];
  const initialFormState = { id: null, title: '', text: '' };
  const [notes, setNotes] = useState(initialNotes);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(initialFormState);

  const addNote = (note) => {
    note.id = notes.length + 1;
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
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
      <Form addNote={addNote} />
      <EditForm
        setEditing={setEditing}
        currentNote={currentNote}
        updateNote={updateNote}
      />
      {notes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          text={note.text}
          id={note.id}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
}
