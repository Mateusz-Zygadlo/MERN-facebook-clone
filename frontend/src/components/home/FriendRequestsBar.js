import axios from 'axios';
import { useState, useEffect } from 'react';

export const FriendRequestsBar = ({ newUser }) => {
  const [friendRequests, setFriendRequests] = useState(null);

  const friendRequestsFunc = () => {
    axios.get(`http://localhost:8000/friendRequests/${newUser.id}`)
      .then((res) => setFriendRequests(res.data))
  }

  const acceptUser = (e) => {
    const userInvitation = e.target.dataset.id;

    axios.post(`http://localhost:8000/acceptInvitation/${userInvitation}`, {id: newUser.id})
      .then((res) => console.log(res.data))
    
    friendRequestsFunc();
  }
  const deleteInvitation = (e) => {
    const userInvitation = e.target.dataset.id;

    axios.post(`http://localhost:8000/deleteInvitation/${userInvitation}`, {id: newUser.id})
      .then((res) => console.log(res.data))

    friendRequestsFunc();
  }
  
  useEffect(() => {
    friendRequestsFunc();
  }, [])
  
  return(
    <div className="fixed right-0 bg-white border-b-2 border-l-2 border-black pb-5 z-0">
      {friendRequests && friendRequests.result ?
        <>
          {friendRequests.result.map((user) => (
            <div key={user._id} className="flex justify-between pt-5 px-5">
              <div className="flex items-center cursor-pointer">
                <div className="h-10 w-10 bg-black mr-3 rounded-full"></div>
                <h1>{user.firstName} {user.lastName}</h1>
              </div>
              <div className="flex ml-3 items-center">
                <span className="material-icons mr-3 cursor-pointer" data-id={user._id} onClick={(e)=>{acceptUser(e)}}>add</span>
                <span className="material-icons cursor-pointer" data-id={user._id} onClick={(e)=>{deleteInvitation(e)}}>delete</span>
              </div>
            </div>
          ))}
        </>
      :
        <div>Loading...</div>
      }
    </div>
  )
}