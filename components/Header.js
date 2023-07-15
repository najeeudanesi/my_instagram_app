import Image from "next/image";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  Bars4Icon,
  PlusCircleIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { Fragment, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Header() {
  const auth = getAuth(app);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // onSnapshot(collection(db, "user_images"), (snapshot) => {
    //   if (user){
    //     setUser(user);
    //   }
    // })

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <div className="shadow-sm bg-white border-b z-50 sticky top-0">
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          {/*ig logo*/}
          <div
            onClick={() => router.push("/")}
            className="relative hidden lg:inline-grid w-24 cursor-pointer"
          >
            <Image
              src="https://links.papareact.com/ocw"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
            <Image
              src="https://links.papareact.com/jjm"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>

          {/*search bar*/}
          <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center  pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </div>

              <input
                className="bg-gray-50 block w-full pl-10 sm:text-sm
            border-gray-300 focus:ring-black focus:border-black rounded-md"
                type={"text"}
                placeholder="search"
              />
            </div>
          </div>

          {/*right*/}
          <div className=" flex items-center justify-end space-x-4">
            <HomeIcon onClick={() => router.push("/")} className="navBtn" />
            <Bars4Icon className="h-6 w-6 md:hidden cursor-pointer" />

            {user ? (
              <>
                <div className="relative navBtn">
                  <PaperAirplaneIcon className="navBtn -rotate-45" />
                  <div
                    className="absolute -top-1 -right-1 text-xs w-4 bg-red-600 rounded-full text-white 
  flex items-center justify-center
  "
                  >
                    3
                  </div>
                </div>

                <GlobeAltIcon
                  className="navBtn"
                  onClick={() => router.push("/explore")}
                />
                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="navBtn"
                />
                <HeartIcon className="navBtn" />

                <img
                  onClick={() => router.push("/profile")}
                  src={user?.photoURL}
                  alt="profile pic"
                  className="h-10  w-10 rounded-full hover:cursor-pointer object-cover"
                />
              </>
            ) : (
              <button onClick={() => router.push("/auth/signin")}>
                Sign in
              </button>
            )}
          </div>
          <Modal isvisible={open} onClose={() => setOpen(false)} user={user} />
        </div>
      </div>
    </Fragment>
  );
}
