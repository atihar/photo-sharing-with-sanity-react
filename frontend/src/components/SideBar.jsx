import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill} from 'react-icons/ri'
import { IoIosArrowForward} from 'react-icons/io'

function SideBar({user, closeToggle}) {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false)
  }
  user = { _id: '122222', name : 'Jahish', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}

  const categories = [
    {name : 'Animals'},
    {name : 'Wallpapers'},
    {name : 'Photography'},
    {name : 'Gaming'},
    {name : 'Coding'},
  ]
  const isNotActiveStyle= 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const isActiveStyle= 'flex items-center px-5 gap-3 font-extrabold border-r-2 transition-all duration-200 ease-in-out'
  
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col gap-y-5'>
        <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
          <p>Logo</p>
        </Link>
        <NavLink to="/"
        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
        onClick={handleCloseSidebar}>
          <RiHomeFill />
          Home
        </NavLink>
        <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Category</h3>
        {categories.slice(0, categories.length - 1).map((category) => (
          <NavLink to={`/category/${category.name}`}
          className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
          key={category.name}
          onClick={handleCloseSidebar}>
            {category.name}
          </NavLink>
        ))}
      </div>
      {user && (
        <Link to={`/user-profile/${user._id}`} className='flex my-5 mb-3 gap-2 items-center bg-white shadow mx-3'>
          <img src={user.image} className='w-10 h-10 rounded-full'/>
            <p>{user.name}</p>
        </Link>
      )}
    </div>
  )
}

export default SideBar