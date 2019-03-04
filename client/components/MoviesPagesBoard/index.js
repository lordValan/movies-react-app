// Core
import React from 'react';
// Styles
import styles from './MoviesPagesBoard.module.scss';
// Instruments
import PropTypes from 'prop-types';

const MoviesPagesBoard = (props) => {
    return (
        <p className = { styles.board }>
            {`Shown ${props.shown} of ${props.fullAmount} movies`}
        </p>
    )
}

MoviesPagesBoard.propTypes = {
    shown: PropTypes.number.isRequired,
    fullAmount: PropTypes.number.isRequired
}

export default MoviesPagesBoard;