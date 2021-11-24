import { useState, useEffect } from 'react';
import { LeftBar } from '../components/home/LeftBar';
import { FriendRequestsBar } from '../components/home/FriendRequestsBar';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { CreatePost } from '../components/home/CreatePost';
import { Post } from '../components/home/Post';
import axios from 'axios';

export const Home = ({ openLeftBar, mobileWidth, newUser }) => {
  const [posts, setPosts] = useState(null);
  const [ownerPosts, setOwnerPosts] = useState(null);

  const getFriendsPosts = () => {
    axios.get(`http://localhost:8000/friendsPosts/${newUser.id}`)
      .then((res) => setPosts(res.data))
  }
  const getOwnerPosts = () => {
    axios.get(`http://localhost:8000/ownerPosts/${newUser.id}`)
      .then((res) => setOwnerPosts(res.data))
      .then(() => console.log(true))
  }
  const addLike = (e) => {
    axios.post(`http://localhost:8000/like/${e.target.value}`, {id: newUser.id})
      .then((res) => console.log(res.data))
  }

  useEffect(() => {
    getOwnerPosts();
    getFriendsPosts();
  }, [])

  return(
    <div className="w-full h-screen">
      <div className="flex mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "w-full pt-5 flex justify-center flex-col" : "ml-60 w-full mr-72 flex justify-center flex-col"}>
          <WelcomeBanner firstName={newUser.firstName} />
          <CreatePost id={newUser.id} firstName={newUser.firstName} />
          <>
            {ownerPosts && ownerPosts.result ? 
              <>
                {ownerPosts.result.length == 0 ? 
                  <>
                    <h1 className="flex justify-center mt-3 text-3xl">Your posts</h1>
                    <p className="flex justify-center">no posts</p>
                  </>
                :
                  <>
                    <h1 className="flex justify-center mt-3 text-3xl">My posts</h1>
                    {ownerPosts.result.map((post) => (
                      <Post
                        key={post._id}
                        postId={post._id}
                        id={newUser.id}
                        firstName={post.firstName} 
                        lastName={post.lastName}
                        date={post.date}
                        description={post.description}
                        likes={post.likes}
                        addLike={addLike}
                      />
                    ))}
                  </>
                }
              </>
            :
              <div>Loading...</div>
            }
          </>
          <>
            {posts && posts.result ?
              <>
                {posts.result.length == 0 ?
                  <>
                    <h1 className="flex justify-center mt-3 text-3xl">friends posts</h1>
                    <p className="flex justify-center">no posts</p>
                  </>
                :
                  <>
                    <h1 className="flex justify-center mt-3 text-3xl">friends posts</h1>
                    {posts.result.map((post) => (
                      <Post
                        key={post._id}
                        postId={post._id}
                        id={newUser.id}
                        firstName={post.firstName} 
                        lastName={post.lastName}
                        date={post.date}
                        description={post.description}
                        likes={post.likes}
                        addLike={addLike}
                      />
                    ))}
                  </>
                }
              </>
            : 
              <div>Loading...</div>
            }
          </>
        </div>
        {mobileWidth < 1300 ? null : <FriendRequestsBar newUser={newUser} />}
      </div>
    </div>
  )
}