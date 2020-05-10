let initialState = {
    itemPerPage: 2,
    items: [],
    totalPage: 1,
    user:{}
}

export default function UserReducer(state = initialState, action) {
    let totalPage, begin, end
    let users

    switch (action.type) {
        case 'SET_DATA_USER':

            initialState.items = action.SET_DATA

            return {
                ...initialState,
                items: action.SET_DATA
            }
        case 'GET_USERS_BY_PAGE':
            begin = (action.page - 1) * initialState.itemPerPage
            end = begin + initialState.itemPerPage

            users = initialState.items.slice(begin,end)
            totalPage = Math.ceil(initialState.items.length / initialState.itemPerPage)
            return {
                ...initialState,
                items: users,
                totalPage
            }
        case 'ADD_USER':
            initialState.items.splice(0, 0, action.formData);
            return initialState
        case 'UPDATE_USER':
            console.log('UPDATE_USER')
            const index = initialState.items.findIndex((user) => {
                return user.id === action.id
            })

            const dataState = { ...initialState }
            dataState.items[index] = action.data
            console.log(dataState);

            return dataState
        case 'DELETE_USER':
            const indexDelete = initialState.items.findIndex((user) => {
                return user.id === action.id
            })
            initialState.items.splice(indexDelete, 1);

            return initialState
        case 'LOGIN':
            console.log(action.email);
            
            const user =  initialState.items.find((item)=>{
                return item.email === action.email
            })
            initialState.user = user
            window.localStorage.setItem('user',JSON.stringify(user) )
            return {
                ...initialState,
            }
        default:
            return state
    }
}


