import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateSongs from './pages/CreateSongs'
import DeleteSong from './pages/DeleteSong'
import ShowSong from './pages/ShowSong'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/songs/create' element={<CreateSongs />} />
      <Route path='/songs/details/:id' element={<ShowSong />} />
      <Route path='/songs/delete/:id' element={<DeleteSong />} />
    </Routes>
  )
}

export default App