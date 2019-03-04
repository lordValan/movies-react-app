// Instruments
import axios from 'axios';

function removeMovie(id) {
    console.log(id);
    return axios.delete('/movie', {
        params: {
            id
        }
    });
};

export {
    removeMovie
}