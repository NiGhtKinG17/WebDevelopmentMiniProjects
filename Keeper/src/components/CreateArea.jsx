import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const[clicked,setClick] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expandClick(){
    setClick(true);
  }

  return (
    <div>
      <form className="create-note" autoComplete="off">
        {clicked ?
        <div>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <Zoom in={true}>
        <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom>
        </div> :
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="1"
          onClick={expandClick}
          />
      }
      </form>
    </div>
  );
}

export default CreateArea;
