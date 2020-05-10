import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormik, isNaN } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { list } from './../apis/userApi'
import { isEmpty, isUndefined, isNull } from 'lodash'
import { Redirect } from 'react-router-dom'
function Login(props) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        (async () => {
            const userString = localStorage.getItem('user')
            if (!isUndefined(userString) && !isNull(userString)) {
                const userJson = JSON.parse(userString)
                const email = userJson.email
                if (!isUndefined(email) && !isEmpty(email)) {
                    const res = await list()
                    dispatch({ type: 'SET_DATA_USER', SET_DATA: res.data })
                    dispatch({ type: 'LOGIN', email: email })
                }
            }
        })()
    }, [])

    const loginForm = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .min(7, t('too_short'))
                .max(50, t('too_long'))
                .email(t('not_mail'))
                .required(t('require')),
        }),
        validateOnBlur: true,
        // validateOnMount:true,
        onSubmit: async values => {
            const res = await list()
            dispatch({ type: 'SET_DATA_USER', SET_DATA: res.data })
            dispatch({ type: 'LOGIN', email: loginForm.values.email })
        },

    })


    return (
        <React.Fragment>
            {
                !isEmpty(user) &&
                <Redirect
                    to={{
                        pathname: "/",
                    }}
                />
            }
            <div>
                <form onSubmit={loginForm.handleSubmit}>
                    <div>
                        <div>Shanna@melissa.tv</div>
                        <input
                            value={loginForm.values.email}
                            name="email"
                            onChange={loginForm.handleChange}
                            onBlur={loginForm.handleBlur}

                        />
                        {
                            loginForm.touched.email && loginForm.errors.email && <div>{loginForm.errors.email}</div>
                        }
                    </div>
                    <button type="submit">{t('login')}</button>
                </form>


            </div>
        </React.Fragment>

    )
}

Login.propTypes = {

}

export default Login

