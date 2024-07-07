import { useState } from 'react'

import './App.css'
import Stopwatch from './components/Stopwatch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Stopwatch></Stopwatch>
    </>
  )
}

export default App
