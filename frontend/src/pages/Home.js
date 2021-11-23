import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';
import { FriendRequestsBar } from '../components/home/FriendRequestsBar';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { CreatePost } from '../components/home/CreatePost';
import { Post } from '../components/home/Post';

export const Home = ({ setOpenLeftBarFunc, openLeftBar, mobileWidth, newUser }) => {
  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      <div className="flex mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "w-full pt-5 flex justify-center flex-col" : "ml-60 w-full mr-72 flex justify-center flex-col"}>
          <WelcomeBanner firstName={newUser.firstName} />
          <CreatePost id={newUser.id} firstName={newUser.firstName} />
          <Post />
        </div>
        {mobileWidth < 1300 ? null : <FriendRequestsBar newUser={newUser} />}
      </div>
    </div>
  )
}