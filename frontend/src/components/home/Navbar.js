import React, { useState, useEffect } from 'react';
import FacebookLogoMobile from '../../assets/FacebookLogoMobile.svg';

export const Navbar = ({ setOpenLeftBarFunc, openLeftBar }) => {
  const [close, setClose] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(600);

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

  return(
    <div className="fixed top-0 left-0 w-full h-16 flex justify-between z-10 border-b-2 border-black bg-white">
      <div className="flex justify-center items-center">
        {mobileWidth < 1300 ? 
          <>
            <a href='/home'><img src={FacebookLogoMobile} alt="Facebook logo" className="h-14 cursor-pointer" title="home" /></a>
            <span onClick={()=>{setOpenLeftBarFunc(!openLeftBar)}} className="material-icons w-10 h-10 bg-gray-400 hover:bg-gray-200 text-2xl text-white rounded-full flex justify-center items-center cursor-pointer" title="account">menu</span>
          </>
        :
          <img src={FacebookLogoMobile} alt="Facebook logo" className="h-14 cursor-pointer" title="home" />
        }
      </div>
      <div className="flex">
        <a href='/home' className="materialIcon"><span className="material-icons text-3xl" title="home page">home</span></a>
        <a href='/friends' className="materialIcon"><span className="material-icons text-3xl" title="friends">people</span></a>
      </div>
      <div className="flex justify-end mr-4 items-center">
        <span onClick={()=>{setClose(!close)}} className="material-icons w-10 h-10 bg-gray-400 hover:bg-gray-500 text-3xl text-white rounded-full ml-5 flex justify-center items-center cursor-pointer" title="account">expand_more</span>
        {close ? 
          <div className="bg-blue-300 w-48 fixed top-14 right-3 p-2 z-30">
            <div className="flex items-center hover:bg-gray-400 p-1 rounded-full cursor-pointer" title="me">
              <div className="w-10 h-10 bg-black rounded-full mr-2"></div>
              <h1 className="pr-1">Username</h1>
            </div>
            <a href="http://localhost:8000/logout" className="flex justify-center text-2xl mt-5 mb-2 hover:underline" title="logout">Logout</a>
          </div>
        :
          null
        }
      </div>
    </div>
  )
}