import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';
import { Post } from "../components/home/Post";

export const Profile = ({ setOpenLeftBarFunc, openLeftBar, mobileWidth, newUser }) => {
  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      <div className="mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
          <div className="my-5 w-11/12 h-96 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-9/12 mx-auto p-5 border-2 border-black">
            <div className="h-40 w-40 bg-black rounded-full mx-auto"></div>
            <h1 className="text-3xl flex justify-center mt-3">{newUser.firstName} {newUser.lastName}</h1>
            <div className="flex justify-center mt-3">
              {newUser.firstName ? 
                <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Send invitation</button>
              : newUser.lastName ? 
                <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Cancel send invitation</button>
              :
                <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Remove friend</button>
              }
            </div>
          </div>
          <div>
            {newUser ? <Post /> : <div>Add to friends to see user's posts</div> }
          </div>
        </div>
      </div>
    </div>
  )
}