import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';
import { FriendRequestsBar } from '../components/home/FriendRequestsBar';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { CreatePost } from '../components/home/CreatePost';
import { Post } from '../components/home/Post';

export const Home = () => {
  const [openLeftBar, setOpenLeftBar] = useState(true);
  const [mobileWidth, setMobileWidth] = useState(1400);
  const [newUser, setNewUser] = useState({});

  const decodeUser = () => {
    const userToken = document.cookie.split(' ')[0].split('=')[1];
    if(!userToken){
      return;
    }
    const decoded = jwt_decode(userToken);
  
    setNewUser({...decoded});
  }
  
  const setOpenLeftBarFunc = (props) => {
    setOpenLeftBar(props);
  }

  useEffect(() => {
    const resizeFunc = () => {
        if(window.innerWidth){
          setMobileWidth(window.innerWidth);

          if(mobileWidth < 1300){
            setOpenLeftBarFunc(false);
          }else{
            setOpenLeftBarFunc(true);
          }
        }
    }

    window.addEventListener('resize', resizeFunc);

    return () => {
        window.removeEventListener('resize', resizeFunc);
    }
  });

  useEffect(() => {
    decodeUser()
  }, [])

  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      <div className="flex mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "w-full pt-5 flex justify-center flex-col" : "ml-60 w-full mr-72 flex justify-center flex-col"}>
          <WelcomeBanner firstName={newUser.firstName} />
          <CreatePost id={newUser.id} firstName={newUser.firstName} />
          <Post />
        </div>
        {mobileWidth < 1300 ? null : <FriendRequestsBar />}
      </div>
    </div>
  )
}