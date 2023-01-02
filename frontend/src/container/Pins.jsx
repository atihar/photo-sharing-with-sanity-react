import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components'

function Pins() {
  const [searchQuery, setSearchQuery] = useState('')
  const user = {name:'mahir', _id: '327d132f-7b5b-4b58-83ab-8e34507b7fd6'}
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
          <Route path='/create-pin' element={<CreatePin/>} user={user} />
          <Route path='/search' element={<Search/>} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </Routes>
      </div>

    </div>
  )
}

export default Pins