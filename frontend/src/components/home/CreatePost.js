import { useState } from 'react';
import axios from "axios";

export const CreatePost = ({ id, firstName }) => {
  const [post, setPost] = useState({
    description: '',
  })

  const createPostFunc = () => {
    if(post.description){
      axios.post(`http://localhost:8000/newPost/${id}`, {description: post.description});

      return window.location.reload();
    }
  }
  
  const handleChange = (e) => {
    const {name,value} = e.target;

    setPost({
      ...post,
      [name]:value
    })
  }

  return(
    <div className="w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-8/12 mx-auto p-5 border-2 border-black">
      <div className="flex">
        <div className="w-10 h-10 bg-black rounded-full mr-5"></div>
        <input type="text" name="description" onChange={handleChange} value={post.description} placeholder={`What's on your mine, ${firstName}`} className="w-full outline-none border-b-2 border-black focus:border-blue-300 hover:border-blue-300 textIndent pr-2 transition-colors" />       
      </div>
      <div className="w-full mb-2 mt-5 flex justify-end">
        <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors" onClick={createPostFunc}>Submit</button>
      </div>
    </div>
  )
}