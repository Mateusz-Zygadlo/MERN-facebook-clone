export const LeftBar = () => {
  return(
    <div className='w-60 bg-gray-200 fixed left-0 z-30'>
      <div className='flex p-5 bg-gray-200 hover:bg-gray-300 cursor-pointer'>
        <span className="material-icons mr-3">people_alt</span>
        <h1>find friend</h1>
      </div>
    </div>
  )
}