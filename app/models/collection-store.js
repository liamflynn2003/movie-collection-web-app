'use strict';
// import all required modules
const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const collectionStore = {

  store: new JsonStore('./models/collection-store.json', { collectionCollection: [] }),
  collection: 'collectionCollection',

  getAllCollections() {
    return this.store.findAll(this.collection);
  },

  getCollection(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addCollection(collection, response) {
     collection.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            collection.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, collection);
  },

  removeCollection(id) {
    const collection = this.getCollection(id);
    this.store.remove(this.collection, collection);
  },

  removeAllCollections() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const collection = this.getCollection(id);
    collection.movies.push(movie);
  },

  removeMovie(id, movieId) {
    const collection = this.getCollection(id);
    const movies = collection.movies;
    _.remove(movies, { id: movieId});
  },
  
  editMovie(id, movieId, updatedMovie) {
    const collection = this.getCollection(id);
    const movies = collection.movies;
    const index = movies.findIndex(movie => movie.id === movieId);
    movies[index].title = updatedMovie.title;
    movies[index].director = updatedMovie.director;
    movies[index].genre = updatedMovie.genre;
    movies[index].runtime = updatedMovie.runtime;
  },
  
  getUserCollections(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = collectionStore;