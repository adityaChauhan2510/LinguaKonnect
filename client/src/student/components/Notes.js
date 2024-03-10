import React, { useState, useEffect } from "react";

const Note = ({ note, onType, removeNote }) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = note.id;
    onType(editMeId, "description", updatedValue);
  };

  const clickDelete = () => {
    removeNote(note.id);
  };

  return (
    <li className="w-[15rem] h-[15rem] my-2 bg-yellow-200 rounded-lg">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={note.description}
        onChange={updateDescription}
      />
      <button className="pl-2 font-bold" onClick={clickDelete}>
        X
      </button>
    </li>
  );
};

const NotesList = ({ notes, removeNote, onType }) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = notes.filter(keepSearchMatches);

  return (
    <ul className="grid grid-cols-2 gap-4 justify-center pt-5">
      {searchMatches.map((note) => (
        <Note
          removeNote={removeNote}
          onType={onType}
          note={note}
          key={note.id}
        />
      ))}
    </ul>
  );
};

const Header = ({ onSearch, addNote, searchText }) => {
  const callSearch = (e) => {
    onSearch(e.target.value);
  };
  return (
    <header className="flex items-center">
      <button
        className="rounded-md cursor-pointer px-3 py-2 font-semibold bg-yellow-300 outline-none"
        onClick={addNote}
      >
        + New Note
      </button>
      <input
        className="w-[200px] mx-2 py-2 px-3 outline-2 rounded-lg"
        type="text"
        placeholder="Type here to search..."
        value={searchText}
        onChange={callSearch}
      />
    </header>
  );
};

const Notes = () => {
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    },
  ]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    setNotes([newNote, ...notes]);
  };

  const onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        const updatedNote = { ...note };
        updatedNote[updatedKey] = updatedValue;
        return updatedNote;
      }
    });
    setNotes(updatedNotes);
  };

  const onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    setNotes(updatedNotes);
    setSearchText(newSearchText);
  };

  const removeNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const stringifiedNotes = JSON.stringify(notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }, [notes]);

  useEffect(() => {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div>
      <Header onSearch={onSearch} addNote={addNote} searchText={searchText} />
      <NotesList removeNote={removeNote} onType={onType} notes={notes} />
    </div>
  );
};

export default Notes;
