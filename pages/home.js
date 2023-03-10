import Image from "next/image"
import HeaderLink from "../components/HeaderLink"
import Head from "next/head"
import Link from "next/link"
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { getProviders , signIn } from 'next-auth/react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home({providers}) {  
  return (
    <div className="space-y-10 relative">
      
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

        <header className="flex justify-around items-center py-4">
            <div className="relative w-36 h-10">
                <Link href="/"><img src="https://rb.gy/vtbzlp" alt="" className="w-36 h-10 cursor-pointer"/></Link>
            </div>
            <div className="flex items-center sm:divide-x divide-gray-300">  
                <div className="hidden sm:flex space-x-8 pr-4">
                  <HeaderLink Icon={ExploreIcon} text="Discover"/> 
                  <HeaderLink Icon={GroupIcon} text="People"/> 
                  <HeaderLink Icon={OndemandVideoIcon} text="Learning"/> 
                  <HeaderLink Icon={BusinessCenterIcon} text="Jobs"/> 
              </div>
            { 
              Object.values(providers).map((provider) => (
            <div className="pl-4" key={provider.name}>
              <button className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
              onClick={() => signIn(provider.id , {callbackUrl:'/'})}
              >Sign in</button>
              </div>
                ))
              }
            </div>
        </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">Welcome to your professional community</h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
               <ArrowForwardIosIcon className="text-gray-700 text-3xl"/> 
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
               <ArrowForwardIosIcon className="text-gray-700 text-3xl"/> 
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosIcon className="text-gray-700 text-3xl"/> 
            </div>
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <img src="https://rb.gy/vkzpzt" className="w-full h-full"/>
        </div>

      </main>

    </div>
  )
}

export default Home

export async function getServerSideProps(context){
  const providers = await getProviders()

  return {
    props:{
      providers,
    }
  }
}