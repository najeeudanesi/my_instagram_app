import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import  Moment  from 'react-moment'
import { onAuthStateChanged } from "firebase/auth";
// import {

//     HeartIcon as HeartIconFilled,

// } from "@heroicons/react/24/solid"

function Post({ id, username, img, caption, userImg}) {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [ user, setUser ] = useState(null);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }else {
        setUser(null);
      }
    })
  })
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: user.displayName,
      userImage: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}

      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12  border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-semibold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      <img src={img} className="object-cover w-full max-h-screen " alt="" />
      {user && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="p-5 truncate">
        <span className="font-semibold mr-2">{username}</span>
        {caption}
      </p>

        {comments.length > 0 && (
          <div 
          className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin"
          >{comments.map((comment) => (
            <div key={comment.id} 
            className="flex items-center space-x-2 mb-3">
            
              <img className="h-7 w-7 rounded-full" src={comment.data().userImage} alt="" />
              <span className="font-semibold"> {comment.data().username}</span>
              <p>{comment.data().comment}</p>
              <Moment fromNow className="pr-5 text-xs text-gray-700">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
          </div>
        )}

      {user && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
