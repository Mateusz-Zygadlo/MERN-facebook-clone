import { Navbar } from "../components/home/Navbar";
import { LeftBar } from '../components/home/LeftBar';
import { Friend } from "../components/Friend";

export const Friends = ({ setOpenLeftBarFunc, openLeftBar, mobileWidth, newUser }) => {
  return(
    <div className="w-full h-screen">
      <Navbar setOpenLeftBarFunc={setOpenLeftBarFunc} openLeftBar={openLeftBar} />
      <div className="mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
          <div className="my-5 w-11/12 sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-10/12 mx-auto p-5">
            <h1 className="text-3xl">Invitations</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              <Friend />
            </div>
            <h1 className="text-3xl">Friends</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              <Friend />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}