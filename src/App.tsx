import React from 'react'
import Home from './components/page/Home'
import Navbar from './components/Navbar'
import Grid from './components/page/Grid'


const App = () => {
  return (
    <div className='overflow-hidden bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white'>
        <Navbar />
        <Home />
        <Grid />
    </div>
  )
}

export default App
