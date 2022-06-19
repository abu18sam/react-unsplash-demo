import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';

const PaginationComponent = (props) => {
    const { currentPage, totalItems, itemsPerPage, navigateToPage } = props;

    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        let last = 0;
        if (totalItems > 0) {
            last = Math.ceil(totalItems / itemsPerPage);
        }
        setLastPage(last);
    }, [totalItems, itemsPerPage])

    const handleClickPageChange = (pageNumber) => {
        navigateToPage(pageNumber);
    }

    return (
        <Pagination>
            <Pagination.First disabled={currentPage === 1 ? true : false} onClick={() => handleClickPageChange(1)} />
            <Pagination.Prev disabled={currentPage === 1 ? true : false} onClick={() => handleClickPageChange(currentPage - 1)} />
            {currentPage > 1 ? <Pagination.Item onClick={() => handleClickPageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item> : null}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < lastPage ? <Pagination.Item onClick={() => handleClickPageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item> : null}
            <Pagination.Next disabled={currentPage === lastPage ? true : false} onClick={() => handleClickPageChange(currentPage + 1)} />
            <Pagination.Last disabled={currentPage === lastPage ? true : false} onClick={() => handleClickPageChange(lastPage)} />
        </Pagination>
    )
}

PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    navigateToPage: PropTypes.func
}

export default memo(PaginationComponent);