"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const collectionStore = require("../models/collection-store.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Collection Dashboard",
        collections: collectionStore.getUserCollections(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture:loggedInUser.picture
      };
      logger.info("about to render" + viewData.collections);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },
//method that deletes a collection
  deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug("Deleting Collection" + collectionId);
    collectionStore.removeCollection(collectionId);
    response.redirect("/dashboard");
  },
//method that adds a collection to a user
  addCollection(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newCollection = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      movies: []
    };
    logger.debug("Creating a new Collection" + newCollection);
    collectionStore.addCollection(newCollection, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
