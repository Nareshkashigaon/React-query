import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { deletePost, fetchPostsForRQ, updatePost } from '../API/api.js'

const FetchRQ = () => {
  const [pageNumber,setPageNumber] =useState(1);
// observe the api calls in network tab
const {data,isPending,isError,error}=useQuery({
    queryKey:["posts",pageNumber],
    queryFn:()=>fetchPostsForRQ(pageNumber),
    // staleTime:1000*5,
    // refetchInterval:1000,
    // refetchIntervalInBackground:1000,

    placeholderData:keepPreviousData,

})
const queryClient=useQueryClient();
const {mutate:deletePostMutation}=useMutation({
  mutationFn:(id)=>deletePost(id),
  onSuccess:(data,id)=>{
    queryClient.setQueryData(["posts",pageNumber],(curEle)=>{
      return curEle?.filter((post)=> post.id !== id)
    })
  }
})
const {mutate:updatePostMutation}=useMutation({
  mutationFn:(id)=>updatePost(id),
  onSuccess:(updatedPost,id)=>{
    console.log("updated post",updatePost,id)
    queryClient.setQueryData(["posts",pageNumber],(curEle)=>{
      return curEle?.map((post)=> post.id === id?updatedPost:post)
    })
  }
})

if(isPending) return <p>data isPending...</p>
if (isError) {
    return <p>{error.message || "something wnt wrong while fetching data"}</p>
}
  return (
    <ul style={{width:"80%",margin:"auto"}}>
      {data?.map((post) => {
        return (

          <li key={post.id}>
            <Link to={`/rq/${post.id}`}   >
            <h2>ID : {post.id}</h2>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
           
            </Link>
            <button onClick={()=>deletePostMutation(post.id)}>Delete</button>
            <button onClick={()=>updatePostMutation(post.id)}>update</button>

          </li> 
          
        )
      }
      )}
      <li>
        <button disabled={pageNumber===1 ?true:false} onClick={()=>setPageNumber((prev)=> prev-3) }>Prev</button>
        <span>{parseInt(pageNumber/3)}</span>
        <button onClick={()=>setPageNumber((prev)=> prev+3) }>Next</button>

      </li>
    </ul>
  )
}

export default FetchRQ