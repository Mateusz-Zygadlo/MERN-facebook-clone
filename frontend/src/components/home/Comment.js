import axios from "axios";

export const Comment = ({ firstName, lastName, date, description, userId, author, id }) => {
  const deleteComment = () => {
    axios.post(`http://localhost:8000/deleteComment/${id}`)

    return window.location.reload();
  }
  
  return(
    <div className='mt-3 border-b-2 border-black pb-2'>
      <div className="flex items-center">
        <div className="flex">
          <div className="w-10 h-10 bg-black rounded-full"></div>
          <div className="ml-5 flex flex-col">
            <a href={`/profile/${userId}`}><h1 className="text-lg">{firstName} {lastName}</h1></a>
            <p className="text-sm">{date}</p>
          </div>
        </div>
        {author ? <h1 className="ml-10 hover:border-blue-300 cursor-pointer border-2 border-black px-1" onClick={deleteComment}>Delete comment</h1> : null}
      </div>
      <p>{description}</p>
    </div>
  )
} 