// Core
import React, { Component } from 'react';
// Styles
import styles from './MoviesTable.module.scss';
// Instruments
import PropTypes from 'prop-types';

class MoviesTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className = { styles.moviesTable }>
                <section className = { styles.tableHead } >
                    <div className = 'row'>
                        <div className = 'cell cell--name'>
                        
                        </div>
                        <div className = 'cell cell--year'>
                        
                        </div>
                        <div className = 'cell cell--format'>
                        
                        </div>
                        <div className = 'cell cell--instruments'>
                        
                        </div>
                    </div>
                </section>
                <section className = { styles.tableBody } >
                
                </section>
            </section>
        )
    }
}

MoviesTable.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MoviesTable;