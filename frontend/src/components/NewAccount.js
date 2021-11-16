import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const NewAccount = ({ openRegisterFunc }) => {
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [days, setDays] = useState([]);
  const [err, setErr] = useState(false);

  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    month: '',
    day: '',
    year: '',
    sex: '',
    pronoun: '',
    genderOptional: '',
  });
  const [customSection, setCustomSection] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const generateArrayOfYears = () => {
    const newYears = [];
    const newDays = [];
    const max = new Date().getFullYear()
    const min = max - 121;
  
    for(let i = max; i >= min; i--){
      newYears.push(i);
    }
    for(let j = 1; j < 32; j++){
      newDays.push(j);
    }

    setDays(newDays);
    setYears(newYears);
    setLoading(false);
  }
  
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
      setErr(false);
      axios.post('http://localhost:8000/auth/register/standard', register)
        .then((res) => console.log(res))
    }else{
      setErr(true);
    }
  }

  useEffect(() => {
    generateArrayOfYears();
  }, [])

  return(
    <div className="fixed w-full h-full top-0 left-0 z-10 backdrop-filter backdrop-blur-md flex justify-center items-center">
      <div className="w-96 border-2 bg-white pb-5 z-20">
        {err ? <h1 className="text-sm flex justify-center">set firstName lastName email and password</h1> : null}
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
          <p className="text-sm mt-2">Birthday</p>
          <div className="flex justify-between">
            <select name="month" className="h-8 w-24 border-2 rounded-md outline-none" onChange={(e)=>{handleChange(e)}} value={register.month}>
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
            {loading ? <div>Loading</div> :
              <>
                <select name="day" className="h-8 w-24 border-2 rounded-md outline-none" onChange={(e)=>{handleChange(e)}} value={register.day}>
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
                <select name="year" className="h-8 w-24 border-2 rounded-md outline-none" onChange={(e)=>{handleChange(e)}} value={register.year}>
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                </select>
              </>
            }
          </div>
          <p className="text-sm mt-2">Gender</p>
          <div className="flex justify-between">
            <div className="w-24 h-8 border-2 flex justify-between items-center px-3 rounded-md">
              <label htmlFor="female" className="h-full">female</label>
              <input type="radio" name="sex" value="female" id="female" onChange={(e)=>{setCustomSection(false); handleChange(e)}} required />
            </div>
            <div className="w-24 h-8 border-2 flex justify-between items-center px-3 rounded-md">
              <label htmlFor="male" className="h-full">male</label>
              <input type="radio" name="sex" id="male" value="male" onChange={(e)=>{setCustomSection(false); handleChange(e)}} />
            </div>
            <div className="w-24 h-8 border-2 flex justify-between items-center px-3 rounded-md">
              <label htmlFor="custom" className="h-full">Custom</label>
              <input type="radio" name="sex" id="custom" value="Custom" onChange={(e)=>{setCustomSection(true); handleChange(e)}} />
            </div>
          </div>
          {customSection ? 
            <>
              <select name="pronoun" className="h-10 mt-3 w-full border-2 rounded-md outline-none" select="true" onChange={(e)=>{handleChange(e)}}>
                <option select value disabled>Select your pronoun</option>
                <option value="She">She: "Wish her a happy birthday!"</option>
                <option value="He">He: "Wish him a happy birthday!"</option>
                <option value="They">They: "Wish them a happy birthday!"</option>
              </select>
              <p className="text-sm">Your pronoun is visible to everyone.</p>
              <input type="text" name="genderOptional" placeholder="Gender (optional)" className="h-10 textIndent w-full mt-2 border-2 rounded-md"  onChange={(e)=>{handleChange(e)}} value={register.genderOptional} />
            </> 
          :
            null
          }
          <div className="w-full h-14 mt-3 flex justify-center items-center">
            <button type="submit" className="bg-green-500 w-44 text-2xl h-10 rounded-md" onClick={(e)=>{registerUser(e)}}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}