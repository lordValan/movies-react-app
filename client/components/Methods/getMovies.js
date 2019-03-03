// Instruments
import axios from 'axios';

function getMovies(s = '', sort = 'default', page = 1) {
    return axios.get('/movies', {
        params: {
            s: s,
            sort: sort,
            page: page
        }
    });
};

function getMoviesResponseHandler(response) {
    this.setState({ 
        movies: response.data.movies,
        shownMoviesAmount: response.data.shownAmount,
        maxNumPages: response.data.maxNumPages,
        fullMoviesAmount: response.data.fullAmount
    });
};

function getMoviesErrorHandler(error) {
    console.log(error);
};

export {
    getMovies, getMoviesResponseHandler, getMoviesErrorHandler
}