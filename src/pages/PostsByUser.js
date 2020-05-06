import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import { useRouteMatch, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import slugify from 'slugify'
import { listByUserId } from '../apis/postApi'

function PostsByUser(props) {
    const { path, url, params } = useRouteMatch();
    const { userId } = useParams();
    const postReducer = useSelector(state => state.posts)
    const posts = postReducer.items
    const dispatch = useDispatch()
    console.log(posts);
    
    useEffect(() => {
        (async () => {
            const data = await listByUserId(userId).then((response) => {
               dispatch({type:'POSTS_BY_USER',POSTS:response.data})
            })
        })()
    }, [])
    return (
        <div>
            {
                posts.map((post, i) =>
                    <div key={i}>
                        <Link to={`/${slugify(post.title)}/${post.id}`}>{post.title}</Link>
                    </div>
                )
            }


        </div>
    )
}

PostsByUser.propTypes = {

}

export default PostsByUser

