# movies-react-app

One of the most exciting [React](http://facebook.github.io/react/index.html) application for movies. 🎬

## Table of Contents

* [movies-react-app](#movies-react-app)
    * [Setup](#setup)
    * [Structure](#structure)

## Setup

`mongodb` is used to store data.

After setting up all packages, you need to create `.env` file in the root folder. Look at `.env.example` to fill it in.

To start demonstration server you need to run next command:

```bash
npm run demonstrate
```

## Structure

* [Server](#server)
    * [Constants](#server-constants)
    * [Models](#models)
    * [Routes](#routes)
* [Client](#client)
    * [Components](#components)
        * [Conformator](#conformator)
        * [ListInstruments](#listInstruments)
        * [MovieCreator](#movieCreator)
        * [MovieInfo](#movieInfo)
        * [MoviesImporter](#moviesImporter)
        * [MoviesList](#moviesList)
        * [MoviesPagesBoard](#moviesPagesBoard)
        * [Pagination](#pagination)
        * [RemoveAcceptor](#removeAcceptor)
        * [Searcher](#searcher)
    * [Constants](#server-constants)
    * [SASS](#sass)
        * [Partials](#partials)
            * [VME](#vme)
    * [Utils](#utils)
        * [Methods](#methods)
* [Main](#main)
    * [Constants](#main-constants)
* [Dist](#dist)
* [Other](#other)

## Server

In the file `index.js` you can setup `express` server.

### Constants

In the file `index.js` you can find all constants which are needed only for server. Here are initialised next constants: `APP_PORT`, `SERVER_RESPONSES`, `DB_CONNECTION`.

### Models

In this folder all DB models (mongoose schemas) are stored. This app has only one model - `Movie`.

### Routes

In this folder all `API` routes are stored. This app has only routes for movies:
* `GET` - for getting movies with params;
* `POST` - for creating new movie or import movies from file;
* `PUT` - for updating chosen movie;
* `DELETE` - for removing chosen movie.

## Client

In this folder all files for `front` are stored (all components, styles and other).

### Components

Here you can find all application components. In this folder in `App.js` file all application logic is stored.

#### Conformator

Component for confirmation response to the server, such as add new movie, update movie or import movies from file.

#### ListInstruments

Component which is stored instruments such as select for sorting, buttons for creating new movies andother.

#### MovieCreator

Component for creating or updating movie.

#### MovieInfo

Component for showing all movie's details.

#### MoviesImporter

Component for importing movies from `.txt` file.

#### MoviesList

One of the most important components, where all movies are displayed.

#### MoviesPagesBoard

Component for showing movies amount.

#### Pagination

Component for paginating all movie items.

#### RemoveAcceptor

Component for confirmation response for removing movie.

#### Searcher

Component for searching movies by name or actor. Use debounce with 3 characters and 300ms limit.

### Constants

In the file `index.js` you can find all constants which are needed only for server.

### SASS

Here are all styles stored. In the file `styles.scss` you can find all third-party libraries import and import all style partials.

#### Partials

In the file `_app.scss` you can find all common app styles. In the file `_tagsinput-override.scss` you can find all overriden styles for tagsinput component. In the file `_vme.scss` you can you can import all files from `vme` folder. 

##### VME

Here you can find all common variables, mixins, extends.

### Utils

Here you can find all client settings (`WebfontLoader` for example). 

#### Methods

Here are help methods are stored for calling API methods.

## Main

### Constants

Here are all common constants for all application are stored. Such as `MOVIE_FORMATS`, `ITEMS_PER_PAGE`, `ROUTES`.

## Dist

Folder for builded application files. Here you can find main `index.html` file and main `bundle.js` file.

## Other

All other settings you can find in `package.json` or `webpack.config.js` files.