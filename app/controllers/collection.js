"use strict";
// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const collectionStore = require("../models/collection-store");
const accounts = require("./accounts.js");

const collection = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const collectionId = request.params.id;
    logger.debug("Collection id = " + collectionId);
    if (loggedInUser) {
      const viewData = {
        title: "Collection",
        collection: collectionStore.getCollection(collectionId),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };
      response.render("collection", viewData);
    } else response.redirect("/");
  },
  //method to delete a chosen movie from a user's collection
  deleteMovie(request, response) {
    const collectionId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("Deleting Movie" + movieId + "from Collection" + collectionId);
    collectionStore.removeMovie(collectionId, movieId);
    response.redirect("/collection/" + movieId);
  },
  //method that adds a movie to a user's collection
  addMovie(request, response) {
    const collectionId = request.params.id;
    const collection = collectionStore.getCollection(collectionId);
    const newMovie = {
      id: uuid(),
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      runtime: request.body.runtime,
    };
    collectionStore.addMovie(collectionId, newMovie);
    response.redirect("/collection/" + collectionId);
  },
  //method that updates 
  updateMovie(request, response) {
    const collectionId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      runtime: request.body.runtime,
    };
    collectionStore.editMovie(collectionId, movieId, updatedMovie);
    response.redirect("/collection/" + collectionId);
  },
};

module.exports = collection;
