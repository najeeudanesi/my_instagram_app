import  { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, updatePassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import Header from '../../components/Header';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const  [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!==''){ try{
       await  signInWithEmailAndPassword(auth, email, oldPassword).then(() =>{
             updatePassword((user), password).then(() =>{
                console.log("password changed")
                setOldPassword(null);
                setPassword(null);
            })
        })
     } catch (error) {
        console.error(error)
        return;
    }
}
    try{
        await  updateProfile((user), {
            displayName: username,
            email: email,  
        }).then(() => {
            console.log("updated successfully")
        })
    }catch(error){
        console.error(error)
    }

    router.push('/');
    
  };

  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUsername(user.displayName || '');
        setEmail(user.email || '');
      } else {
        setUser(null);
         router.push('/auth/signin');
      }
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              OldPassword
            </label>
            <input
              type="password"
              id="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>

          
        
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">
              Change Profile Image
            </label>
            <input type="file" id="image" accept="image/*" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
