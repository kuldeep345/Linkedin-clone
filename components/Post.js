import { Avatar, IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import ModeContext from '../context/ModeContext'
import { useRecoilState } from 'recoil'
import { modalState , modalTypeState } from '../atoms/modalAtom'
import { handlePostState , getPostState } from '../atoms/postAtom'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { useSession } from 'next-auth/react'
import TimeAgo from 'timeago-react'

const Post = ({ post , modalPost }) => {
  const { data : session } = useSession()
  const { darkMode } = useContext(ModeContext)
  const [modalOpen , setModalOpen] = useRecoilState(modalState)
  const [modalType , setModalType] = useRecoilState(modalTypeState)
  const [postState , setPostState] = useRecoilState(getPostState)
  const [showInput , setShowInput] = useState(false)
  const [liked , setLiked] = useState(false)
  const [handlePost , setHandlePost] = useRecoilState(handlePostState)

  const truncate = (string , n) => string?.length > n ? string.substr(0 , n - 1) +  "...see more" : string;

  const deletePost = async()=>{
    const response = await fetch(`/api/posts/${post._id}` , {
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    })
    setHandlePost(true)
    setModalOpen(false)
  }

  return (
    <div className={`${darkMode ? 'bg-[#1D2226] border-none' : 'bg-white '} ${modalPost ? 'rounded-r-full' : 'rounded-lg'} space-y-2 py-2.5 border border-gray-300 overflow-hidden`}>
      <div className="flex items-center px-2.5 cursor-pointer">
      <Avatar src={post.userImg} className="h-10 w-10 cursor-pointer"/>
      <div className="mr-auto ml-2 leading-none">
        <h6 className="font-medium hover:text-blue-500 hover:underline">
          {post.username}
        </h6>
        <p className={`text-sm ${darkMode && 'text-white/75'} opacity-80`}>{post.email}</p>
        <TimeAgo 
        datetime={post.createdAt}
        className={`text-xs ${darkMode && 'text-white/75'} opacity-80`}
        />
        </div>
        {modalPost ? (
          <IconButton onClick={()=>setModalOpen(false)}>
            <CloseRoundedIcon className={`${darkMode && 'text-white/75'} h-7 w-7`}/>
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className={`${darkMode && 'text-white/75'}`}/>
          </IconButton>
        )}
      </div>

      {post.input && <div className="px-2 5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p className='cursor-pointer' onClick={()=>setShowInput(false)}>{post.input}</p>
          ):(
            <p className='cursor-pointer' onClick={()=>setShowInput(true)}>
              {truncate(post.input , 150)}
            </p>
          )}
      </div>
       }
       {post.photoUrl && !modalPost && (
        <img 
        src={post.photoUrl}
        alt=""
        className="w-full cursor-pointer"
        onClick={()=>{
          setModalOpen(true)
          setModalType("gifYouUp")
          setPostState(post)
        }}
        />
       )}
       <div className={`flex justify-center items-center ${darkMode ? 'border-t text-white' : 'text-black/60'} border-gray-600/80 mx-2.5 pt-2 `}>
        {modalPost ? (
          <button className='postButton'>
            <CommentOutlinedIcon/>
            <h4>Comment</h4>
          </button>
        ) : (
          <button className={`postButton ${liked && "text-blue-500"} ${darkMode && 'bg-black/20 text-white'}`}
          onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100"/>
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100"/>
            )}
            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
          className={`postButton focus:text-red-400 ${darkMode && 'text-white'}`}
          onClick={deletePost}
          >
            <DeleteRoundedIcon/>
            <h4 >Delete post</h4>
          </button>
        ) : (
          <button className='postButton'>
            <ReplyRoundedIcon className="-scale-x-100"/>
            <h4>Share</h4>
          </button>
        )}
       </div>
    </div>
  )
}

export default Post