// Core
import React, { Component } from 'react';
// Styles
import styles from './searcher.module.scss';
// Instruments
import PropTypes from 'prop-types';
// Components
import { DebounceInput } from 'react-debounce-input';

class Searcher extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className = { styles.searcher }>
                <DebounceInput className = { styles.searcherInput } 
                        placeholder = 'Search movie by name or actor' 
                        minLength={3}
                        debounceTimeout={300}
                        onChange={event => this.props.onSearchHandler(event.target.value)}
                />
            </section>
        )
    }
}

Searcher.propTypes = {
    onSearchHandler: PropTypes.func.isRequired
}

export default Searcher;