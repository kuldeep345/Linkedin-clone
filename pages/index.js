import Head from 'next/head'
import { getSession, signOut ,useSession} from 'next-auth/react'
import Header from '../components/Header'
import { useContext } from 'react'
import ModeContext from '../context/ModeContext'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
import { AnimatePresence } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'

export default function Home() {
  const router = useRouter()
  const {darkMode} = useContext(ModeContext)

  const [modalOpen , setModalOpen] = useRecoilState(modalState)
  const [modalType , setModalType] = useRecoilState(modalTypeState)

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    },
  })

  return (
    <div className={` ${darkMode ? 'bg-black text-white' :'bg-[#F3F2EF]'} h-screen overflow-y-scroll md:space-y-6`}>
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Header/>

    <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
      <div className='flex flex-col md:flex-row gap-5'>
        <Sidebar/>
        <Feed/>
      </div>
      {/* Widegts */}
      <AnimatePresence>
      {modalOpen && (
        <Modal handleClose={() => setModalOpen(false)} type={modalType} />
      )}
      </AnimatePresence>
    </main>

    </div>
  )
}

 
export async function getServerSideProps(context){
  const session = await getSession(context)
  if(!session){
    return {
      redirect:{
        permanent:false,
        destination:'/home'
      }
    }
  }

  return {
    props:{
      session 
    }
  }

}