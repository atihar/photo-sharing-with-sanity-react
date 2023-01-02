import React from 'react'
import  { Link, useNavigate} from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

function Navbar({searchQuery, setSearchQuery, user}) {
    const navigate = useNavigate();

    if(!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow'>
            <IoMdSearch fontSize={21} className='ml-1'/>
            <input type='text' onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search'
            value={searchQuery}
            onFocus={() => navigate('/search')}
            className='p-2 w-full bg-white outline-none'/>
        </div>
        <div className='flex gap-3'>
            <Link to={`user-profile/${user?._id}`}>
                <img className='rounded-full w-10' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"/>
            </Link>
            <Link to={`create-pin`} className='w-10 h-10 bg-black text-white rounded-lg flex justify-center items-center'>
                <IoMdAdd />
            </Link>
        </div>
    </div>
  )
}

export default Navbar