import { useState, useEffect } from "react";
import { LeftBar } from '../components/home/LeftBar';
import { Friend } from "../components/Friend";
import axios from 'axios';

export const Friends = ({ openLeftBar, mobileWidth, newUser }) => {
  const [friends, setFriends] = useState(null);
  const [invitations, setInvitations] = useState(null);

  const getFriends = () => {
    axios.post('http://localhost:8000/friends', {id: newUser.id})
      .then((res) => setFriends(res.data))
  }
  const getInvitations = () => {
    axios.post('http://localhost:8000/invitations', {id: newUser.id})
      .then((res) => setInvitations(res.data))
  }

  useEffect(() => {
    getFriends();
    getInvitations();
  }, [])

  return(
    <div className="w-full h-screen">
      <div className="mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
          <div className="my-5 w-11/12 sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-10/12 mx-auto p-5">
            <h1 className="text-3xl">Invitations</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              {invitations && invitations.result ?
                  <>
                    {invitations.result.length == 0 ?
                      <div>Not found invitations</div>
                    :
                    invitations.result.map((item) => (
                        <Friend key={item._id} firstName={item.firstName} lastName={item.lastName} id={item._id} /> 
                      ))
                    }
                  </>
                :
                  <div>Loading...</div>
                }
            </div>
            <h1 className="text-3xl mt-3">Friends</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              {friends && friends.result ?
                <>
                  {friends.result.length == 0 ?
                    <div>Not found friends</div>
                  :
                    friends.result.map((item) => (
                      <Friend key={item._id} firstName={item.firstName} lastName={item.lastName} id={item._id} /> 
                    ))
                  }
                </>
              :
                <div>Loading...</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}