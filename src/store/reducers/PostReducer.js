import { filter, isEmpty, slice } from 'lodash'
let initialState = {
    itemPerPage: 5,

    items: [],
    totalPage: 1,
    search: {
        itemPerPageSearch: 1,
        items: [],
        totalPage: 1,
    },
    post: {
        detail: {},
        comments: {
            itemPerPage: 2,
            items: [],
            totalPage: 1
        },

    },
    postsByUser: {
        userId: null,
        items: [],
        itemPerPage: 2,
        totalPage: 1
    }
}
//việc trả về state hay initialState phụ thuộc hoàn toàn vào cách lấy dữ liệu
//nếu muốn làm app nhẹ thì trả về state để tại mỗi trang chỉ lấy đủ dữ liệu cần thiết, ko lấy dữ liệu của các trang khác(suggest-khuyến nghị)
export default function PostReducer(state = initialState, action) {
    let totalPage, begin, end, search
    switch (action.type) {
        case 'SET_DATA_POST':
            if (isEmpty(initialState.items)) initialState.items = [...action.SET_DATA]
            return {
                ...initialState,
                items: action.SET_DATA
            }
        case 'SET_DATA_SEARCH':
            
            const foundData = filter(initialState.items, (item) => {
                return item.title.indexOf(action.title) >= 0
            })

            initialState.search.items = foundData
            return {
                ...initialState
            }
        case 'FIND_BY_TITLE_BY_PAGE':
            totalPage = Math.ceil(initialState.search.items.length / initialState.search.itemPerPageSearch)
            const items = initialState.search.items.slice(0, initialState.search.itemPerPageSearch * action.page)
            search = {
                ...initialState.search,
                items,
                totalPage
            }
            return {
                ...initialState,
                search
            }
        // return initialState
        case 'GET_BY_PAGE':
            let itemsInPage
            totalPage = Math.ceil(initialState.items.length / initialState.itemPerPage)

            if (action.page === undefined) {
                itemsInPage =  [...initialState.items]
                console.log(itemsInPage);

            } else {
                const begin = (action.page - 1) * initialState.itemPerPage
                const end = begin + initialState.itemPerPage

                itemsInPage = initialState.items.slice(begin, end)
                console.log(begin,end);
            }
            return {
                ...initialState,
                items: itemsInPage,
                totalPage
            }
        case 'POSTS_BY_USER':
            initialState.postsByUser = {
                ...initialState.postsByUser,
                userId: action.userId,
                items: action.postsByUser
            }
            return {
                ...initialState,
            }
        case 'POSTS_BY_USER_BY_PAGE':
            totalPage = Math.ceil(initialState.postsByUser.items.length / initialState.postsByUser.itemPerPage)
            //
            begin = (action.page - 1) * initialState.postsByUser.itemPerPage
            end = begin + initialState.postsByUser.itemPerPage
            let posts = initialState.postsByUser.items.slice(begin, end)


            let postsByUser = {
                ...initialState.postsByUser,
                userId: action.userId,

                items: posts,
                totalPage
            }
            return {
                ...initialState,
                postsByUser,
                totalPage
            }
        case 'SET_POST':
            totalPage = Math.ceil(action.comments.length / initialState.post.comments.itemPerPage)
            const post = {
                ...initialState.post,
                detail: action.post,
                comments: {
                    ...initialState.post.comments,
                    items: action.comments,
                    totalPage
                }
            }
            initialState.post = post

            return {
                ...initialState,
            }
        case 'GET_COMMENTS_BY_PAGE':
            const beginComment = (action.page - 1) * initialState.post.comments.itemPerPage
            const endComent = beginComment + initialState.post.comments.itemPerPage

            const itemsComment = initialState.post.comments.items.slice(beginComment, endComent)
            return {
                ...initialState,
                post: {
                    ...initialState.post,
                    comments: {
                        ...initialState.post.comments,
                        items: itemsComment
                    }
                }
            }
        default:
            return initialState
    }
}
