// Core
import React, { Component } from 'react';
// Styles
import styles from './MovieInfo.module.scss';
// Instruments
import PropTypes from 'prop-types';

class MovieInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className = { styles.movieInfo }>
                <h2>{ this.props.movie.name }</h2>
                <ul>
                    <li>
                        <strong>Year: </strong>
                        { this.props.movie.year }
                    </li>
                    <li>
                        <strong>Format: </strong>
                        { this.props.movie.format }
                    </li>
                    <li>
                        <strong>Actors: </strong>
                        { this.props.movie.actors.join(', ') }
                    </li>
                </ul>
            </section>
        )
    }
}

MovieInfo.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieInfo