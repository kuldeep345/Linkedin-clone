import React, { useContext } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import HeaderLink from './HeaderLink'
import ModeContext from '../context/ModeContext'
import { motion } from 'framer-motion'

const spring = {
  type:'spring',
  stiffness:700,
  damping:30
}

const Header = () => {

  const { darkMode , setDarkMode } = useContext(ModeContext)

  return (
    <header className={`sticky top-0 z-40 bg-white ${darkMode && "bg-[#1D2226]"} flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg`}>
        <div className='flex items-center space-x-2 w-full max-w-xs'>
            {darkMode ? <img src="/linkedin-white.png" className='h-12 w-12' /> : <img src="/linkedin.png" className='h-12 w-14 rounded-lg' />}
        <div className={`flex items-center space-x-1  py-2.5 px-4 rounded w-full ${darkMode && "md:bg-gray-700"}`}>
            <SearchIcon className={darkMode ? 'text-white' : 'text-black'}/>
            <input 
            type="text" 
            placeholder="Search" 
            className={`hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 ${darkMode && 'placeholder-white/75'} flex-grow`}/>
        </div>
        </div>

        <div className="flex items-center space-x-6" feed avatar hidden >
            <HeaderLink Icon={HomeIcon} text="Home" feed active/>
            <HeaderLink Icon={GroupIcon} text="My Network" feed/>
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed avatar hidden/>
            <HeaderLink Icon={MessageIcon} text="Messaging" feed />
            <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
            <HeaderLink Icon={AccountCircleIcon} text="Me" feed avatar hidden/>
            <HeaderLink Icon={AppsIcon} text="Work" feed hidden />
        
        <div
        className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative  ${darkMode ? 'justify-start' : 'justify-end'}`}
        onClick={()=>setDarkMode(!darkMode)}
        >
            <span className='absolute right-0.5'>🌜</span>
            <motion.div className='w-5 h-5 bg-white flex rounded-full z-40' layout transition={spring}></motion.div>
            <span className='absolute left-0.5'>🌞</span>
        </div>
        </div>
    </header>
  )
}

export default Header