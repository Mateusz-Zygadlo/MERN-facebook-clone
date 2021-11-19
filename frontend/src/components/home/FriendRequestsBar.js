export const FriendRequestsBar = () => {
  return(
    <div className="fixed right-0 bg-gray-200 pb-5 z-0">
      <div className="flex justify-between pt-5 px-5">
        <div className="flex items-center cursor-pointer">
          <div className="h-10 w-10 bg-black mr-3 rounded-full"></div>
          <h1>Mateusz Żygadło</h1>
        </div>
        <div className="flex ml-3 items-center">
          <span className="material-icons mr-3 cursor-pointer">add</span>
          <span className="material-icons cursor-pointer">delete</span>
        </div>
      </div>
    </div>
  )
}