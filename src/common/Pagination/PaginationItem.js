import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
function PaginationItem({ page, handleChangePage, children, isRedirect = false }) {
    const location = useLocation()
    const routeMatch = useRouteMatch()
    const history = useHistory()
    const { t, i18n } = useTranslation();
    console.log(history);
    const Item = isRedirect ?
        <Link onClick={() => handleChangePage(page)}
            to={`${location.pathname}?page=${page}`}
        >
            {t('page', {
                page: children || page,
                interpolation: {
                    escapeValue: false // react already safes from xss
                }
            })}
        </Link> :
        <a onClick={() => handleChangePage(page)} >
            {t('page', {
                page: children || page,
                interpolation: {
                    escapeValue: false // react already safes from xss
                }
            })}</a>
    return (
        <li>{Item}</li>
    )
}

PaginationItem.propTypes = {

}

export default PaginationItem

