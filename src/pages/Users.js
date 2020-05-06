import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { list, addUser, updateUser, getUser, deleteUser } from '../apis/userApi'
import { isEmpty } from 'lodash'

function Users(props) {

    const { url, path, params } = useRouteMatch()
    // console.log('Users');
    const userReducer = useSelector(state => state.users)
    const dispatch = useDispatch()
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
    
    useEffect(() => {
        // (async () => {
        //     const data = await list().then((response) => {

        //         dispatch({ type: 'SET_DATA_USER', SET_DATA: response.data })
        //     })
        // })()
        (async () => {
            const response = await list()

            dispatch({ type: 'SET_DATA_USER', SET_DATA: response.data })
        })()
    }, [])
    async function handleAddUser() {
        // const data = await addUser().then((response) => {
        //     dispatch({ type: 'ADD_USER', formData: { ...formData, id: response.data.id } })
        //     handleCloseForm()
        // })
        const response = await addUser()
        dispatch({ type: 'ADD_USER', formData: { ...formData, id: response.data.id } })
        handleCloseForm()
    }
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
    async function handleUpdateUser() {
        // await updateUser(formUpdateData.id, { name: formUpdateData.name, username: formUpdateData.username, website: formUpdateData.website }).then((res) => {
        //     console.log(res.data);

        //     dispatch({ type: 'UPDATE_USER', id: formUpdateData.id, data: formUpdateData })
        //     handleCloseFormUpdate()
        //     clearFormUpdate()
        // })
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
        })
    }
    return (
        <div>
            <button onClick={handleOpenForm}>Thêmm user</button>
            {
                isAdd && (
                    <Fragment>
                        <input name="username" value={formData.username} onChange={handleChangeForm} />
                        <input name="website" value={formData.website} onChange={handleChangeForm} />
                        <input name="name" value={formData.name} onChange={handleChangeForm} />
                        <button onClick={handleAddUser} type="submit" children="ADD" />
                    </Fragment>
                )
            }
            {
                isUpdate && (
                    <div>
                        <input name="username" value={formUpdateData.username} onChange={handleChangeFormUpdate} />
                        <input name="website" value={formUpdateData.website} onChange={handleChangeFormUpdate} />
                        <input name="name" value={formUpdateData.name} onChange={handleChangeFormUpdate} />
                        <button onClick={handleUpdateUser} type="submit" children="Update" />
                    </div>
                )
            }
            {
                !isEmpty(userReducer.items) ?
                    userReducer.items.map((user, i) =>
                        <div key={i}>
                            <Link to={`${url}/${user.username}/${user.id}/posts`}>{user.username}</Link>
                            <span style={{ float: "right" }}>
                                <a onClick={() => handleOpenFormUpdate(user.id)} href="#" children="Update" /> {" "}
                                <a onClick={() => handleDelete(user.id)} href="#" children="Delte" />
                            </span>
                            <div>Website: {user.website}</div>
                            <div>Name:{user.name}</div>
                            <hr />
                        </div>
                    ) : "epmty"


            }
        </div>
    )
}

Users.propTypes = {

}

export default React.memo(Users)

