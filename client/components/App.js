// Core
import React, { Component, Fragment } from 'react';
// Instruments
import { Settings } from '../utils';
import WebFont from 'webfontloader';
import { getMovies, getMoviesResponseHandler, getMoviesErrorHandler } from './Methods';
// Styles
import '../sass/styles.scss';
// Components
import Searcher from './Searcher';
import MoviesList from './MoviesList';
import Modal from 'react-responsive-modal';
import MovieInfo from './MovieInfo';
import ListInstruments from './ListInstruments';
import CustomPagination from './Pagination';

export default class App extends Component {
    constructor(props) {
        super(props);

        WebFont.load(Settings.fontsLoad);

        this.currentMovie = null;
        this.searchString = '';
        this.currentSort = 'default';

        this.state = {
            movies: [],
            currentPage: 1,
            shownMoviesAmount: -1,
            maxNumPages: -1,
            fullMoviesAmount: -1,
            modalOpen: false,
            showInfo: false,
            showEditor: false,
            showCreateEditor: false,
            showRemoveMovie: false
        }
    }

    onSearchStringChangeHandler(searchValue) {
        getMovies(searchValue, this.currentSort)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);                

                this.searchString = searchValue;
                this.setState({ currentPage: 1 });
            })
            .catch(getMoviesErrorHandler);
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
        getMovies()
            .then(getMoviesResponseHandler.bind(this))
            .catch(getMoviesErrorHandler);
    }

    onSortChangeHandler(newSort) {
        getMovies(this.searchString, newSort, this.state.currentPage)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.currentSort = newSort;
            })
            .catch(getMoviesErrorHandler);
    }

    onPageChangeHandler(pageNumber) {        
        getMovies(this.searchString, this.currentSort, pageNumber)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.setState({ currentPage: pageNumber });
            })
            .catch(getMoviesErrorHandler);
    }

    render() {
        return (
            <Fragment>
                <Searcher onSearchHandler = { this.onSearchStringChangeHandler.bind(this) }  />
                <ListInstruments onSelectChange = { this.onSortChangeHandler.bind(this) } />
                <MoviesList movies = { this.state.movies } 
                        onOpenModalInfo = { this.onOpenModalInfo.bind(this) } 
                />
                <CustomPagination totalItemsCount = { this.state.fullMoviesAmount }                        
                        onChange = { this.onPageChangeHandler.bind(this) }
                        activePage = { this.state.currentPage }
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