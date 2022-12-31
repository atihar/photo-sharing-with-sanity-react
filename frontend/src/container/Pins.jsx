import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components'

function Pins() {
  const [searchQuery, setSearchQuery] = useState('')
  const user = {name:'mahir'}
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user}/>
      </div>
      <div className='h-full '>
        <Routes>
          <Route path='/' element={<Feed/>} />
          <Route path='/category/:categoryId' element={<Feed/>} />
          <Route path='/pin-detail/:pinId' element={<PinDetail/>} user={user} />
          <Route path='/search' element={<Search/>} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </Routes>
      </div>

    </div>
  )
}

export default Pins