// Instruments
import axios from 'axios';

function removeMovie(id) {
    return axios.delete('/movie', {
        data: {
            id
        }
    });
};

export {
    removeMovie
}