import { useState, useEffect } from "react";
import { LeftBar } from '../components/home/LeftBar';
import { Friend } from "../components/Friend";
import axios from "axios";

export const FindFriends = ({ openLeftBar, mobileWidth, newUser }) => {
  const [responseData, setResponseData] = useState(null);

  const getFriends = () => {
    axios.post('http://localhost:8000/findFriends', {id: newUser.id})
      .then((res) => setResponseData(res.data))
  }

  useEffect(() => {
    console.log(newUser);
    getFriends();
  }, [])

  return(
    <div className="w-full h-screen">
      <div className="mt-16">
        {openLeftBar ? <LeftBar /> : null}
        <div className={mobileWidth < 1300 ? "pt-5 flex justify-center flex-col" : "ml-60 mr-72 flex justify-center flex-col"}>
          <div className="my-5 w-11/12 sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-10/12 mx-auto p-5">
            <h1 className="text-3xl">Find friend</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              {responseData && responseData.result ? 
                <>
                  {responseData.result.length == 0 ?
                    <div>Not found yours</div>
                  :
                    <>
                      {responseData.result.map((item) => (
                        <Friend key={item._id} firstName={item.firstName} lastName={item.lastName} id={item._id} /> 
                      ))}
                    </>
                  }
                </>
              :
                <div>Loading</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}