// Core
import React, { Component } from 'react';
// Styles
import styles from './MovieInfo.module.scss';
// Instruments
import PropTypes from 'prop-types';
import { setSearchHighlighted } from '../Methods';

class MovieInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className = { styles.movieInfo }>
                <h2 dangerouslySetInnerHTML = {{
                    __html: setSearchHighlighted(this.props.searchString, this.props.movie.name)
                }} />
                <ul>
                    <li>
                        <strong>Unique key: </strong>
                        { this.props.movie._id }
                    </li>
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
                        <ul>
                        { this.props.movie.actors.map((actor) => {
                            return <li key = { actor } dangerouslySetInnerHTML = {{
                                __html: setSearchHighlighted(this.props.searchString, actor)
                            }} />
                        }) }
                        </ul>
                    </li>
                </ul>
            </section>
        )
    }
}

MovieInfo.propTypes = {
    movie: PropTypes.object.isRequired,
    searchString: PropTypes.string
}

export default MovieInfo