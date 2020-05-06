import axios from 'axios'
export const list = async () => {
    const list = axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
    })
    return list
}
export const addUser = async (data) => {
    const list = axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/users',
        data: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return list
}
export const updateUser = async (id,data) => {
    const list = axios({
        method: 'PATCH',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
        data: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return list
}
export const getUser = async (id) => {
    const user = axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
    })
    return user
}
export const deleteUser = async (id) => {
    const user = axios({
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
    })
    return user
}


