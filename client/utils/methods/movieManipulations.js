// Instruments
import axios from 'axios';
import { ROUTES } from '../../../main/constants';

// get

function getMovies(s = '', sort = 'default', page = 1) {
    return axios.get(ROUTES.movies, {
        params: {
            s: s,
            sort: sort,
            page: page
        }
    });
};

function getMoviesErrorHandler(error) {
    console.log(error);
};

// update

function updateMovie(movie) {
    return axios.put(ROUTES.movie, {        
        name: movie.name,
        year: movie.year,
        format: movie.format,
        actors: movie.actors,
        id: movie._id        
    });
};

// create

function createMovie(movie) {
    return axios.post(ROUTES.movie, {        
        name: movie.name,
        year: movie.year,
        format: movie.format,
        actors: movie.actors       
    });
};

//delete

function removeMovie(id) {
    return axios.delete(ROUTES.movie, {
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

    return axios.post(ROUTES.movies, data, headers);
}

export {
    getMovies, getMoviesErrorHandler, removeMovie, 
    updateMovie, createMovie, importMovies
}