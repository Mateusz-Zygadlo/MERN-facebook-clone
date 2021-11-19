import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';

export const Home = () => {
  const [openLeftBar, setOpenLeftBar] = useState(true);
  const [mobileWidth, setMobileWidth] = useState(600);

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

  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      <div className="flex mt-16">
        {mobileWidth < 1300 ? 
          <>
            {openLeftBar ? <LeftBar /> : null}
            <div className="bg-blue-200">
              <h1>This is my content board</h1>
            </div>
          </>
        :
          <>
            {openLeftBar ? <LeftBar /> : null}
            <div className="ml-60">
              <h1>This is my content board</h1>
            </div>
          </>
        }
      </div>
    </div>
  )
}