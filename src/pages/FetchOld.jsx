import React from 'react'
import { useEffect } from 'react'

import { fetchPosts } from '../API/api'
const FetchOld = () => {

    const [posts, setPosts] = React.useState([]);
    const getPost = async () => {
        try {
            const res =await fetchPosts('/posts');
            if(res.status == 200) {
                setPosts(res.data);
            }
        
        console.log("data :",res);
        } catch (error) {
            console.log("error :",error);
            
        }
        
    }
    useEffect(() => {
        console.log("fetching posts");
        getPost();
    },[])
  return (
    <div>
    {
        posts?.map((post) => {
            return (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            )
        })
    }
    </div>
  )
}

export default FetchOld
