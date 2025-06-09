import {  useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostsIndv } from '../API/api.js';

const FetchIndv = () => {

    const {id}=useParams();
    console.log(id)
    const {data,isPending}=useQuery({
        queryKey: ['post',id],
        queryFn:()=> fetchPostsIndv(id),
    })
    

    if(isPending) return <h1>Loading....</h1>
    

  return (
    <li>
      <p>{`Id :${id}`}</p>
      <h2>{data.title}</h2>
    <p>{data.body}</p>

    </li>
  )
}

export default FetchIndv;
