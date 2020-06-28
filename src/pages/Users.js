import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { list, addUser, updateUser, getUser, deleteUser } from '../apis/userApi'
import { isEmpty } from 'lodash'
import qs, { stringify } from 'qs'
import Pagination from './../common/Pagination/Pagination'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Users(props) {

    const { url, path, params } = useRouteMatch()
    // console.log('Users');
    let [page, setpage] = useState(1)
    const userReducer = useSelector(state => state.users)
    console.log(userReducer);
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { search } = useLocation()
    const [isAdd, setisAdd] = useState(false)
    const [formData, setformData] = useState({
        username: '',
        website: '',
        name: ''
    })
    const [formUpdateData, setformUpdateData] = useState({
        id: '',
        username: '',
        website: '',
        name: ''
    })
    const [isUpdate, setisUpdate] = useState(false)


    let pageFromUrl;
    const getOriginalQueryString = search.slice(1)

    const hasQueryString = !isEmpty(qs.parse(getOriginalQueryString)) ? true : false

    if (hasQueryString) pageFromUrl = qs.parse(getOriginalQueryString).page
    if (pageFromUrl === undefined || pageFromUrl === '') pageFromUrl = 1
    if (page !== parseInt(pageFromUrl)) page = parseInt(pageFromUrl)



    const addUswerFormik = useFormik({
        initialValues: {
            username: '',
            website: '',
            name: ''
        },
        onSubmit: async values => {
            const response = await addUser()
            dispatch({ type: 'ADD_USER', formData: { ...values, id: response.data.id } })
            dispatch({ type: 'GET_USERS_BY_PAGE', page })
            handleCloseForm()
        },
        // validate:
        //     values => {
        //         let errors = {}
        //         if (!values.username) errors['username'] = t('require_username')
        //         if (!values.website) errors['website'] = t('require_website')
        //         if (!values.name) errors['name'] = t('require_name')
        //         return errors
        //     },

        validationSchema: Yup.object().shape({
            username: Yup.string()
                .min(2, t('too_sort'))
                .max(50, t('too_long'))
                .required(t('require_username')),
            website: Yup.string()
                .min(8, t('too_sort'))
                .max(30, t('too_long'))
                .required(t('require_website')),
            name: Yup.string()
                // .email('Invalid email')
                .required(t('require_name')),
        })
        ,
        validateOnBlur: true,
    });
    console.log(addUswerFormik.errors)
    useEffect(() => {
        (async () => {
            const response = await list()

            dispatch({ type: 'SET_DATA_USER', SET_DATA: response.data })
            dispatch({ type: 'GET_USERS_BY_PAGE', page })
        })()
    }, [])
    useEffect(() => {
        dispatch({ type: 'GET_USERS_BY_PAGE', page })
    }, [page])

    function handleCloseForm() {
        setisAdd(false)
        clearForm()
    }
    function clearForm() {
        setformData({
            username: '',
            website: '',
            name: ''
        })
    }
    function handleOpenForm() {
        setisAdd(true)
        clearForm()
    }
    function handleChangeForm({ target: { name, value } }) {
        setformData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function handleCloseFormUpdate() {
        setisUpdate(false)
        clearFormUpdate()
    }
    function handleChangeFormUpdate({ target: { name, value } }) {
        setformUpdateData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    async function handleOpenFormUpdate(id) {
        await getUser(id).then(response => {
            setformUpdateData(response.data)
            setisUpdate(true)
        })
    }
    const handleUpdateUser = async (e) => () {
        e.preventDefault();
        const res = await updateUser(formUpdateData.id, { name: formUpdateData.name, username: formUpdateData.username, website: formUpdateData.website })
        console.log(res.data);

        dispatch({ type: 'UPDATE_USER', id: formUpdateData.id, data: formUpdateData })
        handleCloseFormUpdate()
        clearFormUpdate()
    }

    function clearFormUpdate() {
        setformUpdateData({
            username: '',
            website: '',
            name: ''
        })
    }

    async function handleDelete(id) {
        await deleteUser(id).then(() => {
            alert('deleted')
            dispatch({ type: 'DELETE_USER', id })
            dispatch({ type: 'GET_USERS_BY_PAGE', page })
        })
    }
    function handleChangePage(page) {
        setpage(page)
    }
    return (
        <div>
            <button onClick={handleOpenForm}>{t('author.add')}</button>
            {
                isAdd && (
                    <Fragment>
                        <form
                            onSubmit={addUswerFormik.handleSubmit}
                        >
                            <div>
                                <input
                                    name="username"
                                    // value={formData.username}
                                    // onChange={handleChangeForm}
                                    onChange={addUswerFormik.handleChange}
                                    value={addUswerFormik.values.username}

                                    onBlur={addUswerFormik.handleBlur}

                                />
                            </div>
                            {addUswerFormik.errors.username && addUswerFormik.touched.username && <div>{addUswerFormik.errors.username}</div>}
                            <div>

                                <input
                                    name="website"
                                    // value={formData.website}
                                    // onChange={handleChangeForm}
                                    onChange={addUswerFormik.handleChange}
                                    value={addUswerFormik.values.website}

                                    onBlur={addUswerFormik.handleBlur}

                                />
                            </div>
                            {addUswerFormik.errors.website && addUswerFormik.touched.website && <div>{addUswerFormik.errors.website}</div>}

                            <div>

                                <input
                                    name="name"
                                    // value={formData.name}
                                    // onChange={handleChangeForm}
                                    onChange={addUswerFormik.handleChange}
                                    value={addUswerFormik.values.name}

                                    onBlur={addUswerFormik.handleBlur}
                                />
                            </div>
                            {addUswerFormik.errors.name && addUswerFormik.touched.name && <div>{addUswerFormik.errors.name}</div>}

                            <button
                                // onClick={handleAddUser}
                                type="submit"
                                children={t('author.add')}
                            />
                        </form>
                    </Fragment>
                )
            }
            {
                isUpdate && (
                    <div>
                        <input name="username" value={formUpdateData.username} onChange={handleChangeFormUpdate} />
                        <input name="website" value={formUpdateData.website} onChange={handleChangeFormUpdate} />
                        <input name="name" value={formUpdateData.name} onChange={handleChangeFormUpdate} />
                        <button onClick={handleUpdateUser} children={t('author.update')} />
                    </div>
                )
            }
            {
                !isEmpty(userReducer.items) ?
                    userReducer.items.map((user, i) =>
                        <div key={i}>
                            <Link to={`${url}/${user.username}/${user.id}/posts`}>{user.username}</Link>
                            <span style={{ float: "right" }}>
                                <a onClick={() => handleOpenFormUpdate(user.id)} href="#" children={t('author.update')} /> {" "}
                                <a onClick={() => handleDelete(user.id)} href="#" children={t('author.delete')} />
                            </span>
                            <div>Website: {user.website}</div>
                            <div>Name:{user.name}</div>
                            <hr />
                        </div>
                    ) : "epmty"


            }
            <Pagination totalPage={userReducer.totalPage} isRedirect={true} handleChangePage={handleChangePage} />
        </div>
    )
}

Users.propTypes = {

}

export default React.memo(Users)

