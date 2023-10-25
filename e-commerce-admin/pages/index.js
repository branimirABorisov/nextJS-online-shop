import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";
import Layout from "@/components/Layout";


export default function Home() {
const {data: session} = useSession();


  return (
    <Layout>
      <div className="text-dark-blue">
        <h2>Hello, <b>{session?.user?.name}</b></h2>
      </div>
    </Layout>
  )


}
