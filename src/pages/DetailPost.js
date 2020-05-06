import React, { useEffect, useState, } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, useParams } from 'react-router-dom'
import axios from 'axios'
import slugify from 'slugify'
import { commentsInPost, postDetail } from './../apis/postApi'
function DetailPost(props) {
    // const match = useRouteMatch()
    const { postId } = useParams()
    console.log('DetailPost');
    const [post, setpost] = useState({})
    const [comments, setcomments] = useState([])
    useEffect(() => {
        (async () => {
            const postAndComment = await Promise.all([postDetail(postId), commentsInPost(postId)]).then(res => {
                setpost(res[0].data)
                setcomments(res[1].data)
                console.log(res);

            })

        })()
    }, [])
    return (
        <div>
            <div>
                <div>Title:{post.title}</div>
                <div>Body:{post.body}</div>
            </div>
            <hr/>
            <div>
                {
                    comments.map((item,i) => {
                        return (
                            <div key={i}>
                                <div>User 's email:{item.email}</div>
                                <div>comment:{item.body}</div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

DetailPost.propTypes = {

}

export default DetailPost

