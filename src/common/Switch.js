import { Switch as SwitchPage, Route } from 'react-router-dom'

import React from 'react'
import PropTypes from 'prop-types'
import Users from '../pages/Users'
import PostsByUser from '../pages/PostsByUser'
import DetailPost from './../pages/DetailPost'
import Contact from './../pages/Contact'
import Search from './../pages/Search'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
function Switch(props) {
    return (
        <SwitchPage>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/users" exact>
                <Users />
            </Route>
            <Route path="/users/:userName/:userId/posts" exact>
                <PostsByUser />
            </Route>
            <Route path="/:postName/:postId" exact>
                <DetailPost />
            </Route>
            <Route path="/contact" exact>
                <Contact />
            </Route>
            <Route path="/search" exact>
                <Search />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
        </SwitchPage>
    )
}

Switch.propTypes = {

}

export default Switch

