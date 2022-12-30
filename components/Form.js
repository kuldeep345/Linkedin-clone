import React, { useContext, useState } from 'react'
import ModeContext from '../context/ModeContext'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { useSession } from 'next-auth/react'
import { handlePostState } from '../atoms/postAtom'

const Form = () => {
  const { darkMode } = useContext(ModeContext)
  const [input , setInput] = useState('')
  const [photoUrl , setPhotoUrl] = useState('')
  const { data:session } = useSession()
  const [modalOpen , setModalOpen] = useRecoilState(modalState)
  const [handlePost , setHandlePost] = useRecoilState(handlePostState)

  const uploadPost = async(e)=>{
    e.preventDefault()

    const response = await fetch("/api/post", {
      method:"POST",
      body:JSON.stringify({
        input:input,
          input:input,
          photoUrl:photoUrl,
          username:session.user.name,
          email:session.user.email,
          userImg:session.user.image,
          createdAt: new Date().toString()
      }),
      headers:{
        "Content-type":"application/json"
      }
    })

    const responseData = await response.json()
    
    setHandlePost(true)
    setModalOpen(false)
  }
  
  return (
    <form className={`flex flex-col relative space-y-2  ${darkMode ? 'text-white/75' : 'text-black/80'}`}>
      <textarea
      rows="4"
      placeholder="what do you want to talk about?"
      className={`bg-transparent focus:outline-none ${darkMode && 'placeholder-white/75'}`}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <input 
      type="text" 
      placeholder='Add a photo URL (optional)'
      className={`bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm ${darkMode && 'placeholder-white/75'}`}
      value={photoUrl}
      onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button className='absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1'
      type='submit'
      onClick={uploadPost}
      disabled={!input.trim()}
      >
        Post
      </button>
    </form>
  )
}

export default Form