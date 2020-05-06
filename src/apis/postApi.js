import axios from 'axios'
export const list =async () => {
    const list = axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts`,
    })
    return list
}
export const listByUserId =async (userId) => {
    const list = axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    })
    return list
}
export const commentsInPost =async (postId) => {
    const list = axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    })
    return list
}
export const postDetail =async (postId) => {
    const list = axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
    })
    return list
}



