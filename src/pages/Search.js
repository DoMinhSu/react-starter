import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { isEmpty } from 'lodash'
import { useLocation, useHistory, Link, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from './../common/Pagination/Pagination'
import { list } from './../apis/postApi'
import { isUndefined, isNaN } from 'lodash'
//còn trường hợp lùi sau khi search nhiều lần
function Search(props) {
    //get keyword from url

    let location = useLocation()
    let search = location.search
    let [keyword, setkeyword] = useState('')
    let [page, setpage] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const postReducer = useSelector(state => state.posts)
    console.log(history);

    useEffect(() => {

        (async () => {
            let keywordSearch, pageSearch
            const getOriginalQueryString = search.slice(1)

            const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false
            const qsJson = qs.parse(getOriginalQueryString)
            const keywordTemp = qsJson.keyword
            const pageTemp = qsJson.page
            if (hasQueryString) {
                if (!isUndefined(keywordTemp)) {
                    keywordSearch = keywordTemp
                    setkeyword(keywordTemp)
                } else {
                    setkeyword('')
                }
                if (!isUndefined(pageTemp)) {
                    pageSearch = pageTemp
                    setpage(parseInt(pageTemp))
                } else {
                    setpage(1)
                }
            }
            // console.log(location.state.searchLink);
            if (isEmpty(postReducer.items)) {
                const data = await list().then((response) => {
                    console.log(response.data);
                    dispatch({ type: 'SET_DATA_POST', SET_DATA: response.data })
                    dispatch({ type: 'SET_DATA_SEARCH', title: keywordSearch || keyword })
                    dispatch({ type: 'FIND_BY_TITLE_BY_PAGE', title: keywordSearch || keyword, page: pageSearch || page })
                })
            } else {
                dispatch({ type: 'SET_DATA_SEARCH', title: keywordSearch || keyword })
                dispatch({ type: 'FIND_BY_TITLE_BY_PAGE', title: keywordSearch || keyword, page: pageSearch || page })
            }
            window.onpopstate = ()=>{
            history.goBack()
                
            }
        })()

    }, [])
    function handleNextPage() {
        setpage(page => page + 1)
    }
    function handleSearch() {
        setpage(1)
        dispatch({ type: 'SET_DATA_SEARCH', title: keyword })
        dispatch({ type: 'FIND_BY_TITLE_BY_PAGE', title: keyword, page: page })

    }

    function handleSearchChange({ target: { name, value } }) {
        setkeyword(value)
    }
    useEffect(() => {
        dispatch({ type: 'FIND_BY_TITLE_BY_PAGE', title: keyword, page: page })
    }, [page])


    return (
        <div>Search:
            <input value={keyword} onChange={(e) => handleSearchChange(e)} />
            <Link
                to={{
                    pathname: "/search",
                    search: `?keyword=${keyword}`,
                    state: {
                        searchLink: `?keyword=${keyword}`
                    }
                }}
                onClick={() => handleSearch()}
            >
                <button>Search</button>
            </Link>
            <div>
                {
                    postReducer.search?.items && postReducer.search.items.map((item, i) =>
                        <p key={i}>{item.title}</p>

                    )
                }
                {
                    (page < postReducer.search?.totalPage) &&
                    // <Link to={location => ({
                    //     ...location,
                    //     state: { searchLink: `?keyword=${keyword}` },
                    //     pathname: "/search",
                    //     search: `${searchLink}&page=${page + 1}`
                    // })}
                    // onClick={() => handleNextPage()}  
                    // >
                    //     Next page
                    // </Link>
                    <a
                        onClick={() => handleNextPage()}

                    >
                        Next page
                    </a>
                }
            </div>
        </div >
    )
}

Search.propTypes = {

}

export default React.memo(Search)

