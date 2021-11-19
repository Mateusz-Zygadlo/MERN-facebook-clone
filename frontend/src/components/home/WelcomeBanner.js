export const WelcomeBanner = ({ firstName }) => {
  return(
    <div className="pb-2 mt-4 w-full flex justify-center">
      <h1 className="text-3xl">Welcome {firstName}</h1>
    </div>
  )
}