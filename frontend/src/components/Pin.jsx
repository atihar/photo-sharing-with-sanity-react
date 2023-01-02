import React, { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline, MdDownload } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'


const Pin = ({ pin: {postedBy, image, _id, destination, save }}) => {
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)
    const navigate = useNavigate()

    const userInfo = fetchUser();
    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfo.id ))?.length

    const savePin = (id) => {
        if(!alreadySaved) {
            //save post
            setSavingPost(true)

            client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
              _key: uuidv4(),
              userId: userInfo?._id,
              postedBy: {
                _type: 'postedBy',
                _ref: userInfo?._id,
              },
            }])
            .commit()
            .then(() => {
              window.location.reload()
              setSavingPost(false)  
            })
        }
    }

    const deletePin = (id) =>{
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }


  return (
    <div className='m-2'>
        <div 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={()=> navigate(`pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
            <img className='rounded-lg w-full' alt="user_post" src={(urlFor(image).width(250).url())} />
            { postHovered && (
                <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 z-50' style={{ height: '100%'}}>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <a href={`${image?.asset?.url}?dl=`} download onClick={(e)=> e.stopPropagation}
                                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type="button" className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base hover:shadow-md outline-none rounded-3xl'>
                                  {save.length} Saved
                                </button>
                            ) : (
                                <button type="button" className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base hover:shadow-md outline-none rounded-3xl'
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        savePin(_id)
                                    }}>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                        { destination && (
                                    <a href={destination}
                                    target="_blank" rel="noreferrer"
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 rounded-full opacity-75 hover:opacity-100 hover:shadow-md'>
                                        <BsFillArrowUpRightCircleFill />
                                        {destination.slice(8, 16)}
                                    </a>
                                )}
                                {postedBy?._id && (
                                    <button
                                    type='button'
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                    onClick={(e) =>{
                                        e.stopPropagation()
                                        deletePin(_id)
                                    }}>
                                        <AiTwotoneDelete />
                                    </button>
                                )}
                        </div>
                </div>
            )}

        </div>
        <Link to={`user-profile/${userInfo?._id}`} className='flex gap-2 mt-2 items-center'>
            <img className='w-8 h-8 rounded-full object-cover' src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80' alt="user-profile"/>
            <p className='font-semibold capitalize'>{postedBy?.userName}</p>
        </Link>
    </div>
  )
}

export default Pin