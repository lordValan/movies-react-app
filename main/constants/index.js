const MAIN_CONSTANTS = {
    MOVIE_FORMATS: [
        'VHS', 'DVD', 'Blu-Ray'
    ],
    SORT_ITEMS: {
        name_asc: {
            key: 'name_asc',
            value: 'Sort by name ⬇️'
        },
        name_desc: {
            key: 'name_desc',
            value: 'Sort by name ⬆️'
        },
        year_asc: {
            key: 'year_asc',
            value: 'Sort by year ⬇️'
        },
        year_desc: {
            key: 'year_desc',
            value: 'Sort by year ⬆️'
        },
        format_asc: {
            key: 'format_asc',
            value: 'Sort by format ⬇️'
        },
        format_desc: {
            key: 'format_desc',
            value: 'Sort by format ⬆️'
        }
    },
    ITEMS_PER_PAGE: 10,
    ROUTES: {
        movie: '/api/movie',
        movies: '/api/movies'
    }
}

module.exports = MAIN_CONSTANTS;