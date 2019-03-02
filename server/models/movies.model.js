const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'movies-react-app';

mongoose.connect(`mongodb://${server}/${database}`)

let MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1850
    },
    format: {
        type: String
    },
    actors: {
        type: Array
    }
})

module.exports = mongoose.model('Movie', MovieSchema)