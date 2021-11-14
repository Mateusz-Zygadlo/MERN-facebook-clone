import React, { useState } from 'react';
import FacebookLogo from '../assets/FacebookLogo.svg';
import { NewAccount } from '../components/NewAccount';

export const Login = () => {
  const [openRegister, setOpenRegister] = useState(false);

  const openRegisterFunc = (props) => {
    setOpenRegister(props);
  }

  return(
    <>
      <div className="w-screen flex h-screen bg-gray-100 flex-col items-center justify-start pt-24 lg:justify-center lg:items-start lg:flex-row lg:pt-56">
        <div className="mb-10 lg:mr-36">
          <img src={FacebookLogo} alt="Facebook logo" className="w-80 h-28" />
          <h1 className="text-2xl w-96 pl-10">Connect with friends and the world around you on Facebook.</h1>
        </div>
        <div className="w-96 bg-white rounded-md">
          <form method="post">
            <input type="text" name="email" placeholder="Email or phone number" className="block w-11/12 h-12 textIndent mx-auto my-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" required />
            <input type="password" name="password" placeholder="Password" className="block w-11/12 h-12 textIndent mx-auto my-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" required />
            <button type="submit" className="text-2xl text-white block w-11/12 h-12 border-2 border-blue-500 mx-auto my-3 rounded-lg bg-blue-500 hover:bg-blue-600 hover:border-blue-600">Log In</button>
          </form>
          <div className="w-11/12 my-6 border-t-2 mx-auto flex justify-center">
            <button className="mt-5 w-7/12 h-12 mx-auto rounded-lg bg-green-500 hover:bg-green-600 text-white text-xl" onClick={()=>{setOpenRegister(true)}}>Create new account</button>
          </div>
        </div>
      </div>
      {openRegister ?
        <NewAccount openRegisterFunc={openRegisterFunc} />
      :
        null
      }
    </>
  )
}