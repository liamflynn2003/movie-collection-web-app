"use strict";
// import all required modules
const logger = require("../utils/logger");
const collectionStore = require("../models/collection-store.js");
const accounts = require("./accounts.js");
const userStore = require("../models/user-store.js");

// create start object
const start = {
  
    // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");

    if (loggedInUser) {
      const collections = collectionStore.getAllCollections();
      const users = userStore.getAllUsers();
      
    //different values for the statistics
      let numCollections = collections.length;
      let numMovies = 0;
      let numUsers = users.length;
      
      let userid = loggedInUser.id;
      let numUserMovies = 0;
      let numUserCollections = collectionStore.getUserCollections(userid).length;

      for (let i in collections) {
        numMovies = numMovies + collections[i].movies.length;
      }

      for (let i in numUserCollections) {
        numUserMovies =
          numUserMovies + collectionStore.getUserCollections(userid).movies.length;
      }

      let averageMovies = numMovies / numUsers;
  
      const viewData = {
        title: "Welcome to the Movie Collections App!",
        totalCollections: numCollections,
        totalMovies: numMovies,
        averageMovies: averageMovies,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture:loggedInUser.picture
      };
      response.render("start", viewData);
    } else response.redirect("/");
  },
};

// export the start module
module.exports = start;
