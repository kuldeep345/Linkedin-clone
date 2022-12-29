import { Avatar } from '@mui/material'
import { useSession , signOut } from 'next-auth/react'
import React, { useContext } from 'react'
import ModeContext from '../context/ModeContext'

const Sidebar = () => {
    const {darkMode} = useContext(ModeContext)

    const { data: session } = useSession()

  return (
    <div className={`space-y-2 min-w-max max-x-lg relative `}>
        <div className={`${darkMode ? 'bg-[#1D2226] border-none' : 'bg-white'} rounded-t-lg overflow-hidden flex flex-col items-center border border-gray-300 rounded-b-lg`}>
            <div className="w-full h-14 ">
                <img src='https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg' className="h-14 w-full"/>
            </div>
            <Avatar src={session?.user?.image} alt="" 
            className='h-16 w-16 absolute border-2 top-5 cursor-pointer'
            />
        
        <div className={`${darkMode ? 'bg-[#1D2226] border-none' : 'bg-white'} mt-6 py-4 px-4 space-x-0.5`}>
            <h4 className='text-center hover:underline decoration-purple-700 underline-offset-1 cursor-pointer'>{session?.user?.name}</h4>
            <p className={`text-center ${darkMode ? 'text-white/75' : 'text-black/60'}`}>{session?.user?.email}</p>
            </div>

            <div className={`hidden md:inline text-left ${darkMode && 'text-white/75'} text-sm w-full`}>
                <div className={`font-medium sidebarButton space-y-0.5 ${darkMode && 'border-t'}`}>
                    <div className="flex justify-between space-x-2">
                        <h4>Who viewed your profile</h4>
                        <span className='text-blue-500'>321</span>
                    </div>
                    <div className='flex justify-between space-x-2'>
                        <h4>Views of your post</h4>
                        <span className='text-blue-500'>1,892</span>
                    </div>
                </div>

                <div className={`sidebarButton ${darkMode && 'border-t'}`}>
                    <h4 className='leading-4 text-xs'>
                        Access exclusive tools & insights
                    </h4>
                    <h4 className={`${darkMode && 'text-white'} font-medium`}>
                        <span className='w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1'/>{` `}
                        Try Premium for free                     
                    </h4>
                </div>

                <div className='sidebarButton flex items-center space-x-1.5'>
                    {/* <BsFillBookmarkFill className='-ml-1'/> */}
                    <h4 className={`${darkMode && 'text-white'} font-medium`}>My items</h4>
                </div>
            </div>
        </div>

        <div className={`hidden md:flex  ${darkMode ? 'bg-[#1D2226]  text-white/75 border-none' : 'text-black/70 bg-white'} rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300`}>
        <p className="sidebarLink">Groups</p>
        <div className='flex items-center justify-between'>
        <p className="sidebarLink">Events</p>
        {/* <MdAdd className="text-2xl"/> */}
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
        <div className={`sidebarButton text-center ${darkMode && 'border-t'}`}>
            <h4 className={`${darkMode && 'text-white'} font-medium`}>Discover More</h4>
        </div>
        </div>

    </div>
  )
}

export default Sidebar