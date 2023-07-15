import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (!email || !password || !username) {
        setError("All fields are required");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password).then(
        (response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );

          onAuthStateChanged(auth, (user) => {
            if (user) {
              updateProfile(user, {
                displayName: username,
                photoURL:
                  "https://firebasestorage.googleapis.com/v0/b/instagram-2-5d577.appspot.com/o/user_images%2FOIP%20(1).jpg?alt=media&token=2254d8cf-cf23-4255-8e25-eae5cbb8632c",
              })
                .then(() => {
                  // Profile updated successfully
                })
                .catch((error) => {
                  // Handle error while updating profile
                  console.log(error);
                });
            }
          });
        }
      );
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center">
        <div className="w-full max-w-xs">
          <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      

          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="mt-4">
            already have an account?{" "}
            <a href="/auth/signin" className="text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;