import { useState } from 'react'
import './NoteModal.css'

function NoteModal ({onClose, addNote, note}) {
  const [newNote, setNewNote] = useState('')

  const handleChange = e => {
    setNewNote(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const noteObject = {
      title: newNote,
      date: new Date().toLocaleDateString(),
      archive: false
    }

    addNote(noteObject)
    setNewNote('')
  }

  return(
    <section id="container-modal" className="nes-dialog">
      <div className='div-modal' />
      <form onSubmit={handleSubmit} method="dialog" className='form-modal'>
        <h3 className="title">Create / Edit Note</h3>
        <div className="nes-field">
          <label htmlFor='title'>Title</label>
          <input onChange={handleChange} type="text" id="title" value={newNote} className="nes-input" placeholder={'write your note'}/>
        </div>
        <div id='menu-modal' className="dialog-menu">
          <button className="nes-btn" onClick={onClose}>Close</button>
          <button className="nes-btn is-primary" type='submit'>Save</button>
        </div>
      </form>
    </section>
  )
}

export default NoteModal