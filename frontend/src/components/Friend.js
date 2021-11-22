export const Friend = ({ firstName, lastName, id }) => {
  return(
    <div className="w-60 h-20 m-2 flex items-center p-5 border-2 border-black">
      <div className="h-10 w-10 bg-black rounded-full mr-3"></div>
      <a href={`/profile/${id}`}>{firstName} {lastName}</a>
    </div>
  )
}