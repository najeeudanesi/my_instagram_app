import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { collection, where } from 'firebase/firestore';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import Post from '../components/Post';
import { db } from '../firebase';

export default function Page({ props }) {

  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [pageUserData, setPageUserData] = useState(null);
  
  const [posts, setPosts] = useState([]);


  
  useEffect(() => {
    setUsername(router.query.user)
  })


  useEffect(() => {
    if (username){
      
    onSnapshot(query(
      collection(db, "users"),
       where("username", "==", username)), 
       (snapshot) => {
      setPageUserData(snapshot.docs[0].data());
     
       
    })
  }
  });

  useEffect(() => {
    if(pageUserData){
      
   onSnapshot(query(collection(db, "posts"), where("uid", "==", pageUserData?.id)), (snapshot) => {
      setPosts(snapshot.docs);
    })
  }
  }, [pageUserData]);


  return (
    <div>
      <Header />

      <main className={` flex flex-col items-center md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto`}>
      

      <section className="flex flex-col items-center mt-16">
      <img src={pageUserData?.profileImg} alt="" className='h-32  w-32 rounded-full object-cover border p-[4px]' />
      <div className=' mt-6 font-semibold'>{username}</div>
      <div>
           {posts.map((post) => (
            <Post key={post.id}
            id={post.id}
            uid={post.data().uid}
            img={post.data().image}
            caption={post.data().captionRef}
         
            />
           ))}
        </div>
      
      </section>
      </main>

      
     
    </div>
  );
}


