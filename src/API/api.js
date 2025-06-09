import axios from 'axios';
const api=axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});


export const fetchPosts =  () => {
    return api.get('/posts');
}
// export const fetchPostsForRQ = async() => {
//     const res = await api.get('/posts');
//     return res.data;
// }

export const fetchPostsForRQ = async(pageNumber) => {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.data;
}
export const fetchPostsIndv = async(id) => {
    const res = await api.get(`/posts/${id}`);
    console.log("fetching in api",res)
    return res.data;
}

export const deletePost = async(id) => {
    
    return await api.delete(`/posts/${id}`);
}

export const updatePost = async(id) => {
    const res=await api.patch(`/posts/${id}`,{title:"i have updated"});
    console.log(res);
    return res.data;
}

export const fetchUsers = async({pageNumber=1}) => {
    try {
        const res=await api.get(`https://api.github.com/users?per_page=10&page=${pageNumber}`);
    // console.log(res);
    console.log(res.data)
    return res.data;
    } catch (error) {
        console.log(error)
    }
    
    
}