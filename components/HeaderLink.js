import React, { useContext } from 'react'
import ModeContext from '../context/ModeContext'


const HeaderLink = ({ Icon, text, avatar, active, feed, hidden }) => {

  const { darkMode, setDarkMode } = useContext(ModeContext)

  return (
    <>
      <div className={` ${hidden && "hidden md:inline-flex"} cursor-pointer flex flex-col justify-center items-center ${feed ? `text-black/60 hover:text-black lg:-mb-1.5 space-y-1` : "text-gray-500 hover:text-gray-700"} ${active && `!text-black ${darkMode && 'text-white'}`} `}>
        {avatar ? <Icon className={`h-7 w-7 mb-1 ${darkMode ? 'text-white' : 'text-black'}`} /> : <Icon className={`h-5 w-5 mb-1  ${darkMode ? 'text-white' : 'text-black'}`} />}
        <h4 className={`text-sm mt-1.5 ${feed && "hidden lg:flex justify-center w-full mx-auto"} ${darkMode && 'text-white'}`}>{text}</h4>
        {active && (
          <span className={`hidden lg:inline-flex h-0.5 w-[calc(100%+20px)]  ${darkMode ? "bg-white" : 'bg-black'} rounded-t-full`} />
        )}
      </div>

    </>
  )
}

export default HeaderLink
