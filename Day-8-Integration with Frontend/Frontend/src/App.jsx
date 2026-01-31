import { useState } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([
    // {
    //   title: "New Note 1",
    //   description: "Note description 1"
    // },
  ])

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setNotes(res.data.notes)
  })

  return (
    <div className='flex items-center gap-10 p-7'>
      {notes.map((note, idx) => {
        return <div key={idx} className='w-fit p-10 bg-blue-300 rounded-2xl'>
          <h1 className='text-xl font-semibold mb-1'>{note.title}</h1>
          <h3 className='text-base'>{note.description}</h3>
        </div>
      })}
    </div>
  )
}

export default App