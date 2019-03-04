// Instruments
import axios from 'axios';
import { MdNotificationsActive } from 'react-icons/md';

// get

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

// update

function updateMovie(movie) {
    return axios.put('/movie', {        
        name: movie.name,
        year: movie.year,
        format: movie.format,
        actors: movie.actors,
        id: movie._id        
    });
};

// create

function createMovie(movie) {
    return axios.post('/movie', {        
        name: movie.name,
        year: movie.year,
        format: movie.format,
        actors: movie.actors       
    });
};

//delete

function removeMovie(id) {
    return axios.delete('/movie', {
        data: {
            id
        }
    });
};

// import from file

function importMovies(file) {
    let data = new FormData();
    data.append('file', file, file.name);

    const headers = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return axios.post('/movies', data, headers);
}

export {
    getMovies, getMoviesResponseHandler, getMoviesErrorHandler, removeMovie, 
    updateMovie, createMovie, importMovies
}