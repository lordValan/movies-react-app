const dotenv = require("dotenv");

dotenv.config();

const db_host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const db_port = process.env.DB_PORT ? process.env.DB_PORT : '27017';
const db_name = process.env.DB_NAME ? process.env.DB_NAME : 'movies-react-app';
const db_credentials = process.env.DB_USERNAME ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@` : '';

const app_port = process.env.APP_PORT || 3000;

const server_responses = {
    EMPTY_REQ_BODY: 'Request body is missing',
    MISSING_MOVIE_NAME: 'Movie name is required!',
    MISSING_MOVIE_ACTORS: 'Movie actors list is required!',
    MISSING_ID: 'Missing URL parameter: id',
    MISSING_FILE: 'Missing file, please, choose .txt file!',
    DUPLICATED_MOVIE: 'One of the movies is already in the list. Please, remove it from the file and try again.'
}

module.exports = {
    DB_CONNECTION: `mongodb://${db_credentials}${db_host}:${db_port}/${db_name}`,
    APP_PORT: app_port,
    SERVER_RESPONSES: server_responses
}