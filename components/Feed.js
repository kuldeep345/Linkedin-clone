import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Input from './Input'
import {handlePostState , useSSRPostsState} from '../atoms/postAtom'
import Post from './Post'
import { API_BASE_URL } from '../config'

const Feed = ({posts}) => {

  const [realTimePosts , setRealtimePosts ] = useState([])
  const [handlePost , setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts , setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${API_BASE_URL}/api/post` , {
        method:"GET",
        headers: { 'Content-type' : 'application/json' }
      })
      const responseData = await response.json()
      setRealtimePosts(responseData)
      setHandlePost(false)
      setUseSSRPosts(false)
    };

    fetchPosts()
  }, [handlePost])
  
  return (
    <div className='space-y-6 pb-26 max-w-lg'>
        <Input/>
        { !useSSRPosts ? realTimePosts?.map((post) => (<Post key={post._id} post={post}/>))
         : posts?.map((post) => (<Post key={post._id} post={post}/>))}
    </div>
  )
}

export default Feed