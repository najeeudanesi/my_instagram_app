import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react'

export const Suggestions = () => {

    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
      const users = [...Array(5)].map((_, i) => ({
        id: i,
        name: faker.name.fullName(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        gender: faker.name.gender(),
        age: faker.datatype.number({ min: 18, max: 65 })
      }));
      setSuggestions(users);
    }, [])
     
  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-600 font-semibold'>See all</button>
        </div>

        {
            suggestions.map(profile => (
                <div key={profile.id} className='flex items-center justify-between mt-3'>

                <img src={profile.avatar} className='w-10 h-10 rounded-full border p-[2px]' alt=''></img>
                <div>
                    <h2 className='font-semibold text-sm'>{profile.username}</h2>
                    <h3 className='text-xs text-gray-400'>Based on people you know</h3>
                </div>
                    <button className='text-blue-400 text-sm font-bold'>Follow</button>
                </div>
            ))
        }
    </div>
  )
}
