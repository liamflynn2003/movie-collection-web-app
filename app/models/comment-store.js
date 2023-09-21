"use strict";
// import all required modules
const _ = require("lodash");
const JsonStore = require("./json-store");
const cloudinary = require("cloudinary");
const logger = require("../utils/logger");

("use strict");

const commentStore = {
  
  store: new JsonStore("./models/comment-store.json", { comments: [] }),
  comment: require("./comment-store.json").comments,

  
  addComment(comment, response) {
    this.store.add(this.comment, comment);
  },

  getComment(id) {
    return this.store.findOneBy(this.comment, { id: id });
  },

  getAllComments() {
    return this.comments;
  },
  getUserComments(userid) {
    return this.store.findBy(this.comment, { userid: userid });
  },
};

module.exports = commentStore;
