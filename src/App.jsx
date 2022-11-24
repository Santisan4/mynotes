import { useState, useMemo, useEffect } from "react"
import "./App.css"

import NoteCard from "./components/NoteCard/NoteCard"
import NoteModal from "./components/NoteModal/NoteModal"

function App() {
  const [notes, setNotes] = useState([])
  const [view, setView] = useState("all")
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    const data = window.localStorage.getItem("notes");
    if (data) {
      setNotes(JSON.parse(data));
    }
    return;
  }, [])

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const handleArchive = (id) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;
        return {
          ...note,
          archive: !note.archive,
        };
      })
    );
  }

  const handleDelete = (id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }

  const handleEdit = (note) => {
    setDraft(note)
  }

  const matches = useMemo(() => {
    return notes.filter((note) => {
      if (view === "all") {
        return !note.archive;
      } else if (view === "archived") {
        return note.archive;
      }
    });
  }, [notes, view])

  const handleClose = (e) => {
    e.preventDefault();
    setDraft(null);
  }

  const addNote = (noteObject) => {
    if(draft?.id) {
      setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== draft.id) return note

        return {
          ...draft,
          title: noteObject.title,
          date: new Date().toLocaleDateString(),
         }
        })
      )
      
    } else {
      const newNote = {
        ...noteObject,
        id: notes.length + 1
      }

      setNotes(notes => [...notes, newNote])
    }

    setDraft(null)
  }


  return (
    <div className="App">
      <h1>My notes</h1>

      {/* <div className='btns'>
        <NoteForm onSubmit={addNote}/>
      </div> */}
      
      <div className="btns-div">
        <button className="nes-btn" onClick={() => setDraft({})}>
          New Note
        </button>
        <button
          className="nes-btn"
          onClick={() =>
            setView((view) => (view === "all" ? "archived" : "all"))
          }
        >
          {view === "all" ? "archived" : "all"}
        </button>
      </div>

      <ul className="container-notes">
        {matches.map((note) => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </ul>

      {draft && (
        <NoteModal
          note={draft}
          addNote={addNote}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
