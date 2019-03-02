// Core
import React, { Component, Fragment } from 'react';
// Instruments
import { Settings } from '../utils';
import WebFont from 'webfontloader';
import axios from 'axios';
// Styles
import '../sass/styles.scss';
// Components
import Searcher from './Searcher';
import MoviesTable from './MoviesTable';

export default class App extends Component {
    constructor(props) {
        super(props);

        WebFont.load(Settings.fontsLoad);

        this.state = {
            movies: [],
            searchString: '',
            currentPage: 1
        }
    }

    onSearchStringChangeHandler(searchValue) {
        axios.get('/movies', {
                params: {
                    s: searchValue
                }
            })
            .then((response) => {
                this.setState({ 
                    movies: response.data,
                    searchString: searchValue
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        axios.get('/movies')
            .then((response) => {
                this.setState({ 
                    movies: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Fragment>
                <Searcher onSearchHandler = { this.onSearchStringChangeHandler.bind(this) }  />
                <MoviesTable movies = { this.state.movies } />                
            </Fragment>         
        )
    }
}