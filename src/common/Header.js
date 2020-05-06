//rfcp
import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, NavLink ,
} from 'react-router-dom'

function Header(props) {
console.log('header');

    return (
        <div>
            <ul>
                <li >
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/users">
                        Users
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/contact">
                        Contact
                    </NavLink>
                </li>
                {/* <li >
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/register">
                        Register
                    </NavLink>
                </li> */}
            </ul>
        </div>
    )
}

Header.propTypes = {

}

export default Header

