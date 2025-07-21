import { useState } from 'react'
import './App.css'
import Marriageparty from './Marriageparty.jsx'
import Marriageparty from '../../src/Marriageparty.jsx' // Adjusted import path

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Marriageparty />
    </>
  )
}

export default App
