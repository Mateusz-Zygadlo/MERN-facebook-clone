import { useNavigate } from 'react-router-dom';

export const SuccessRegister = () => {
  const history = useNavigate();

  setTimeout(() => {
    return history('/');
  }, 1250)

  return(
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <h1 className="text-5xl text-white">Success register page</h1>
    </div>
  )
}