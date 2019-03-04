// Core
import React, { Component, Fragment } from 'react';
// Instruments
import { Settings } from '../utils';
import WebFont from 'webfontloader';
import { getMovies, getMoviesResponseHandler, getMoviesErrorHandler } from './Methods';
import { ITEMS_PER_PAGE } from '..//../main/constants';
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
            showRemoveMovie: false,
            searchString: ''
        }
    }

    onSearchStringChangeHandler(searchValue) {
        getMovies(searchValue, this.currentSort)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);                

                this.setState({ 
                    currentPage: 1,
                    searchString: searchValue
                });
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
        getMovies(this.state.searchString, newSort, this.state.currentPage)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.currentSort = newSort;
            })
            .catch(getMoviesErrorHandler);
    }

    onPageChangeHandler(pageNumber) {        
        getMovies(this.state.searchString, this.currentSort, pageNumber)
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
                <ListInstruments onSelectChange = { this.onSortChangeHandler.bind(this) } 
                        moviesShown = { this.state.shownMoviesAmount }
                        moviesFullAmount = { this.state.fullMoviesAmount }
                />
                <MoviesList movies = { this.state.movies } 
                        onOpenModalInfo = { this.onOpenModalInfo.bind(this) } 
                        searchString = { this.state.searchString }
                />
                <CustomPagination totalItemsCount = { this.state.fullMoviesAmount }                        
                        onChange = { this.onPageChangeHandler.bind(this) }
                        activePage = { this.state.currentPage }
                        itemsCountPerPage = { ITEMS_PER_PAGE }
                />
                <Modal open={ this.state.modalOpen } 
                        onClose = { this.onCloseModal.bind(this) } 
                        center
                        classNames = { { closeButton: 'close-modal-button' } }
                > 
                    { this.state.showInfo ? <MovieInfo movie = { this.currentMovie } searchString = { this.state.searchString } /> : null }
                    { this.state.showEditor ? <p>Editor</p> : null }
                    { this.state.showCreateEditor ? <p>Create Editor</p> : null }
                    { this.state.showRemoveMovie ? <p>Remove</p> : null }
                </Modal>                
            </Fragment>         
        )
    }
}