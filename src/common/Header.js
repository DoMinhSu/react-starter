//rfcp
import React from 'react'
import PropTypes from 'prop-types'

import {
    BrowserRouter as Router, Route, NavLink,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash'
function Header({ handleChangeLanguage }) {
    const { t, i18n } = useTranslation();
    const languages = Object.keys(i18n.store.data)
    const user = useSelector(state => state.users.user)
    return (
        <div>
            <ul>
                <li >
                    <NavLink to="/">
                        {t('home')}
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/users">
                        {t('users')}
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/contact">
                        {t('contact')}
                    </NavLink>
                </li>

                <li >
                    <select
                        id="languages"
                        defaultValue={i18n.language}
                        onChange={(e) => handleChangeLanguage(e.target.value)}>
                        {
                            languages.map((language, i) => {
                                return (
                                    <option
                                        value={language}
                                        key={i}
                                    >
                                        {language}
                                    </option>
                                )

                            })
                        }

                    </select>
                </li>
                {
                    !isEmpty(user) &&
                    <li>
                        {t('header.hello', { name: "Đỗ Minh Sử" })}
                    </li>
                }
                {
                    isEmpty(user) &&
                    <li >
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                }

            </ul>
        </div>
    )
}

Header.propTypes = {

}

export default Header

