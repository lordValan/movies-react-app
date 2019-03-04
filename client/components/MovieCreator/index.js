// Core
import React, { Component } from 'react';
// Styles
import styles from './MovieCreator.module.scss';
// Instruments
import PropTypes from 'prop-types';
import { MOVIE_FORMATS } from '../../../main/constants';
// Components
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import Conformator from './Conformator';

const options = [];

for (const key in MOVIE_FORMATS) {
    if (MOVIE_FORMATS.hasOwnProperty(key)) {
        const element = MOVIE_FORMATS[key];

        options.push({
            value: element, label: element
        });
    }
}

const newMovie = {
    name: '',
    year: 2000,
    format: options[0].value,
    actors: []
}

class MovieCreator extends Component {
    constructor(props) {
        super(props);

        const movie = props.movie ? props.movie : newMovie;

        this.state = { 
            movie,
            showConfirm: false
        }
    }

    // handlers

    onNameChangeHander(event) {
        this.updateMovieState('name', event.target.value);
    }

    onYearChangeHander(event) {
        this.updateMovieState('year', event.target.value);
    }

    onChangeActorsListHandler(actors) {
        this.updateMovieState('actors', actors.slice());
    }

    onFormatChangeHandler(newVal) {
        this.updateMovieState('format', newVal.value);
    }

    onFormSubmitHandler(event) {
        event.preventDefault();
        this.setState( { showConfirm: true } );
    }

    // helpers

    updateMovieState(key, value) {
        const movie = Object.assign({}, this.state.movie);
        movie[key] = value;

        this.setState({ movie });
    }

    getFormatPosition(format) {
        let index = options.findIndex((fItem) => {
            return fItem.value === format;
        });

        return index ? index : 0;
    }

    render() {
        let defaultOption = options[this.getFormatPosition(this.state.movie.format)];

        return ( 
            <section className = { styles.movieCreator } >
                <form onSubmit = { this.onFormSubmitHandler.bind(this) } >
                    <section className = { styles.formSection } >
                        <label className = { styles.formLabel } >Name</label>
                        <input type = 'text' 
                            className = { styles.formInput } 
                            value = { this.state.movie.name } 
                            onChange = { this.onNameChangeHander.bind(this) }
                            required 
                        />
                    </section>
                    <section className = { styles.formSection } >
                        <label className = { styles.formLabel } >Year</label>
                        <input type = 'number' 
                            className = { styles.formInput } 
                            value = { this.state.movie.year } 
                            onChange = { this.onYearChangeHander.bind(this) }
                            min = { 1850 }
                            max = { 2050 }
                            required 
                        />
                    </section>
                    <section className = { styles.formSection } >
                        <label className = { styles.formLabel } >Format</label>
                        <Select options = { options } 
                            defaultValue = { defaultOption } 
                            onChange = { this.onFormatChangeHandler.bind(this) }
                        />
                    </section>
                    <section className = { styles.formSection } >
                        <label className = { styles.formLabel } >Actors</label>
                        <TagsInput value={ this.state.movie.actors } 
                                onChange={ this.onChangeActorsListHandler.bind(this) }
                                validationRegex = { /^[a-z ,.'-]+$/i }
                                onlyUnique = { true }
                                inputProps = { { placeholder: 'Add an actor' } }
                        />
                    </section>
                    { this.props.success ? <p className = 'successMessage'>{ this.props.success }</p> : null }
                    { this.props.error ? <p className = 'errorMessage'>{ this.props.error }</p> : null }
                    <section className = { `${styles.formSection} ${styles.formSubmitSection}` } >
                        { 
                            this.state.showConfirm ? 
                                <Conformator movie = { this.state.movie } 
                                        onAccept = { this.props.onSend }
                                        onCancel = { () => this.setState( { showConfirm: false } ) }
                                        className = { styles.sendConformator }
                                /> 
                                : 
                                null 
                        }
                        <button type = 'submit' className = { styles.formBtubmit } >Send</button>
                    </section>                    
                </form>                
            </section> 
        )
    }
}

MovieCreator.propTypes = {
    movie: PropTypes.object,
    onSend: PropTypes.func.isRequired
}

export default MovieCreator;