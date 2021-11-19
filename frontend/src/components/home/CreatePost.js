export const CreatePost = ({ id, firstName }) => {
  return(
    <div className="w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-8/12 mx-auto p-5 border-2 border-black">
      <form method="POST" action={`http://localhost:8000/newPost/${id}`}>
        <div className="flex">
          <div className="w-10 h-10 bg-black rounded-full mr-5"></div>
          <input type="text" name="post" placeholder={`What's on your mine, ${firstName}`} className="w-full outline-none border-b-2 border-black focus:border-blue-300 hover:border-blue-300 textIndent pr-2 transition-colors" />       
        </div>
        <div className="w-full mb-2 mt-5 flex justify-end">
          <button className="border-2 border-black hover:border-blue-300 px-2 py-1 transition-colors">Submit</button>
        </div>
      </form>
    </div>
  )
}