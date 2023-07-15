import  { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth, db, storage } from '../firebase';
import Header from '../components/Header';
import {ref, getDownloadURL, uploadString} from "@firebase/storage";
import { addDoc, collection } from 'firebase/firestore';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const  [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();
  const filePickerRef = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('');




  const updateImage = async (e) => {

    

  const docRef = await addDoc(collection(db, "user_images"), {
    email: email,
  })

  const imagRef = ref(storage, `user_images/${docRef.id}/image`);

  if (selectedFile){
    await uploadString(imagRef, selectedFile, "data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imagRef);
      await  updateProfile((user), {
       photoURL: downloadURL,
    }).then(() => {
        console.log("image updated successfully")
        
    })
    })
  }
    setSelectedFile(null);

  }  
  
  const timeOut = setTimeout(() => {
    setShowSnackbar(false);
  }, 2000);

  const addImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

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
        setShowSnackbar(true);
        setSnackbarColor('red');
        return;
    }
}
    try{
        await  updateProfile((user), {
            displayName: username,
            email: email,  
        })

        await updateImage().then(() =>{
            console.log("image updated successfully")
            setShowSnackbar(true);
            setSnackbarColor('green');
            
        });
    }catch(error){
        console.error(error)

        setShowSnackbar(true);
        setSnackbarColor('red');
        

    }

    
    router.push('/')
    setUser(user);
    
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
      <div className="container mx-auto px-4 mt-10 mb-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className='flex items-center justify-center space-x-4'>
            <div>
            { selectedFile ? (
              <img src={selectedFile} alt="" className='h-32  w-32 rounded-full object-cover border p-[4px]' />
            ):
            
            (
            <img src={user?.photoURL} className="h-32  w-32 rounded-full object-cover border p-[4px]" alt="" />
            
            )
}

          <span className='text-sm text-blue-700 cursor-pointer' onClick={() => filePickerRef.current.click()}>Edit Profile picture</span>
          </div>
            </div>
          
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
              Old Password
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
            
            <input
                  ref={filePickerRef}
                  type="file"
                  hidden
                  onChange={addImage}
                />
          </div>
          <div className='flex justify-end'>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded ">
            Save Changes
          </button>
          </div>
          <div className='flex justify-center mt-4 font-bold text-red-700 cursor-pointer' onClick={() => signOut(auth)}> Sign out of your account</div>
        </form>
   
       
      </div>
    

     

      {showSnackbar && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg text-white ${
            snackbarColor === 'green' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {snackbarColor === 'green' ? 'profile Updated Successfully' : 'Update Failed'}
        </div>
      )}
    </>
  );
};

export default Profile;
