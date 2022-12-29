import React, { useContext } from 'react'
import ModeContext from '../context/ModeContext'
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import TimeAgo from 'timeago-react'
import Image from 'next/image'

const Widegts = ({articles}) => {
    const { darkMode } = useContext(ModeContext)

  return (
    <div className='hidden xl:inline space-y-2'>
        <div className={`${darkMode ? 'bg-[#1D2226] border-none' : 'bg-white'} py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300`}>
            <div className='flex items-center justify-between font-bold px-2.5'>
                <h4>LinkedIn News</h4>
                <InfoRoundedIcon className='h-5 w-5'/>
            </div>
            <div className='space-x-1'>
                {articles.slice(0,5).map((article) => (
                    <div key={article.url} className={`flex space-x-2 items-center cursor-pointer ${darkMode ? 'hover:bg-black/20' : 'hover:bg-black/10'} px-2.5 py-1`}>
                       <FiberManualRecordRoundedIcon className='h-2 w-2'/>
                       <h5 className='max-w-xs font-medium text-sm truncate pr-10'>
                        {article.title}
                       </h5>
                       <TimeAgo
                        dateTime={article.publishedAt}
                        className={`text-xs mt-0.5 ${darkMode && 'text-white/75'} opacity-80`}
                       />
                    </div>
                ))}
            </div>
        </div>
        <div className={`${darkMode ? 'bg-[#1D2226] border-none' : 'bg-white'} w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300`}>
            <div className="relative w-full h-full">
                <Image
                src="https://rb.gy/kbfeaa"
                layout='fill'
                objectFit='contain'
                priority
                />
            </div>
        </div>
    </div>
  )
}

export default Widegts