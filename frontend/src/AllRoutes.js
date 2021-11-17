import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { App } from './pages/App';
import { FailedLogin } from './pages/FailedLogin';
import { SuccessLogin } from './pages/SuccessLogin';

export const AllRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/' 
          element={<Login />}
        />
        <Route
          exact
          path='/home'
          element={<App />}
        />
        <Route
          exact
          path='/failedLogin'
          element={<FailedLogin />}
        />
        <Route
          exact
          path='/successLogin'
          element={<SuccessLogin />}
        />
      </Routes>
    </BrowserRouter>
  )
}