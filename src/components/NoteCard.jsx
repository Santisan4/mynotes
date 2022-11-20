function NoteCard ({id, title, date, archive, onDelete, onArchive}) {
  
    const label = archive
    ? 'unarchive'
    : 'archive'
  
    return(
      <div className="container-card">
        <div className='contents'>
          <h3>{title}</h3>
          <p>Last Edited: {date} </p>
          <p>Archive: {String(archive)} </p>
        </div>
        <div className='btns-notecard'>
          <button className="nes-btn">Edit</button>
          <button onClick={() => onDelete(id)} className="nes-btn">Delete</button>
          <button onClick={() => onArchive(id)} className="nes-btn">{label}</button>
        </div>
      </div>
    )
  }
  
  export default NoteCard