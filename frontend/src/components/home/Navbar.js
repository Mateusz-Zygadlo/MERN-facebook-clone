import React, { useState, useEffect } from 'react';
import FacebookLogoMobile from '../../assets/FacebookLogoMobile.svg';

export const Navbar = ({ setOpenLeftBarFunc, openLeftBar, newUser }) => {
  const [close, setClose] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(600);
  const [actualUser, setActualUser] = useState(null);

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
    setActualUser({...newUser})
  }, [])

  return(
    <div className="fixed top-0 left-0 w-full h-16 flex justify-between z-10 border-b-2 border-black bg-white">
      <div className="flex justify-center items-center">
        {mobileWidth < 1300 ? 
          <>
            <a href='/home'><img src={FacebookLogoMobile} alt="Facebook logo" className="h-14 cursor-pointer" title="home" /></a>
            <span onClick={()=>{setOpenLeftBarFunc(!openLeftBar)}} className="material-icons w-10 h-10 text-2xl border-2 border-black rounded-full flex justify-center items-center cursor-pointer" title="account">menu</span>
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
        <span onClick={()=>{setClose(!close)}} className="material-icons w-10 h-10 text-3xl rounded-full ml-5 flex justify-center items-center cursor-pointer" title="account">expand_more</span>
        {close ? 
          <div className="w-48 fixed top-14 right-3 p-2 z-30 backdrop-filter bg-white border-2 border-black">
            {actualUser && actualUser.id ? 
              <a href={`/profile/${newUser.id}`}>
                <div className="flex items-center hover:bg-gray-200 p-1 rounded-full cursor-pointer" title="me">
                  <div className="w-10 h-10 bg-black rounded-full mr-2"></div>
                  <h1 className="pr-1">{newUser.firstName} {newUser.lastName}</h1>
                </div>
              </a>
            :
              null
            }
            <a href="http://localhost:8000/logout" className="flex justify-center text-2xl mt-5 mb-2 hover:underline" title="logout">Logout</a>
          </div>
        :
          null
        }
      </div>
    </div>
  )
}