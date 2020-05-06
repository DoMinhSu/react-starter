import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { isEmpty } from 'lodash'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from './../common/Pagination/Pagination'
import { list } from './../apis/postApi'
function Search(props) {
    //get keyword from url
    let keyword

    let { search } = useLocation()
    const [page, setpage] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const postReducer = useSelector(state => state.posts)


    const getOriginalQueryString = search.slice(1)

    const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false

    if (hasQueryString) keyword = qs.parse(getOriginalQueryString).keyword

    useEffect(() => {
        if (isEmpty(postReducer.items)) {
            (async () => {
                const data = await list().then((response) => {
                    console.log(response.data);
                    dispatch({ type: 'SET_DATA_POST', SET_DATA: response.data })
                    dispatch({ type: 'FIND_BY_TITLE', title: keyword, page: page })
                })
            })()
        } else {

            dispatch({ type: 'FIND_BY_TITLE', title: keyword, page: page })
        }
    }, [])

    return (
        <div>

            search : {keyword}

            <div>
                {
                    postReducer.items && postReducer.items.map((item, i) =>
                        <p key={i}>{item.title}</p>

                    )
                }

            </div>
        </div>
    )
}

Search.propTypes = {

}

export default Search

