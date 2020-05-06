import React from 'react'
import PropTypes from 'prop-types'
import { Link,useLocation,useRouteMatch,useHistory } from 'react-router-dom'
function PaginationItem({ page, handleChangePage, children }) {
    const location = useLocation()
    const routeMatch = useRouteMatch()
    const history = useHistory()
    // console.log(history);
    
    return (
        <li><Link onClick={()=>handleChangePage(page)} 
        // to={`${routeMatch.url}?page=${page}`}
        >Page {children || page}</Link></li>
    )
}

PaginationItem.propTypes = {

}

export default PaginationItem

