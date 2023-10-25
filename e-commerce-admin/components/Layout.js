import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";


export default function Layout({children}) {

  const { data: session } = useSession();

  if (!session) {
    return (<div className="bg-dark-blue w-screen h-screen flex items-center" >
      <div className="text-center w-full">
        <button className="bg-white p-3 rounded-xl" onClick={() => signIn('google')}>Login wtih Google</button>
      </div>
    </div>)
  }


  return (
    <div className="bg-dark-blue min-h-screen flex">
      <Nav />
      <div className="bg-shadow-of-light-blue flex-grow mt-2 mr-2 mb-2 p-4">
      {children}
      </div>
    </div>
  )


}