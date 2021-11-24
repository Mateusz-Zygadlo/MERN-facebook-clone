export const LeftBar = () => {
  return(
    <div className='w-60 fixed left-0 z-30 bg-white border-b-2 border-r-2 border-black'>
      <a href="/findFriends">
        <div className='flex p-5 hover:bg-gray-200 cursor-pointer'>
          <span className="material-icons mr-3">people_alt</span>
          <h1>find friend</h1>
        </div>
      </a>
    </div>
  )
}