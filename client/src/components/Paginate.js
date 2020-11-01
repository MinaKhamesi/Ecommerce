import React from 'react';
import {Link} from 'react-router-dom';
import {Pagination} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

const Paginate = ({page, pages,keyword, isAdmin=false}) => {
    
    return pages>1 && (
        <Pagination>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer key={x} to={isAdmin ? `/admin/products/page/${x+1}` : keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`} active={x+1===page}>
                        <Pagination.Item>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))}
        </Pagination>
    )
}

export default Paginate;
