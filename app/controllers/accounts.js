"use strict";
// import all required modules
const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("collection", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    (user.picture = request.files.picture),
      userstore.addUser(user, function () {
        logger.info("registering" + user.email);
        response.cookie("collection", user.email);
        logger.info("logging in" + user.email);
        response.redirect("/start");
      });
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie("collection", user.email);
      logger.info("logging in" + user.email);
      response.redirect("/start");
    } else {
      response.redirect("/login");
    }
  },
//returns the current loggin in user
  getCurrentUser(request) {
    const userEmail = request.cookies.collection;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
