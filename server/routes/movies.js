const MovieModel = require('../models/movies.model');
const express = require('express');
const router = express.Router();

router.get('/movies', (req, res) => {
    MovieModel.find({})
        .then((doc) => {
            res.json(doc);
        })
        .catch((error) => {
            res.status(500).json(err);
        });
});

module.exports = router;