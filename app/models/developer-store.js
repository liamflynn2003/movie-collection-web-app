'use strict';
// import all required modules
const developerStore = {

  developers: require('./developer-store.json').developers,

  getAllDevelopers() {
    return this.developers;
  },

};

module.exports = developerStore;