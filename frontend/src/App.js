import jwt_decode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { FailedLogin } from './pages/login/FailedLogin';
import { FailedRegister } from './pages/login/FailedRegister';
import { SuccessRegister } from './pages/login/SuccessRegister';
import { Home } from './pages/Home';
  
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
              <Home />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}