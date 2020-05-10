import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useRouteMatch, Link, useParams,useLocation } from 'react-router-dom'
import axios from 'axios'
import slugify from 'slugify'
import { listByUserId } from '../apis/postApi'
import Pagination from './../common/Pagination/Pagination'
import qs from 'qs'
import { isEmpty } from 'lodash'

function PostsByUser(props) {
    const { path, url, params } = useRouteMatch();
    let { userId } = useParams();
    userId = parseInt(userId)
    const postReducer = useSelector(state => state.posts)
    const posts = postReducer.postsByUser
    const dispatch = useDispatch()
    let [page, setpage] = useState(1)
    let {search}=useLocation()
    console.log(posts);

    let pageFromUrl;
    const getOriginalQueryString = search.slice(1)

    const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false

    if (hasQueryString) pageFromUrl = parseInt(qs.parse(getOriginalQueryString).page)
    if(pageFromUrl === undefined || pageFromUrl==='') pageFromUrl = 1
    if (page !== pageFromUrl) page = pageFromUrl

    useEffect(() => {
        (async () => {
            const response = await listByUserId(userId)
            dispatch({ type: 'POSTS_BY_USER', userId, postsByUser: response.data })
            dispatch({ type: 'POSTS_BY_USER_BY_PAGE', page })
        })()
    }, [])
    function handleChangePage(page) {
        setpage(page)
    }
    useEffect(() => {
        // alert(123)
        dispatch({ type: 'POSTS_BY_USER_BY_PAGE', page })
    }, [page])
    return (
        <div>
            {
                posts.items.map((post, i) =>
                    <div key={i}>
                        <Link to={`/${slugify(post.title)}/${post.id}`}>{post.title}</Link>
                    </div>
                )
            }

            <Pagination totalPage={posts.totalPage} handleChangePage={handleChangePage} isRedirect={true} />
        </div>
    )
}

PostsByUser.propTypes = {

}

export default PostsByUser

