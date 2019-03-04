// Core
import React, { Component, Fragment } from 'react';
// Instruments
import { Settings } from '../utils';
import WebFont from 'webfontloader';
import { getMovies, getMoviesResponseHandler, getMoviesErrorHandler, 
            removeMovie, updateMovie, createMovie, importMovies } from '../utils/methods';
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
import RemoveAcceptor from './RemoveAcceptor';
import MovieCreator from './MovieCreator';
import MoviesImporter from './MoviesImporter';

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
            showImport: false,
            showRemoveMovie: false,
            searchString: '',
            errorMessage: null,
            successMessage: null
        }
    }

    // modal handlers

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
            showRemoveMovie: false,
            showImport: false,
            errorMessage: null,
            successMessage: null
        });
    };

    onOpenModalInfo(movie) {
        this.currentMovie = movie;

        this.setState({
            modalOpen: true,
            showInfo: true
        });
    }
    
    onOpenModalRemove(movie) {
        this.currentMovie = movie;

        this.setState({
            modalOpen: true,
            showRemoveMovie: true
        });
    }

    onOpenModalCreate() {
        this.setState({
            modalOpen: true,
            showCreateEditor: true
        });
    }

    onOpenModalEdit(movie) {
        this.currentMovie = movie;

        this.setState({
            modalOpen: true,
            showEditor: true
        });
    }

    onOpenModalImport() {
        this.setState({
            modalOpen: true,
            showImport: true
        });
    }

    // search handlers

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

    // sort handlers

    onSortChangeHandler(newSort) {
        getMovies(this.state.searchString, newSort, this.state.currentPage)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.currentSort = newSort;
            })
            .catch(getMoviesErrorHandler);
    }

    // pagination handlers

    onPageChangeHandler(pageNumber) {        
        getMovies(this.state.searchString, this.currentSort, pageNumber)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.setState({ currentPage: pageNumber });
            })
            .catch(getMoviesErrorHandler);
    }

    // remove handlers

    removeMovieHandler(id) {
        removeMovie(id)
            .then((response) => {
                this.setState({
                    successMessage: 'The movie is successfully removed!'
                });

                this.reFetchMovies();
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.response.data
                });
            });
    }    

    // update handlers

    updateMovieHandler(movie) {
        updateMovie(movie)
            .then((response) => {
                this.setState({
                    successMessage: 'The movie is successfully updated!'
                });

                this.reFetchMovies();
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.response.data
                });
            });
    }

    // create handlers

    createMovieHandler(movie) {
        createMovie(movie)
            .then((response) => {
                this.setState({
                    successMessage: 'The movie is successfully created!'
                });

                this.reFetchMovies();
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.response.data
                });
            });
    }

    // import handlers
    
    importMoviesHandler(file) {
        importMovies(file)
            .then((response) => {
                this.setState({
                    successMessage: 'Movies are successfully imported!'
                });

                this.reFetchMovies();
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.response.data
                });
            });
    }

    // helpers

    reFetchMovies() {
        getMovies(this.state.searchString, this.currentSort, this.state.currentPage)
            .then((response) => {
                getMoviesResponseHandler.bind(this)(response);

                this.onCloseModal();
            })
            .catch(getMoviesErrorHandler);
    }

    componentDidMount() {
        getMovies()
            .then(getMoviesResponseHandler.bind(this))
            .catch(getMoviesErrorHandler);
    }

    render() {
        return (
            <Fragment>
                <Searcher onSearchHandler = { this.onSearchStringChangeHandler.bind(this) }  />
                <ListInstruments onSelectChange = { this.onSortChangeHandler.bind(this) } 
                        moviesShown = { this.state.shownMoviesAmount }
                        moviesFullAmount = { this.state.fullMoviesAmount }
                        onOpenModalCreate = { this.onOpenModalCreate.bind(this) }
                        onOpenModalImport = { this.onOpenModalImport.bind(this) }
                />
                <MoviesList movies = { this.state.movies } 
                        onOpenModalInfo = { this.onOpenModalInfo.bind(this) } 
                        onOpenModalRemove = { this.onOpenModalRemove.bind(this) }
                        onOpenModalEdit = { this.onOpenModalEdit.bind(this) }
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
                    { this.state.showInfo ? <MovieInfo movie = { this.currentMovie } 
                            searchString = { this.state.searchString } /> : null }
                    { this.state.showEditor ? <MovieCreator movie = { this.currentMovie }
                            onSend = { this.updateMovieHandler.bind(this) } 
                            error = { this.state.errorMessage }
                            success = { this.state.successMessage }
                    /> : null }
                    { this.state.showCreateEditor ? <MovieCreator onSend = { this.createMovieHandler.bind(this) } 
                            error = { this.state.errorMessage }
                            success = { this.state.successMessage }
                    /> : null }
                    { this.state.showRemoveMovie ? <RemoveAcceptor movie = { this.currentMovie } 
                            onAccept = { this.removeMovieHandler.bind(this) }
                            onCancel = { this.onCloseModal.bind(this) }
                            error = { this.state.errorMessage }
                            success = { this.state.successMessage } />: null }
                    { this.state.showImport ? <MoviesImporter onSend = { this.importMoviesHandler.bind(this) } 
                            error = { this.state.errorMessage }
                            success = { this.state.successMessage }
                    /> : null }
                </Modal>                
            </Fragment>         
        )
    }
}