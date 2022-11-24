import { useState, useRef } from 'react' 
import Toggle from './Toggle'



function NoteForm ({ onSubmit }) {
  const [newNote, setNewNotes] = useState('')
  const toggleRef = useRef()

  const handleChange = ({target} )=> {
    setNewNotes(target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    const noteObject = {
      title: newNote,
      date,
      archive: false
    }

    onSubmit(noteObject)
    setNewNotes('')
  }

  return(
    <Toggle buttonLabel='New Note' ref={toggleRef}>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input className="nes-input" type="text" placeholder={'write your note'} value={newNote} onChange={handleChange}/>
        <button className="nes-btn">Save</button>
      </form>
    </Toggle>
    
  )
}

export default NoteForm