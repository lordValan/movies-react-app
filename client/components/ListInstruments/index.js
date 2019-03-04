// Core
import React from 'react';
// Styles
import styles from './ListInstruments.module.scss';
// Components
import Select from 'react-select';
import MoviesPagesBoard from '../MoviesPagesBoard';
// Instruments
import { SORT_ITEMS } from '../../../main/constants';
import PropTypes from 'prop-types';

const options = [
    { value: 'default', label: 'Sort by default' }
];

for (const key in SORT_ITEMS) {
    if (SORT_ITEMS.hasOwnProperty(key)) {
        const element = SORT_ITEMS[key];

        options.push({
            value: element.key, label: element.value
        });
    }
}

const ListInstruments = (props) => {
    return (
        <section className = { styles.instrumentsSection } >
            <MoviesPagesBoard shown = { props.moviesShown }
                    fullAmount = { props.moviesFullAmount }
            />
            <button onClick = { props.onOpenModalCreate } 
                    className = { styles.addNewMovieBt } 
            >
                Create movie
            </button>
            <button onClick = { props.onOpenModalCreate } 
                    className = { styles.importMoviesBt } 
            >
                Import movies
            </button>
            <Select className = { styles.sortSelect } 
                    options = { options } 
                    defaultValue = { options[0] } 
                    onChange = { (chosenVal) => { props.onSelectChange(chosenVal.value) } }
            />
        </section>
    )
}

ListInstruments.propTypes = {
    onSelectChange: PropTypes.func.isRequired,
    moviesShown: PropTypes.number.isRequired,
    moviesFullAmount: PropTypes.number.isRequired,
    onOpenModalCreate: PropTypes.func.isRequired
}

export default ListInstruments;