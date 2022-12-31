import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Loader type='Circles' color='black' height={50} width={200}
        className='m-5' />
        <p>{message}</p>
    </div>
  )
}

export default Spinner