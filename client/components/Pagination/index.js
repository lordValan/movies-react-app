// Core
import React from 'react';
// Styles
import styles from './Pagination.module.scss';
// Components
import Pagination from "react-js-pagination";
// Instruments
import PropTypes from 'prop-types';

const CustomPagination = (props) => {
    return (
        <Pagination {...props} 
                innerClass = { styles.paginationList } 
                pageClassName = { styles.pageItem } 
                nextPageText = { '➡️' }
                prevPageText = { '⬅️' }
                firstPageText = ''
                lastPageText = ''
                disabledClass = { styles.disabled }
                activeClass = { styles.active }
        />
    )
}

CustomPagination.propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default CustomPagination;