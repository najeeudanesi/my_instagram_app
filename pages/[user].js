import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';
export default function Page({ props }) {

  const router = useRouter();
  const [username, setUsername] = useState(null);
  
  
  useEffect(() => {
    setUsername(router.query.user)
  })

  return (
    <div>
      <Header />
      <div>{username}</div>
    </div>
  );
}


