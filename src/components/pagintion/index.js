import React from 'react';
import {Pagination} from 'react-bootstrap';

const PaginationComponent = ({currentPage, totalPages, onPageChange}) => {
    const pageItems = [];
    // const maxPages
    let startPage = Math.max(currentPage - 1, 1)
    let endPage = Math.min(currentPage + 1, totalPages)
    if (startPage < 1) {
        startPage = 1;
        endPage = 3;
    } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - 3;
    }
    for(let number = startPage; number <= endPage; number++){
        pageItems.push(
            <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
            >
                {number}
            </Pagination.Item>
        )
    }
    return(
        <Pagination>
            <Pagination.Prev onClick={() => onPageChange(currentPage -1)} disabled={currentPage === 1}>
                Previous
                </Pagination.Prev>
            {pageItems}
            <Pagination.Next onClick={() => onPageChange(currentPage +1)} disabled={currentPage === totalPages}>
                Next
                </Pagination.Next>
         </Pagination>
    );
};
export default PaginationComponent;
