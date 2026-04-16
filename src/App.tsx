import React from 'react'
import Home from './components/page/Home'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='h-screen overflow-hidden bg-neutral-950'>
        <Navbar />
        <Home />
    </div>
  )
}

export default App
