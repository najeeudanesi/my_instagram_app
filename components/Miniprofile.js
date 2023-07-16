import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { app } from '../firebase'
import { useRouter } from 'next/router'

function Miniprofile(user) {
  const router = useRouter();

  const auth = getAuth(app)
  console.log(user.user);
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img className='rounded-full object-cover border p-[2px] w-16 h-16' src={user?.user?.photoURL} alt="" />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{user.user.displayName}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to instagram</h3>
        </div>
        <button onClick={() => signOut(auth).then(() => {router.push('/auth/signin')})} className='text-blue-400 text-sm font-semibold'>Sign out</button>
    </div>
  )
}

export default Miniprofile
