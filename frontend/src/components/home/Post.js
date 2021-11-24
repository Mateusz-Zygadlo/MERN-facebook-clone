import React, { useState } from 'react';

export const Post = ({ postId, id, firstName, lastName, date, description, likes = [{name:'test'},{name:'test'},{name:'test'}], comments, addLike }) => {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <div className="my-5 w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-8/12 mx-auto p-5 border-2 border-black">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-black rounded-full"></div>
        <div className="ml-5 flex flex-col">
          <h1 className="text-lg">{firstName} {lastName}</h1>
          <p className="text-sm">{date}</p>
        </div>
      </div>
      <p className="mt-2 text-lg">{description}</p>
      <p className="mt-5 text-lg">{likes.length} likes</p>
      <div className="mt-3 flex justify-around border-t-2 border-b-2 border-black py-2">
        <button className="border-2 border-black hover:border-blue-300 transition-colors px-3 py-1" value={postId} onClick={addLike}>Like</button>
        <button className="border-2 border-black hover:border-blue-300 transition-colors px-3 py-1" onClick={()=>{setIsOpen(!isOpen)}}>Comment</button>
      </div>
      {isOpen ? 
        <form method="post" action={`http://localhost:8000/addComment/${postId}`} className="mt-5">
          <div className="flex">
            <div className="w-10 h-10 bg-black rounded-full mr-5"></div>
            <input type="text" name="post" placeholder='write your comment' className="w-full outline-none border-b-2 border-black focus:border-blue-300 hover:border-blue-300 textIndent pr-2 transition-colors" />       
          </div>
          <div className="w-full mb-2 mt-5 flex justify-end">
            <button type="submit" name={id} className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Submit</button>
          </div>
        </form>
      :
        null
      }
      <div className={isOpen ? null : 'mt-5'}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-black rounded-full"></div>
          <div className="ml-5 flex flex-col">
            <h1 className="text-lg">Mateusz Żygadło</h1>
            <p className="text-sm">10.11.2021</p>
          </div>
        </div>
        <p>This is a comment</p>
      </div>
    </div>
  )
}