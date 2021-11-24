import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment } from './Comment';

export const Post = ({ postId, id, authorId, firstName, lastName, date, description, likes, addLike, isAuthor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState(null);
  const [comment, setComment] = useState({
    description: ''
  });

  const getPostComments = () => {
    axios.get(`http://localhost:8000/postComments/${postId}`)
      .then((res) => setPostComments(res.data))
  }

  const showCommentsFunc = () => {
    setShowComments(!showComments);
  }

  const handleChange = (e) => {
    const {name,value} = e.target;

    setComment({
      ...comment,
      [name]:value
    })
  }

  const addComment = (e) => {
    e.preventDefault();

    if(comment.description){
      axios.post(`http://localhost:8000/addComment`, {description: comment.description, id, postId})
        .then((res) => console.log(res.data))
    }

    return window.location.reload();
  }

  const deletePost = () => {
    axios.post(`http://localhost:8000/deletePost/${postId}`)

    return window.location.reload();
  }

  useEffect(() => {
    getPostComments()
  }, [])

  return(
    <div className="my-5 w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-8/12 mx-auto p-5 border-2 border-black">
      <div className="flex items-center">
        <div className="flex">
          <div className="w-10 h-10 bg-black rounded-full"></div>
          <div className="ml-5 flex flex-col">
            <a href={`/profile/${authorId}`}><h1 className="text-lg">{firstName} {lastName}</h1></a>
            <p className="text-sm">{date}</p>
          </div>
        </div>
        {isAuthor ? <h1 className="ml-10 hover:border-blue-300 cursor-pointer border-2 border-black px-1" onClick={deletePost}>Delete post</h1> : null}
      </div>
      <p className="mt-2 text-lg">{description}</p>
      <p className="mt-5 text-lg">{likes.length} likes</p>
      <div className="mt-3 flex justify-around border-t-2 border-b-2 border-black py-2">
        <button className="border-2 border-black hover:border-blue-300 transition-colors px-3 py-1" value={postId} onClick={addLike}>Like</button>
        <button className="border-2 border-black hover:border-blue-300 transition-colors px-3 py-1" onClick={()=>{setIsOpen(!isOpen)}}>Add comment</button>
        <button className="border-2 border-black hover:border-blue-300 transition-colors px-3 py-1" onClick={showCommentsFunc}>{showComments ? 'Close comments' : 'Show comments'}</button>
      </div>
      {isOpen ? 
        <form className="mt-5">
          <div className="flex">
            <div className="w-10 h-10 bg-black rounded-full mr-5"></div>
            <input onChange={handleChange} value={comment.description} type="text" name="description" placeholder='write your comment' className="w-full outline-none border-b-2 border-black focus:border-blue-300 hover:border-blue-300 textIndent pr-2 transition-colors" />       
          </div>
          <div className="w-full mb-2 mt-5 flex justify-end">
            <button type="submit" onClick={(e)=>{addComment(e)}} className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Submit</button>
          </div>
        </form>
      :
        null
      }
      <>
        {showComments ? 
          <>
            {postComments && postComments.result ? 
              <>
                {postComments.result.length == 0 ? 
                  <div>No comments</div>
                :
                  <>
                    {postComments.result.map((comment) => (
                      comment.author == id ? 
                        <Comment 
                          firstName={comment.firstName} 
                          lastName={comment.lastName} 
                          date={comment.date} 
                          description={comment.description} 
                          userId={comment.author} 
                          author={true} 
                          id={comment._id} /> 
                      : 
                        <Comment 
                          firstName={comment.firstName} 
                          lastName={comment.lastName} 
                          date={comment.date} 
                          description={comment.description} 
                          userId={comment.author} />
                    ))}
                  </>
                }
              </>
            :
              <div>Loading...</div>
            }
          </>
        :
          null
        }
      </>
    </div>
  )
}