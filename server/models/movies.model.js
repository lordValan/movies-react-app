const mongoose = require('mongoose');
const constants = require('../constants');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(constants.DB_CONNECTION, { useNewUrlParser: true, useCreateIndex: true, });

let MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        min: 1850
    },
    format: {
        type: String
    },
    actors: {
        type: Array,
        required: true
    }
})

MovieSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Movie', MovieSchema)