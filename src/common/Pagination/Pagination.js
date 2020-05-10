import React from 'react'
import PropTypes from 'prop-types'
import { Link,useLocation } from 'react-router-dom'
import { insert } from 'ramda'
import PaginationItem from './PaginationItem'
function Pagination({ totalPage, currentPage = 1, pageCount = 7, isNextPrevious = true, isJumpNextPrevious = true,handleChangePage,isRedirect }) {

    const {pathname} = useLocation()
    
    function renderItems() {
        let result= [];
        if (pageCount % 2 == 0) pageCount += 1;
        let pageCountInCenter = pageCount - 2
        let pageNeighbours = (pageCountInCenter - 1) / 2

//         total : 20,pageCount : 7,currentPage:1
// currentPage<=0 
// currentPage>0 && currentPage<=pageCount - 2
// currentPage>pageCount - 2 && currentPage< total - ( ((pageCount - 2) -1)/2 )
// currentPage>=total - ( ((pageCount - 2) -1)/2
// 1 45 |6| 78 20 //////////////14 15 16 |17| 18 19 20     ( ((pageCount - 2) -1)/2 )     currentPage < total - ( ((pageCount - 2) -1)/2 )

        if(totalPage<pageCount){
            pageCount = totalPage
            for (let index = 1; index <= totalPage; index++) {
                // result.push (<li><Link to={`?page=${index}`}>Page {index}</Link></li>)
                result.push (<PaginationItem handleChangePage={handleChangePage} key={index} page={index} isRedirect={isRedirect} />)
            }
             return result
        }

        if (currentPage <= pageCountInCenter || currentPage<=0) {
            for (let index = 2; index < pageCount; index++) {
                // result.push (<li><Link to={`?page=${index}`}>Page {index}</Link></li>)
                result.push (<PaginationItem handleChangePage={handleChangePage} key={index} page={index} isRedirect={isRedirect} />)
            }
            // result = insert(pageCount,<li><Link to={`?page=${currentPage+1}`}>{">>"}></Link></li>,result)
            result = insert(pageCount,<PaginationItem handleChangePage={handleChangePage} key={"currentPage+1"} page={currentPage+1} children={">>"} isRedirect={isRedirect} />,result)
        }
        
        if(currentPage >pageCountInCenter && currentPage<totalPage-pageNeighbours){
            // result = insert(pageCount+1,<li><Link to={`?page=${currentPage-1}`}>{"<<"}</Link></li>,result)
            result = insert(pageCount+1,<PaginationItem handleChangePage={handleChangePage} key={"currentPage-1"} page={currentPage-1}  children={"<<"} isRedirect={isRedirect} />,result)
            for (let index = currentPage-pageNeighbours; index <= currentPage+pageNeighbours; index++) {
                result.push (<PaginationItem handleChangePage={handleChangePage} key={index} page={index} isRedirect={isRedirect} />)
            }
            // result = insert(pageCount+1,<li><Link to={`?page=${currentPage+1}`}>{">>"}></Link></li>,result)
            result = insert(pageCount+1,<PaginationItem handleChangePage={handleChangePage} key={"currentPage+1"} page={currentPage+1}  children={">>"} isRedirect={isRedirect} />,result)

        }
        
        if( (currentPage>=totalPage-pageNeighbours && currentPage<=totalPage) || currentPage>totalPage){            
            for (let index = totalPage-pageCountInCenter; index < totalPage; index++) {
                result.push (<PaginationItem handleChangePage={handleChangePage} key={index} page={index} isRedirect={isRedirect} />)
            }
            result = insert(0,<PaginationItem handleChangePage={handleChangePage} key={"currentPage-1"} page={currentPage-1}  children={"<<"} isRedirect={isRedirect} />,result)
            
        }
        // result = insert(0,<li><Link to="?page=1">Page 1</Link></li>,result)
        // result = insert(pageCount+1,<li><Link to={`?page=${totalPage}`}>Page {totalPage}</Link></li>,result)

        result = insert(0,<PaginationItem handleChangePage={handleChangePage} key={1} page={1} isRedirect={isRedirect} />,result)
        result = insert(pageCount+1,<PaginationItem handleChangePage={handleChangePage} key={totalPage} page={totalPage} isRedirect={isRedirect} />,result)

        return result
    }
    return (
        <div>
            <ul>
                {/* <li><Link to="?page=1">Page 1</Link></li> */}

                {renderItems()}

                {/* <li><Link to={`?page=${totalPage}`}>Page {totalPage}</Link></li> */}
            </ul>
        </div>
    )
}

Pagination.propTypes = {

}
export default Pagination

