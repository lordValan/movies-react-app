// Core
import React, { Component } from 'react';
// Styles
import styles from './MoviesList.module.scss';
// Instruments
import PropTypes from 'prop-types';
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";

const gradients = [
    styles.darkBlue, styles.coolBlues, styles.moonlitAsteroid, styles.amin, styles.kyooTah,
    styles.expresso, styles.lawrencium, styles.hydrogen, styles.meridian, styles.purplepine
];

const localStorageColorsKey = 'colors';

class MoviesList extends Component {
    constructor(props) {
        super(props);
    }

    onBeforeUnloadHandler(ev) {
        localStorage.setItem(localStorageColorsKey, JSON.stringify(this.colors));
        return ev;
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.onBeforeUnloadHandler.bind(this));

        if(!localStorage.getItem(localStorageColorsKey)) {
            localStorage.setItem(localStorageColorsKey, JSON.stringify({}));
            this.colors = {};
        } else {
            this.colors = JSON.parse(localStorage.getItem(localStorageColorsKey));
        }
    }

    render() {
        return (
            <section className = { styles.moviesList }>
                {this.props.movies.map((movie) => {
                    if(!this.colors[movie._id]) {
                        this.colors[movie._id] = `${gradients[Math.floor(Math.random() * gradients.length)]}`;
                    } 

                    return (
                        <div key = { movie._id } 
                            className = { `${styles.moviesItem} ${this.colors[movie._id]}` }
                        >
                            <span className = { styles.movieName }>{ movie.name }</span>
                            <span className = { styles.movieYear }>{ movie.year }</span> 
                            <div className = { styles.movieInstruments }>
                                <button className = { styles.movieInstrumentsBt } 
                                        onClick = { () => this.props.onOpenModalInfo(movie) }
                                >
                                    {<MdInfo />}
                                </button>
                                <button className = { styles.movieInstrumentsBt }>
                                    {<MdEdit />}
                                </button>
                                <button className = { styles.movieInstrumentsBt }>
                                    {<MdDelete />}
                                </button>
                            </div>                         
                        </div>  
                    )                   
                })}
            </section>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('onbeforeunload', this.onBeforeUnloadHandler.bind(this));
    }
}

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MoviesList;