// Core
import React from 'react';
// Styles
import styles from './RemoveAcceptor.module.scss';
// Instruments
import PropTypes from 'prop-types';

const RemoveAcceptor = (props) => {
    return (
        <section className = { styles.removeAcceptor }>
            <p>{`Are you shure you want to remove movie «${props.movie.name}»?`}</p>
            <section className = { styles.buttons }>
                <button className = { styles.btCancel }
                        onClick = { props.onCancel }
                >
                    Cancel
                </button>
                <button className = { styles.btAccept }
                        onClick = { () => props.onAccept(props.movie._id) }
                >
                    Yes
                </button>
            </section>
            <p className = { 'successMessage' }>{ props.success }</p>
            <p className = { 'errorMessage' }>{ props.error }</p>
        </section>        
    )
}

RemoveAcceptor.propTypes = {
    movie: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default RemoveAcceptor;