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
import MoviesList from './MoviesList';
import Modal from 'react-responsive-modal';
import MovieInfo from './MovieInfo';

export default class App extends Component {
    constructor(props) {
        super(props);

        WebFont.load(Settings.fontsLoad);

        this.currentMovie = null;

        this.state = {
            movies: [],
            searchString: '',
            currentPage: 1,
            modalOpen: false,
            showInfo: false,
            showEditor: false,
            showCreateEditor: false,
            showRemoveMovie: false
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

    onOpenModal() {
        this.setState({ modalOpen: true });
    };

    onCloseModal() {
        this.currentMovie = null;

        this.setState({ 
            modalOpen: false,
            showInfo: false,
            showEditor: false,
            showCreateEditor: false,
            showRemoveMovie: false
        });
    };

    onOpenModalInfo(movie) {
        this.currentMovie = movie;

        this.setState({
            modalOpen: true,
            showInfo: true
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
                <MoviesList movies = { this.state.movies } 
                        onOpenModalInfo = { this.onOpenModalInfo.bind(this) } 
                />
                <Modal open={ this.state.modalOpen } 
                        onClose = { this.onCloseModal.bind(this) } 
                        center
                        classNames = { { closeButton: 'close-modal-button' } }
                > 
                    { this.state.showInfo ? <MovieInfo movie = { this.currentMovie } /> : null }
                    { this.state.showEditor ? <p>Editor</p> : null }
                    { this.state.showCreateEditor ? <p>Create Editor</p> : null }
                    { this.state.showRemoveMovie ? <p>Remove</p> : null }
                </Modal>                
            </Fragment>         
        )
    }
}