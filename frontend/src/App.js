import { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import useForceUpdate from 'use-force-update';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const forceUpdate = useForceUpdate();

  const backendIP = process.env.BACKEND_IP;
  const backendPort = process.env.BACKEND_PORT;
  const backendURL = `http://${backendIP}:${backendPort}/v1/notes/`;

  const fetchNotes = async () => {
    const response = await fetch(backendURL);
    const data = await response.json();
    if (!response.ok) {
      throw Error(data.detail);
    }
    setNotes(data.data[0]);
  };

  const sendNote = async (newNote) => {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newNote }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw Error(data.detail);
    }
  };

  const removeNote = async (id) => {
    const response = await fetch(backendURL + id, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      throw Error(data.detail);
    }
  };

  const sendUpdate = async (id, update) => {
    const response = await fetch(backendURL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...update }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw Error(data.detail);
    }
  };

  useEffect(() => {
    try {
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
    };

    try {
      sendNote(newNote);
      fetchNotes();
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = (id) => {
    try {
      removeNote(id);
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = (id, update) => {
    try {
      sendUpdate(id, update);
      const updatedNotes = notes;
      updatedNotes.forEach((note) => {
        if (note.id === id) {
          note.text = update.text;
          note.date = update.date;
        }
      });
      setNotes(updatedNotes);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
        />
      </div>
    </div>
  );
};

export default App;
