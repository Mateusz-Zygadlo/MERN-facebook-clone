import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';
import { Post } from "../components/home/Post";
import axios from 'axios';

export const Profile = ({ setOpenLeftBarFunc, openLeftBar, mobileWidth, newUser }) => {
  const [profile, setProfile] = useState(null);
  const [actualUser, setActualUser] = useState({...newUser});
  
  const [isFriend, setIsFriend] = useState(false);
  const [yourInvitation, setYourInvitation] = useState(false);
  const [invitation, setInvitation] = useState(false);
  
  const { id } = useParams();

  const getProfile = () => {
    setProfile(null);
    axios.get(`http://localhost:8000/profile/${id}`)
      .then((res) => setProfile(res.data))
  }
  const getActualUser = () => {
    if(actualUser && actualUser.id){
      axios.get(`http://localhost:8000/profile/${actualUser.id}`)
        .then((res) => setActualUser(res.data))
    }
  }
  const sendInvitation = () => {
    axios.post(`http://localhost:8000/addInvitation/${profile.result._id}`, newUser)
    
    return actualData()
  }
  const cancelInvitation = () => {
    axios.post(`http://localhost:8000/cancelInvitation/${profile.result._id}`, newUser)
      
    return actualData()
  }
  const acceptInvitation = () => {
    axios.post(`http://localhost:8000/acceptInvitation/${profile.result._id}`, newUser)
    
    return actualData()
  }
  const deleteInvitation = () => {
    axios.post(`http://localhost:8000/deleteInvitation/${profile.result._id}`, newUser);

    return actualData();
  }
  const deleteFriend = () => {
    axios.post(`http://localhost:8000/deleteFriend/${profile.result._id}`, newUser)
    
    return actualData()
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

  const actualData = () => {
    getProfile();
    getActualUser();
  }

  useEffect(() => {
    if(actualUser && actualUser.result && profile && profile.result){
      isFriendsFunc();
      isYourInvitation();
      isInvitation();
    }
  }, [actualUser, profile]);

  useEffect(() => {
    actualData();
  }, [])

  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      {profile && profile.result ? 
        <div className="mt-16">
          {openLeftBar ? <LeftBar /> : null}
          <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
            <div className="my-5 w-11/12 h-96 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-9/12 mx-auto p-5 border-2 border-black">
              <div className="h-40 w-40 bg-black rounded-full mx-auto"></div>
              <h1 className="text-3xl flex justify-center mt-3">{profile.result.firstName} {profile.result.lastName}</h1>
              <div className="flex justify-center mt-3">
                {isFriend ? 
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
              {profile.result ? <Post /> : <div>Add to friends to see user's posts</div> }
            </div>
          </div>
        </div>
      :
        <div>Loading...</div>
      }
    </div>
  )
} 