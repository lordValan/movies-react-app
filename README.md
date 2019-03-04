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

In the main file `index.js` you can setup `express` server.

### Constants

In the main file `index.js` you can find all constants which are needed only for server. Here are initialised next constants: `APP_PORT`, `SERVER_RESPONSES`, `DB_CONNECTION`.

### Models

In this folder all DB models (mongoose schemas) are stored. This app has only one model - `Movie`.

### Routes

In this folder all `API` routes are stored. This app has only routes for movies:
* `GET` - for getting movies with params;
* `POST` - for creating new movie or import movies from file;
* `PUT` - for updating chosen movie;
* `DELETE` - for removing chosen movie.

## Client

### Components

#### Conformator

#### ListInstruments

#### MovieCreator

#### MovieInfo

#### MoviesImporter

#### MoviesList

#### MoviesPagesBoard

#### Pagination

#### RemoveAcceptor

#### Searcher

### Constants

### SASS

#### Partials

##### VME

### Utils

#### Methods

## Main

### Constants

## Dist

## Other