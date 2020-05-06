//theo redux initialState này chỉ dùng 1 lần ko return về biến này mà nên copy ra từ nó và kèm theo thay đổi 
//thay đổi giá trị trả về theo câu trên
let initialState = {
    itemPerPage: 2,
    items: [],
    totalPage: 1,
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA_USER':

            initialState.items = action.SET_DATA

            return {
                state,
                items: action.SET_DATA
            }
        case 'ADD_USER':
            initialState.items.splice(0, 0, action.formData);
            return initialState
        case 'UPDATE_USER':
            console.log('UPDATE_USER')
            const index = initialState.items.findIndex((user)=>{
                return user.id === action.id
            })

            const dataState = {...initialState}
            dataState.items[index] = action.data
            console.log(dataState);
            
            return dataState
        case 'DELETE_USER':
            const indexDelete = initialState.items.findIndex((user)=>{
                return user.id === action.id
            })
            initialState.items.splice(indexDelete, 1);

            return initialState
        default:
            return state
    }
}


