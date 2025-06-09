import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect} from 'react'
import { fetchUsers } from '../API/api'

const FetchInfinite = () => {
    
    const {data,hasNextPage,fetchNextPage,isFetchingNextPage,status}=useInfiniteQuery({
        queryKey: ['users'],
        queryFn:fetchUsers,
        
        
        getNextPageParam: (lastPage,allPages) =>{
            // console.log(",allPages",allPages)
            // console.log("last page :",lastPage);
            return lastPage.length===10?allPages.length+1:undefined;
        }
    })
    const handleScroll=()=>{
        const bottom=window.innerHeight+scrollY >=document.documentElement.scrollHeight-1;
        if(bottom && hasNextPage){
            
            fetchNextPage()
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);
        return ()=>window.removeEventListener('scroll',handleScroll);
    },[hasNextPage]);
    console.log(data)

    if(status==="loading") return <h1>Loading</h1>
  return (
    <div>
        <h1>infinite scroll</h1>
      {
        data?.pages?.map((page,index)=>{
            return (<ul key={index}>
                {
                    page?.map((user)=>{
                       return( <li key={user.id} style={{padding:"10px",border:"2px solid #ccc"}}>
                            <p>{user.login}</p>
                            <img src={user.avatar_url} alt={user.login} width={50} height={50} />
                        </li>)
                    })
                }
            </ul>)
        })
      }
        {isFetchingNextPage && <h1>fetchning next page....</h1>}

    </div>
  )
}

export default FetchInfinite
