import React, { useEffect, useState, } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, useParams } from 'react-router-dom'
import axios from 'axios'
import slugify from 'slugify'
import { commentsInPost, postDetail } from './../apis/postApi'
import Pagination from './../common/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from 'react-i18next'

function DetailPost(props) {
    // const match = useRouteMatch()
    const { postId } = useParams()
    console.log('DetailPost');
    const {t} = useTranslation()

    const [comments, setcomments] = useState([])
    // const  useSelector(state=>{
    //     return state
    // })
    const postsReducer = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [commentPage, setcommentPage] = useState(1)
    console.log(postsReducer);
    useEffect(() => {
        (async () => {
            const res = await Promise.all([postDetail(postId), commentsInPost(postId)])
            // setpost(res[0].data)
            // setcomments(res[1].data)
            console.log(res);
            dispatch({ type: 'SET_POST', post: res[0].data, comments: res[1].data })
            dispatch({ type: 'GET_COMMENTS_BY_PAGE', page: commentPage })
        })()
    }, [])
    useEffect(() => {
        (() => {
            // alert(123)
            dispatch({ type: 'GET_COMMENTS_BY_PAGE', page: commentPage })

        })()
    }, [commentPage]) //gọi didupdate,nếu là nhiều phần tử trong mảng thì khi 1 phần tử thay đổi sẽ gọi
    function handleChangePage(page) {
        setcommentPage(page)
    }
    return (
        <div>
            <div>
                <div>{t('postTitle')}:{postsReducer.post.detail.title}</div>
                <div>{t('postContent')}:{postsReducer.post.detail.body}</div>
            </div>
            <hr />
            <div>
                {
                    postsReducer.post.comments.items.map((item, i) => {
                        return (
                            <div key={i}>
                                <div>{t('email')}:{item.email}</div>
                                <div>{t('comment')}:{item.body}</div>
                            </div>
                        )
                    })
                }

            </div>
            <Pagination totalPage={postsReducer.post.comments.totalPage} handleChangePage={handleChangePage} />

        </div>
    )
}

DetailPost.propTypes = {

}

export default DetailPost

