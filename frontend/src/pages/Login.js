import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacebookLogo from '../assets/FacebookLogo.svg';
import { NewAccount } from '../components/NewAccount';

axios.defaults.withCredentials = true;

export const Login = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [responseData, setResponsiveData] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name,value} = e.target

    setLoginData({
      ...loginData,
      [name]:value
      })
  }

  const openRegisterFunc = (props) => {
    setOpenRegister(props);
  }
  const loginUser = (e) => {
    e.preventDefault();

    const {email, password} = loginData;

    if(email, password){
      axios.post('http://localhost:8000/auth/login/standard', loginData)
        .then((res) => setResponsiveData(res.data))
    }
  }
  const loginWithFacebook = (e) => {
    e.preventDefault();

    window.open("http://localhost:8000/auth/facebook", "_self");
  }

  return(
    <>
      {responseData && responseData.err ?
        <div className="absolute top-5 left-0 w-screen flex justify-center">
          <p className="text-2xl">Email or password is incorrect</p>
        </div>
      :
        null
      }
      <div className="w-screen flex h-screen bg-gray-100 flex-col items-center justify-start pt-24 lg:justify-center lg:items-start lg:flex-row lg:pt-56">
        <div className="mb-10 lg:mr-36">
          <img src={FacebookLogo} alt="Facebook logo" className="w-80 h-28" />
          <h1 className="text-2xl w-96 pl-10">Connect with friends and the world around you on Facebook.</h1>
        </div>
        <div className="w-96 bg-white rounded-md">
          <form>
            <input type="text" name="email" onChange={(e)=>handleChange(e)} placeholder="Email or phone number" className="block w-11/12 h-12 textIndent mx-auto my-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" required />
            <input type="password" name="password" onChange={(e)=>{handleChange(e)}} placeholder="Password" className="block w-11/12 h-12 textIndent mx-auto my-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" required />
            <button type="submit" onClick={(e)=>{loginUser(e)}} className="text-2xl text-white block w-11/12 h-12 border-2 border-blue-500 mx-auto my-3 rounded-lg bg-blue-500 hover:bg-blue-600 hover:border-blue-600">Log In</button>
          </form>
          <div className="w-11/12 my-6 border-t-2 mx-auto flex justify-center">
            <button className="mt-5 w-7/12 h-12 mx-auto rounded-lg bg-green-500 hover:bg-green-600 text-white text-xl" onClick={()=>{setOpenRegister(true)}}>Create new account</button>
          </div>
          <div className="w-11/12 border-t2 mx-auto flex justify-center">
            <a href='/auth/facebook' className="mb-3 w-7/12 h-12 flex items-center justify-center mx-auto rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xl" onClick={(e)=>{loginWithFacebook(e)}}>Login with facebook</a>
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