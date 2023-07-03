import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react'
import Story from './Story';
import { useSession } from 'next-auth/react';


export default function Stories() {

  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

    useEffect(() => {
      const users = [...Array(20)].map((_, i) => ({
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
    <div className='flex space-x-2 p-6 bg-white mt-8 border-grey-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {
        session && (<Story img={session.user?.image} username={session.user.username} />)
      }

        {/* {suggestions.map(profile =>(
          <Story key={profile.id} img={profile.avatar} username={profile.username}/>
        ))} */}
        {/* Story */}
        {/* Story */}
        {/* Story */}
        {/* Story */}
        {/* Story */}
        {/* Story */}
    </div>
  )
}
