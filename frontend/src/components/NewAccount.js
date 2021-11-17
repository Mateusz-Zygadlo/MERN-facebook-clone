import React, { useState } from 'react';
import axios from 'axios';

export const NewAccount = ({ openRegisterFunc }) => {
  const [responseData, setResponsiveData] = useState(null);
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  
  const handleChange = (e) => {
    const {name,value} = e.target

    setRegister({
      ...register,
      [name]:value
      })
  }

  const registerUser = (e) => {
    const {email, password, firstName, lastName} = register;
    e.preventDefault();

    if(email, password, firstName, lastName){
      axios.post('http://localhost:8000/auth/register/standard', register)
        .then((res) => setResponsiveData(res.data))
    }else{
      setResponsiveData({err: 'fill each empty input'})
    }
  }

  return(
    <div className="fixed w-full h-full top-0 left-0 z-10 backdrop-filter backdrop-blur-md flex justify-center items-center">
      <div className="absolute top-24 left-0 w-screen flex justify-center">
        {responseData && responseData.err ? 
          <p className="text-3xl">{responseData.err}</p>
        :
          null
        }
      </div>
      <div className="w-96 border-2 bg-white pb-5 z-20">
        <div className="flex justify-between px-5 pt-5">
          <h1 className="text-3xl">Sign Up</h1>
          <span className="material-icons flex justify-center items-center cursor-pointer" onClick={()=>{openRegisterFunc(false)}}>close</span>
        </div>
        <p className="pb-2 pl-5 border-b-2">It’s quick and easy.</p>
        <form className="mt-3 mx-5" method="post">
          <div className="flex justify-between">
            <input type="text" name="firstName" placeholder="First Name" className="h-10 textIndent w-5/12 border-2 rounded-md" onChange={(e)=>{handleChange(e)}} value={register.firstName} required />
            <input type="text" name="lastName" placeholder="Last Name" className="h-10 textIndent w-6/12 border-2 rounded-md" onChange={(e)=>{handleChange(e)}} value={register.lastName} required />
          </div>
          <input type="text" name="email" placeholder="Mobile number or email" className="h-10 mt-2 textIndent w-full border-2 rounded-md" onChange={(e)=>{handleChange(e)}} value={register.email} required />
          <input type="password" name="password" placeholder="New password" className="h-10 mt-2 textIndent w-full border-2 rounded-md" onChange={(e)=>{handleChange(e)}} value={register.password} required />
          <div className="w-full h-14 mt-3 flex justify-center items-center">
            <button type="submit" className="bg-green-500 w-44 text-2xl h-10 rounded-md" onClick={(e)=>{registerUser(e)}}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}