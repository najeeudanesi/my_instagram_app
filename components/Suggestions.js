import { faker } from '@faker-js/faker';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const Suggestions = (user) => {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      onSnapshot(query(collection(db, "users"), 
       where("id", "!=", user.user.uid)),
     
      (snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data());
         const randomUsers = getRandomUsers(users, 5); 
       
          
        setSuggestions(randomUsers);
      }
        )
    }, [])
      
  
    const getRandomUsers = (users, limit) => {
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      return shuffledUsers.slice(0, limit);
    };
    // useEffect(() => {
    //   const users = [...Array(5)].map((_, i) => ({
    //     id: i,
    //     name: faker.name.fullName(),
    //     username: faker.internet.userName(),
    //     avatar: faker.image.avatar(),
    //     gender: faker.name.gender(),
    //     age: faker.datatype.number({ min: 18, max: 65 })
    //   }));
    //   setSuggestions(users);
    // }, [])
     
  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-600 font-semibold'>See all</button>
        </div>

        {
          suggestions &&  suggestions.map(profile => (
                <div key={profile.id} className='flex items-center justify-between mt-3'>

                <img src={profile.profileImg} className='w-10 h-10 rounded-full border p-[2px]' alt=''></img>
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
