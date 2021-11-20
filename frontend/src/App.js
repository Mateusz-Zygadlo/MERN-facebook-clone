import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { FailedLogin } from './pages/login/FailedLogin';
import { FailedRegister } from './pages/login/FailedRegister';
import { SuccessRegister } from './pages/login/SuccessRegister';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Friends } from './pages/Friends';
import { FindFriends } from './pages/FindFriends';
  
const decodeUser = () => {
  const userToken = document.cookie.split(' ')[0].split('=')[1];
  if(!userToken){
    return;
  }
  const decoded = jwt_decode(userToken);

  return decoded;
}

const PrivateRoute = ({ children }) => {
  const user = decodeUser();
  
  return user ? children : <Navigate to="/" />
}
const GuestRoute = ({ children }) => {
  const user = decodeUser();

  return user ? <Navigate to="/home" /> : children
}

export const App = () => {
  const [openLeftBar, setOpenLeftBar] = useState(true);
  const [mobileWidth, setMobileWidth] = useState(1400);
  const [newUser, setNewUser] = useState({});
  
  const setOpenLeftBarFunc = (props) => {
    setOpenLeftBar(props);
  }

  const decodeUser = () => {
    const userToken = document.cookie.split(' ')[0].split('=')[1];
    if(!userToken){
      return;
    }
    const decoded = jwt_decode(userToken);
  
    setNewUser({...decoded});
  }

  useEffect(() => {
    decodeUser()
  }, [])

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
    <BrowserRouter>
      <Routes>
        <Route 
          exact 
          path='/' 
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } />
        <Route 
          exact 
          path='/failedLogin' 
          element={
            <GuestRoute>
              <FailedLogin />
            </GuestRoute>
          } />
        <Route
          exact
          path='/failedRegister'
          element={
            <GuestRoute>
              <FailedRegister />
            </GuestRoute>
          } />
        <Route
          exact
          path='/successRegister'
          element={
            <GuestRoute>
              <SuccessRegister />
            </GuestRoute>
          } />
        <Route
          exact
          path='/home'
          element={
            <PrivateRoute>
              <Home setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} mobileWidth={mobileWidth} newUser={newUser} />
            </PrivateRoute>
          } />
        <Route
          exact
          path='/profile/:id'
          element={
            <PrivateRoute>
              <Profile setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} mobileWidth={mobileWidth} newUser={newUser} />
            </PrivateRoute>
          } />
        <Route
          exact
          path='/friends'
          element={
            <PrivateRoute>
              <Friends setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} mobileWidth={mobileWidth} newUser={newUser} />
            </PrivateRoute>
          } />
        <Route
          exact
          path='/findFriends'
          element={
            <PrivateRoute>
              <FindFriends setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} mobileWidth={mobileWidth} newUser={newUser} />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}