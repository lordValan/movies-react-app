const MovieModel = require('../models/movies.model');
const express = require('express');
const router = express.Router();
const { SERVER_RESPONSES } = require('../constants');
const { ITEMS_PER_PAGE, ROUTES } = require('../../main/constants');
const { SORT_ITEMS, MOVIE_FORMATS } = require('../../main/constants');

// get movies
router.get(ROUTES.movies, async(req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    let sort, search = {};

    // if sort is defined

    switch (req.query.sort) {
        case SORT_ITEMS.name_asc.key:
            sort = { 'name': 1 };
            break;
        case SORT_ITEMS.name_desc.key:
            sort = { 'name': -1 };
            break;
        case SORT_ITEMS.year_asc.key:
            sort = { 'year': 1 };
            break;
        case SORT_ITEMS.year_desc.key:
            sort = { 'year': -1 };
            break;
        case SORT_ITEMS.format_asc.key:
            sort = { 'format': 1 };
            break;
        case SORT_ITEMS.format_desc.key:
            sort = { 'format': -1 };
            break;
        default:
            sort = { '_id': 1 };
            break;
    }

    // if search query is defined

    if (req.query.s) {
        search = {
            $or: [
                { 'name': { '$regex': req.query.s, '$options': 'i' } },
                { 'actors': { '$regex': req.query.s, '$options': 'i' } }
            ]
        }
    }

    try {
        const movies = await MovieModel
            .find(search)
            .sort(sort)
            .skip(offset)
            .limit(ITEMS_PER_PAGE);

        const count = await MovieModel
            .count(search);

        const maxNumPages = !(count % ITEMS_PER_PAGE) ? count / ITEMS_PER_PAGE : Math.trunc(count / ITEMS_PER_PAGE) + 1;

        const shownAmount = ITEMS_PER_PAGE * (page - 1) + movies.length;

        return res.json({
            fullAmount: count,
            maxNumPages,
            shownAmount,
            movies            
        });
    } catch (error) {
        return res.status(500).json(error.errmsg);
    }
});

// create new movie
router.post(ROUTES.movie, async(req, res) => {
    if (!req.body) {
        return res.status(400).send(SERVER_RESPONSES.EMPTY_REQ_BODY);
    }

    if (!req.body.name) {
        return res.status(400).send(SERVER_RESPONSES.MISSING_MOVIE_NAME);
    }

    if (!req.body.actors || !Array.isArray(req.body.actors)) {
        return res.status(400).send(SERVER_RESPONSES.MISSING_MOVIE_ACTORS);
    }

    const model = new MovieModel(req.body);

    try {
        const createResult = await model.save();

        if (!createResult || createResult.length === 0) {
            return res.status(500).send(doc)
        }

        res.status(201).send(createResult);
    } catch (error) {
        return res.status(500).json(error.errmsg);
    }
});

// update movie
router.put(ROUTES.movie, async(req, res) => {
    if (!req.body) {
        return res.status(400).send(SERVER_RESPONSES.EMPTY_REQ_BODY);
    }

    if (!req.body.id) {
        return res.status(400).send(SERVER_RESPONSES.MISSING_ID)
    }

    try {
        const updateResult = await MovieModel.findOneAndUpdate({
            _id: req.body.id
        }, req.body, {
            new: true
        });

        res.status(201).send(updateResult);
    } catch (error) {
        return res.status(500).json(error.errmsg);
    }
});

// remove movie
router.delete(ROUTES.movie, async(req, res) => {
    if (!req.body) {
        return res.status(400).send(SERVER_RESPONSES.EMPTY_REQ_BODY);
    }

    if (!req.body.id) {
        return res.status(400).send(SERVER_RESPONSES.MISSING_ID)
    }

    try {
        const removeResult = await MovieModel.findOneAndDelete({
            _id: req.body.id
        });

        res.status(201).send(removeResult);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// create new movies from file
router.post(ROUTES.movies, async(req, res) => {
    if(!req.files) {
        return res.status(400).send(SERVER_RESPONSES.MISSING_FILE);
    }

    const txtFile = req.files.file;
    const fileData = txtFile.data.toString().replace(/\r/g, '');

    const arr = fileData.split('\n\n');
    const moviesArr = [];

    for(let i = 0; i < arr.length; i++) {
        // find name of movie
        let title = arr[i].match(/Title: (.*)/);

        // if not found - start next iteration
        if(!title || !title[1]) continue;

        title = title[1];

        // find and parse movie release year
        let year = arr[i].match(/Release Year: (.*)/)[1];
        year = parseInt(year);

        // find and parse movie format
        let format = arr[i].match(/Format: (.*)/)[1];
        format = MOVIE_FORMATS.includes(format) ? format : null;

        // find and parse movie actors
        let actors = arr[i].match(/Stars: (.*)/)[1];
        actors = actors.split(', ');
        
        moviesArr.push({
            name: title,
            year: year,
            format: format,
            actors: actors
        });
    }

    try {
        const result = await MovieModel
            .insertMany(moviesArr, { ordered: false });

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error.errmsg);
    }  
});

module.exports = router;