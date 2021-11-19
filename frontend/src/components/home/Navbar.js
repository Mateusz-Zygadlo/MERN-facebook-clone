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
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-300 flex justify-between">
      <div className="flex justify-center items-center">
        {mobileWidth < 1300 ? 
          <>
            <img src={FacebookLogoMobile} alt="Facebook logo" className="h-14 cursor-pointer" title="home" />
            <span onClick={()=>{setOpenLeftBarFunc(!openLeftBar)}} className="material-icons w-10 h-10 bg-gray-400 hover:bg-gray-500 text-2xl text-white rounded-full flex justify-center items-center cursor-pointer" title="account">menu</span>
          </>
        :
          <img src={FacebookLogoMobile} alt="Facebook logo" className="h-14 cursor-pointer" title="home" />
        }
      </div>
      <div className="flex">
        <span className="material-icons materialIcon" title="home page">home</span>
        <span className="material-icons materialIcon" title="friends">people</span>
      </div>
      <div className="flex justify-end mr-4 items-center">
        <span onClick={()=>{setClose(!close)}} className="material-icons w-10 h-10 bg-gray-400 hover:bg-gray-500 text-3xl text-white rounded-full ml-5 flex justify-center items-center cursor-pointer" title="account">expand_more</span>
        {close ? 
          <div className="bg-blue-300 w-48 absolute top-14 right-3 p-2">
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