import { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([
    // {
    //   title: "New Note 1",
    //   description: "Note description 1"
    // },
  ])

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  const [noteId, setNoteId] = useState(null);

  // axios.get("http://localhost:3000/api/notes").then((res) => {
  //   setNotes(res.data.notes)
  // })

  // Jab bhi aap ek state variable ko change karte ho, then wo state variable jis component mein hoga wo component baar baar rerender hota hai. So the solution is "useEffect";

  function fetchNotes() {
    axios.get("https://cohort-2-0-backend-2.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes)
    })
  }

  useEffect(() => {
    fetchNotes()
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("https://cohort-2-0-backend-2.onrender.com/api/notes", {
      title,
      description
    }).then((res) => {
      console.log(res.data)
      fetchNotes()
    })

    setTitle("");
    setDescription("");
  }

  function handleDelete(id) {
    axios.delete(`https://cohort-2-0-backend-2.onrender.com/api/notes/` + id).then((res) => {
      console.log(res.data)
      fetchNotes()
    })
  }

  function fetchId(id) {
    let obj = notes.find(elem => elem._id === id)
    console.log(id, obj)

    setTitle(obj.title);
    setDescription(obj.description);
    setNoteId(id);
  }

  function handleUpdate(e) {
    e.preventDefault();

    axios.patch(`https://cohort-2-0-backend-2.onrender.com/api/notes/${noteId}`, {
      title,
      description
    }).then((res) => {
      console.log(res.data)
      fetchNotes()
    })

    setTitle("");
    setDescription("");
    setNoteId(null)
  }


  return (
    <div className='flex flex-col items-center gap-10 p-7'>
      <form className="flex gap-2" onSubmit={(e) => {
        noteId ? handleUpdate(e) : handleSubmit(e)
      }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder='Enter title' className='border-2 border-black px-5 py-2 font-medium rounded-md' />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder='Enter description' className='border-2 border-black px-5 py-2 font-medium rounded-md' />
        <button style={{ backgroundColor: noteId ? "blue" : "orange" }} className='rounded-md border-2 border-black cursor-pointer px-5 bg-orange-400 border-none'>{noteId ? "Update Note" : "Create Note"}</button>
      </form>

      <div className='notes flex flex-wrap gap-5 justify-center'>
        {notes.map((note, idx) => {
          return <div key={idx} className='w-fit p-7 bg-green-300 rounded-2xl'>
            <h1 className='text-xl font-semibold mb-1'>{note.title}</h1>
            <h3 className='text-base'>{note.description}</h3>
            <button onClick={() => {
              handleDelete(note._id)
            }} className='px-3 py-1 mr-2 bg-red-400 rounded-md cursor-pointer'>Delete</button>
            <button onClick={() => {
              fetchId(note._id)
            }} className='px-3 py-1 mr-2 bg-blue-400 rounded-md cursor-pointer'>Edit Note</button>
          </div>
        })}
      </div>
    </div>
  )
}

export default App