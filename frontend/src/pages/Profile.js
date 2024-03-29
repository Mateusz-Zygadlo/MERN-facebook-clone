import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LeftBar } from '../components/home/LeftBar';
import { Post } from "../components/home/Post";
import axios from 'axios';

export const Profile = ({ openLeftBar, mobileWidth, newUser, addLike }) => {
  const [profile, setProfile] = useState(null);
  const [profilePosts, setProfilePosts] = useState(null);
  const [actualUser, setActualUser] = useState({...newUser});
  
  const [isFriend, setIsFriend] = useState(false);
  const [yourInvitation, setYourInvitation] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [yourProfile, setYourProfile] = useState(false);
  
  const { id } = useParams();

  const getProfile = () => {
    axios.get(`http://localhost:8000/profile/${id}`)
      .then((res) => {
        setProfile(res.data)
        getProfilePosts(res.data.result._id)
      })
  }
  const getActualUser = () => {
    if(actualUser && actualUser.id){
      axios.get(`http://localhost:8000/profile/${actualUser.id}`)
        .then((res) => setActualUser(res.data))
    }
  }
  const getProfilePosts = (id) => {
    axios.get(`http://localhost:8000/ownerPosts/${id}`)
      .then((res) => setProfilePosts(res.data))
  }
  const sendInvitation = () => {
    axios.post(`http://localhost:8000/addInvitation/${profile.result._id}`, newUser)

    return window.location.reload();
  }
  const cancelInvitation = () => {
    axios.post(`http://localhost:8000/cancelInvitation/${profile.result._id}`, newUser)

    return window.location.reload();
  }
  const acceptInvitation = () => {
    axios.post(`http://localhost:8000/acceptInvitation/${profile.result._id}`, newUser)

    return window.location.reload();
  }
  const deleteInvitation = () => {
    axios.post(`http://localhost:8000/deleteInvitation/${profile.result._id}`, newUser)

    return window.location.reload();
  }
  const deleteFriend = () => {
    axios.post(`http://localhost:8000/deleteFriend/${profile.result._id}`, newUser)

    return window.location.reload();
  }

  const isFriendsFunc = () => {
    const test = actualUser.result.friends.filter((user) => user == profile.result._id);

    if(test.length){
      setIsFriend(true);
    }else{
      setIsFriend(false);
    }
  }
  const isYourInvitation = () => {
    const test = actualUser.result.yourInvitations.filter((user) => user == profile.result._id);
    
    if(test.length){
      setYourInvitation(true);
    }else{
      setYourInvitation(false);
    }
  }
  const isInvitation = () => {
    const test = actualUser.result.invitations.filter((user) => user == profile.result._id);
    
    if(test.length){
      setInvitation(true);
    }else{
      setInvitation(false);
    }
  }
  const isYourProfile = () => {
    if(newUser && newUser.id && newUser.id == id){
      setYourProfile(true);
    }else{
      setYourProfile(false);
    }
  }

  const actualData = () => {
    getProfile();
    getActualUser();
  }

  const userFriends = () => {
    if(actualUser && actualUser.result && profile && profile.result){
      isFriendsFunc();
      isYourInvitation();
      isInvitation();
      isYourProfile();
    }
  }

  useEffect(() => {
    userFriends();
  }, [profile, actualUser])

  useEffect(() => {
    actualData();
  }, [])

  return(
    <div className="w-full">
      {profile && profile.result ? 
        <div className="mt-16">
          {openLeftBar ? <LeftBar /> : null}
          <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
            <div className="my-5 w-11/12 h-96 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-9/12 mx-auto p-5 border-2 border-black">
              <div className="h-40 w-40 bg-black rounded-full mx-auto"></div>
              <h1 className="text-3xl flex justify-center mt-3">{profile.result.firstName} {profile.result.lastName}</h1>
              <div className="flex justify-center mt-3">
                {yourProfile ?
                  <div className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Your profile</div>
                : isFriend ? 
                  <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={deleteFriend}>Remove friend</button>
                : yourInvitation ?
                  <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={cancelInvitation}>Cancel send invitation</button>
                : invitation ?
                  <>
                    <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={acceptInvitation}>Accept invitation</button>
                    <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={deleteInvitation}>Delete invitation</button>
                  </>
                :
                  <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={sendInvitation}>Send invitation</button>
                }
              </div>
            </div>
            <div>
              {profilePosts && profilePosts.result ?
                <>
                  {profilePosts.result.length == 0 ? 
                    <h1 className="text-3xl flex justify-center">No posts</h1>
                  :
                    <>
                      {profilePosts.result.map((post) => (
                        post.author == newUser.id ?
                          <Post
                            key={post._id}
                            postId={post._id}
                            id={newUser.id}
                            authorId={post.author}
                            firstName={post.firstName} 
                            lastName={post.lastName}
                            date={post.date}
                            description={post.description}
                            likes={post.likes}
                            addLike={addLike}
                            isAuthor={true}
                          />
                        :
                          <Post
                            key={post._id}
                            postId={post._id}
                            id={newUser.id}
                            authorId={post.author}
                            firstName={post.firstName} 
                            lastName={post.lastName}
                            date={post.date}
                            description={post.description}
                            likes={post.likes}
                            addLike={addLike}
                            isAuthor={false}
                          />
                      ))}
                    </>
                  }
                </>
              :
                <div>Add to friends to see user's posts</div>
              }
            </div>
          </div>
        </div>
      :
        <div>Loading...</div>
      }
    </div>
  )
} 