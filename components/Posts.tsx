import Post from './Post';

const posts = [
  {
  id: '123',
  username: 'najiu_test',
  userImg: "https://images.unsplash.com/photo-1492632736198-174776a820f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  img: "https://images.unsplash.com/photo-1514481422339-db621c1fca86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  caption:"Good bye world",

},
{
  id: '123',
  username: 'najiu_test',
  userImg: "https://images.unsplash.com/photo-1514481422339-db621c1fca86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  img: "https://images.unsplash.com/photo-1514481422339-db621c1fca86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  caption:"Good bye world",

},
];

function Posts() {
  return (
        <div>
           {posts.map((post) => (
            <Post key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
            />
           ))}
        </div>
 
    
  )
}

export default Posts