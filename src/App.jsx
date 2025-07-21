import { useState } from 'react'
import './App.css'
import Marriageparty from './Marriageparty.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Marriageparty />
    </>
  )
}

export default App
