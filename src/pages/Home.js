import React, { useState, memo, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import slugify from 'slugify'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { list } from '../apis/postApi'
import qs from 'qs'
import { isEmpty, isNil } from 'lodash'
import Pagination from '../common/Pagination/Pagination'

//imrse import usestate/effect
// có thể lấy query string page từ url react router dom sau đó gán vào state khi componentDidMount để phân trang có thể bấm nút back or next page của trình duyệt cùng với componentDidUpdate
const Home = memo((props) => {
    console.log('home');
    const postReducer = useSelector(state => state.posts)

    const dispatch = useDispatch()
    const { search, pathname } = useLocation()



    let [page, setpage] = useState(1)
    const [searchText, setsearchText] = useState('')
    console.log(useLocation());

    const history = useHistory()





    function handleChangeSearchText(e) {
        const keyword = e.target.value
        setsearchText((prev) => keyword)
    }
    function find() {
        if (searchText != '') {
            history.push(`/search?keyword=${searchText}`)
            setsearchText('')
        }
    }
    useEffect(() => {
        // (async () => {
        //     const data = await list().then((response) => {
        //         console.log(response.data);
        //         dispatch({ type: 'SET_DATA_POST', SET_DATA: response.data })
        //         dispatch({ type: 'GET_BY_PAGE', page: page })
        //     })
        // })()
        (async () => {
            const data = await list()
            dispatch({ type: 'SET_DATA_POST', SET_DATA: data.data })
            dispatch({ type: 'GET_BY_PAGE', page: page })

        })()
    }, [])


    const handleChangePage = (page) => {
        setpage(page)
        dispatch({ type: 'GET_BY_PAGE', page: page })
    }

    return (
        <div>
            <input name="search" onChange={handleChangeSearchText} /> <br />
            <p onClick={find}>redirect with push</p>
            {/* <Link
                to={{
                    pathname: "/search",
                    search: `?keyword=${searchText}`,
                    // state: { from:  }
                }}
                children="Search"
            /> */}
            <div>
                {
                    postReducer.items && postReducer.items.map((post, i) =>
                        <div key={i}>
                            <Link to={`/${slugify(post.title)}/${post.id}`}>{post.title}</Link>
                        </div>
                    )
                }
            </div>
            <Pagination
                totalPage={postReducer.totalPage}
                currentPage={page}
                pageCount={7}
                handleChangePage={handleChangePage}
            />
        </div>
    )
})

Home.propTypes = {

}
export default Home


const HomeTop = memo((props) => {
    console.log('hometop');

    return (
        <div>
            HOmtop
        </div>
    )
})

const HomeBottom =
    // memo(
    (props) => {
        console.log('homebottom');

        return (
            <div>
                homebottom
            </div>
        )
    }
// )



