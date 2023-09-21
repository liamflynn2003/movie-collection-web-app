"use strict";

// import all required modules
const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const uuid = require("uuid");
const commentStore = require("../models/comment-store");
const developerStore = require('../models/developer-store.js');

// create about object
const about = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Comment Form",
        developers: developerStore.getAllDevelopers(),
        comments: commentStore.getUserComments(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture:loggedInUser.picture
      };
      logger.info("about to render" + viewData.comments);
      response.render("about", viewData);
    } else response.redirect("/");
  },

  //adds a comment to the json
  addComment(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      date: date,
    };
    logger.debug("Creating a new Comment" + newComment);
    commentStore.addComment(newComment, function() {
      response.redirect("/about");
    });
  },
    
  //method to edit comments
  updateComment(request, response){
    const commentId = request.params.id;
    logger.debug("updating mcomment " + commentId);
    const updatedComment = {
      title: request.body.title
    };
    commentStore.editComment(commentId, updatedComment);
    response.redirect("/about/" + commentId);
  },
};

// export the about module
module.exports = about;
