import React, { useState } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'

const CreatePin = ({user}) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [fields, setFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [imageAsset, setImageAsset] = useState('')
  const [wrongImageType, setWrongImageType] = useState('')

  const navigate = useNavigate()

  const uploadImage = (e) => {
    console.log(e.target.files)
    const { type, name } = e.target.files[0]

    if(type === 'image/png' || type === 'image/jpeg' || type === 'image/svg' || type === 'image/jpg'){
      setWrongImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
      })
    } else {
      setWrongImageType(true)
    }
  }

  const savePin = () => {
    if(title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      }

      client.create(doc)
      .then(()=> {
        navigate('/')
      })
    } else {
      setFields(true)

      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>PLease fill all fields</p>
      )}
      <div className='flex lg:flex-row flex-col justify-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-col w-full'>
          <div className='flex justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-[420px]'>
              {loading && <Spinner/>}
              {wrongImageType && <p>Wrong Image Type</p>}
              {!imageAsset ? (
                <label>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                          <p className='font-bold text-2xl'>
                            <AiOutlineCloudDownload/>
                          </p>
                          <p className='text-lg'>Click to upload</p>
                          <p className='mt-32 text-gray-400'>Recommendation : Use high quality image</p>
                      </div>
                      <input type='file' className='w-0 h-0' name='upload-image' 
                      onChange={uploadImage}/>
                    </div>
                </label>
              ) : (
                <div className='relative h-full'>
                  <img src={imageAsset?.url} alt="uploaded-image" className='h-full w-full'/>
                  <button type='button' className='absolute bottom-3 right-3 rounded-full p-3 cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out '
                  onClick={()=> setImageAsset(null)}>
                    <MdDelete/>
                  </button>
                  </div>
              )}
          </div>
          <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add your title"
              className='outline-none font-bold border-b-2 border-gray-200 p-2 '/>
              {/* user name from state */}
              <p className='font-bold p-2'>user name</p>

              <input type='text' value={about} onChange={(e) => setAbout(e.target.value)} placeholder="what is about this pin"
              className='outline-none font-bold border-b-2 border-gray-200 p-2 '/>
              <input type='text' value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="destination url"
              className='outline-none font-bold border-b-2 border-gray-200 p-2 '/>

              {/* rendering categories  */}
              <div className='flex flex-col'>
                <p className='font-bold '>Choose Pin Category</p>
                <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-1/2 border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
                  <option value="other" className='bg-white'>Select Category</option>
                  {categories.map((category, i) => (
                    <option className='border-0 outline-none bg-white text-black' key={i}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className='flex justify-end items-end mt-5'>
                <button type='button' onClick={savePin} className='bg-red-500 text-white font-bold rounded-full w-28 outline-none'>
                  Save Pin
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin