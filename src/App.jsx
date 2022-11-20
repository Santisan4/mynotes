import { useState, useMemo, useEffect } from 'react'
import './App.css'

import NoteCard from './components/NoteCard'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([])
  const [view, setView] = useState('all')

  useEffect(() => {
    const data = window.localStorage.getItem('notes')
    if(data) {
      setNotes(JSON.parse(data))
    }
    return
  }, [])  

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const handleArchive = id => {
    setNotes(notes => 
        notes.map(note => {
          if(note.id !== id ) return note
          return{
            ...note,
            archive: !note.archive
          }
        })
      )
  }

  const handleDelete = id => {
    setNotes(notes => notes.filter(note => note.id !== id))
  }

  const matches = useMemo(() => {
    return notes.filter(note => {
      if(view === 'all') {
        return !note.archive
      } else if(view === 'archived') {
        return note.archive
      }
    })
  }, [notes, view])


  const addNote = (noteObject) => {
    const noteToAdd = {
      ...noteObject,
      id: notes.length + 1
    }

    setNotes([...notes, noteToAdd])
  }

  return (
    <div className="App">
      <h1>My notes</h1>

      <div className='btns'>
        <NoteForm onSubmit={addNote}/>
      </div>
      <div>
        <button className="nes-btn" onClick={() => setView(view => view === 'all' ? 'archived' : 'all')}>
          {view === 'all' ? 'archived' : 'all'}
        </button>
      </div>

      <ul className='container-notes'>
        {
          matches
            .map(note => {
              return(
              <NoteCard
                key={note.id}
                {...note}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
              )
            })
        }
      </ul>

    </div>
  )
}

export default App
