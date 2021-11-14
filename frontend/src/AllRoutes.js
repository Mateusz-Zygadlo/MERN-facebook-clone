import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { App } from './pages/App';

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
      </Routes>
    </BrowserRouter>
  )
}