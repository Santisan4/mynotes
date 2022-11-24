function NoteCard ({note, onDelete, onArchive, onEdit}) {
  
    const label = note.archive
    ? 'unarchive'
    : 'archive'
  
    return(
      <div className="container-card">
        <div className='contents'>
          <h3>{note.title}</h3>
          <p>Last Edited: {note.date} </p>
          <p>Archive: {String(note.archive)} </p>
        </div>
        <div className='btns-notecard'>
          <button onClick={() => onEdit(note)} className="nes-btn">Edit</button>
          <button onClick={() => onDelete(note.id)} className="nes-btn">Delete</button>
          <button onClick={() => onArchive(note.id)} className="nes-btn">{label}</button>
        </div>
      </div>
    )
  }
  
  export default NoteCard