import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import Header from '../../components/Header';

import { useState} from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function SignIn({ providers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState('');

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowSnackbar(true);
      setSnackbarColor('green');
      router.push('/');
    } catch (error) {
      console.error(error);
      setShowSnackbar(true);
      setSnackbarColor('red');
    }
  };

  

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center'>
        <img className='w-80' src='https://links.papareact.com/ocw' alt='instagram' />
        <p className='font-xs italic'>This is najiu's version of Instagram</p>
        <div className='mt-40'>
          <input
            type='email'
            placeholder='Email'
            className='mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className='mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={handleSignIn}>
            Sign in
          </button>
        </div>

        {/* {Object.values(providers).map((provider) => (
          <div key={provider.name} className='mt-4'>
            <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))} */}

        <p className='mt-4'>
          Don't have an account?{' '}
          <a href='/auth/signup' className='text-blue-500'>
            Sign up
          </a>
        </p>
      </div>

      {showSnackbar && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg text-white ${
            snackbarColor === 'green' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {snackbarColor === 'green' ? 'Login Successful!' : 'invalid credentials!'}
        </div>
      )}
    </>
  );
}

export default SignIn;