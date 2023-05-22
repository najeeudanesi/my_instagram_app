import React from 'react'


function Miniprofile() {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img className='rounded-full border p-[2px] w-16 h-16' src="https://images.unsplash.com/photo-1514481422339-db621c1fca86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>najiu</h2>
            <h3 className='text-sm text-gray-400'>Welcome to instagram</h3>
        </div>
        <button className='text-blue-400 text-sm font-semibold'>Sign out</button>
    </div>
  )
}

export default Miniprofile
