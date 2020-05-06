import { filter, isEmpty, slice } from 'lodash'
let initialState = {
    itemPerPage: 1,
    items: [],
    totalPage: 1,
}

export default function PostReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA_POST':
            if (isEmpty(initialState.items)) initialState.items = [...action.SET_DATA]
        return {
            ...initialState,
            items:action.SET_DATA
        }
        case 'FIND_BY_TITLE':
            if (action.title === '') return initialState.items

            const foundData = filter(initialState.items, (item) => {
                return item.title.indexOf(action.title) >= 0
            })
            const totalPage1 = Math.ceil(foundData.length / initialState.itemPerPage)
            // const itemInPage = foundData.slice((action.page-1)*initialState.itemPerPage,initialState.itemPerPage)

            return {
                ...initialState,
                items: foundData,
                // totalPage:totalPage1
                totalPage: 1
            }
        // return initialState
        case 'GET_BY_PAGE':
            console.log(initialState.items);
            let itemsInPage
            const totalPage = Math.ceil(initialState.items.length / initialState.itemPerPage)

            if (action.page === undefined) {
                itemsInPage = initialState.items.slice(0, initialState.itemPerPage)
                console.log(itemsInPage);

            } else {
                const begin = (action.page - 1) * initialState.itemPerPage
                const end = begin + initialState.itemPerPage

                itemsInPage = initialState.items.slice(begin, end)
                console.log(itemsInPage);
            }
            return {
                ...initialState,
                items: itemsInPage,
                totalPage
            }
        case 'POSTS_BY_USER':
            
            return {
                ...initialState,
                items:action.POSTS
            }
        
        default:
            return initialState
    }
}
// page 1 :begin 0  begin: page -1 *itemPerPage
// page 2 begin 2