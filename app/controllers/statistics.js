"use strict";
// import all required modules
const logger = require("../utils/logger");
const collectionStore = require("../models/collection-store.js");
const accounts = require("./accounts.js");
const userStore = require("../models/user-store.js");

const statistics = {
  
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");

    if (loggedInUser) {
      const collections = collectionStore.getAllCollections();
      const users = userStore.getAllUsers();
//statistics values that get calculated
      let numCollections = collections.length;
      let numMovies = 0;
      let numUsers = users.length;
      let userid = loggedInUser.id;
      let numUserMovies = 0;
      let numUserCollections =
        collectionStore.getUserCollections(userid).length;
      
      for (let i in collections) {
        numMovies = numMovies + collections[i].length;
      }

      for (let i in collections) {
        if(collections[i].id == userid){
        numUserMovies =
          numUserMovies + 1;
        }
      }

      let averageMovies = numMovies / numUsers;
      let averageUserMovies = numUserMovies / numUserCollections;

      const viewStatistics = {
        totalCollections: numCollections,
        totalMovies: numMovies,
        averageMovies: averageMovies,
        numUserCollections: numUserCollections,
        numUserMovies: numUserMovies,
        averageUserMovies: averageUserMovies,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };
      response.render("statistics", viewStatistics);
    } else response.redirect("/");
  },
};

// export the statistics module
module.exports = statistics;
