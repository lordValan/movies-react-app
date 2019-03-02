const MovieModel = require('../models/movies.model');
const express = require('express');
const router = express.Router();
const { SERVER_RESPONSES, ITEMS_PER_PAGE } = require('../constants');
const { SORT_ITEMS, MOVIE_FORMATS } = require('../../main/constants');

// get movies
router.get('/movies', async(req, res) => {
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

        return res.json(movies);
    } catch (error) {
        return res.status(500).json(error.errmsg);
    }
});

module.exports = router;