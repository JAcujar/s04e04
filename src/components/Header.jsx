import React from 'react'

function Header({title}) {

  return (
    <div className='container flex justify-between items-center h-25'>
      <h1 className='text-3xl font-bold text-center mb-6'>{title}</h1>
      <button className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mb-4'>+ Create new user</button>
    </div>
  )
}

export default Header
