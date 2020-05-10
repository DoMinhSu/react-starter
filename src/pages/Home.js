import React, { useState, memo, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import slugify from 'slugify'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { list } from '../apis/postApi'
import qs from 'qs'
import { isEmpty, isUndefined } from 'lodash'
import Pagination from '../common/Pagination/Pagination'
import { useTranslation } from 'react-i18next';
//imrse import usestate/effect
// có thể lấy query string page từ url react router dom sau đó gán vào state khi componentDidMount để phân trang có thể bấm nút back or next page của trình duyệt cùng với componentDidUpdate
const Home = memo((props) => {
    console.log('home');
    const postReducer = useSelector(state => state.posts)

    const dispatch = useDispatch()
    const { search, pathname } = useLocation()
    const { t, i18n } = useTranslation();


    let [page, setpage] = useState(1)
    const [searchText, setsearchText] = useState('')
    console.log(useLocation());

    const history = useHistory()


    // let pageFromUrl;
    // const getOriginalQueryString = search.slice(1)

    // const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false

    // if (hasQueryString) pageFromUrl = qs.parse(getOriginalQueryString).page
    // if (pageFromUrl === undefined || pageFromUrl === '') pageFromUrl = 1
    // if (page !== parseInt(pageFromUrl)) page = parseInt(pageFromUrl)



    function handleChangeSearchText(e) {
        const keyword = e.target.value
        setsearchText((prev) => keyword)
    }
    // function find() {
    //     if (searchText != '') {
    //         history.push(`/search?keyword=${searchText}`)
    //         setsearchText('')
    //     }
    // }
    useEffect(() => {
        (async () => {
            let pageFromUrl
            const getOriginalQueryString = search.slice(1)

            const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false
            const qsJson = qs.parse(getOriginalQueryString)
            const pageTemp = parseInt(qsJson.page)

            if (hasQueryString && !isUndefined(pageTemp)) {
                pageFromUrl = pageTemp
                setpage(pageTemp)
            }

            const data = await list()
            dispatch({ type: 'SET_DATA_POST', SET_DATA: data.data })
            dispatch({ type: 'GET_BY_PAGE', page: pageTemp || page })

        })()
    }, [])
    useEffect(() => {
        dispatch({ type: 'GET_BY_PAGE', page: page })
    }, [page])

    const handleChangePage = (page) => {
        setpage(page)
    }

    return (
        <div>
            <input name="search" onChange={handleChangeSearchText} /> <br />
            {/* <button onClick={find}>{t('search')}</button> */}
            <Link
                to={{
                    pathname: "/search",
                    search: `?keyword=${searchText}`,
                    state:{
                        searchLink: `?keyword=${searchText}`
                    }
                }}
                children={<button>{t('search')}</button>}
            />
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
                isRedirect={true}
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



