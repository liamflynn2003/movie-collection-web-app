'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const collection = require('./controllers/collection.js');
const accounts = require ('./controllers/accounts.js');
const statistics = require('./controllers/statistics.js')
// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/statistics', statistics.index);
router.get('/collection/:id', collection.index);

router.get('/collection/:id/deleteMovie/:movieid', collection.deleteMovie);
router.post('/collection/:id/addmovie', collection.addMovie);

router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.post('/dashboard/addcollection', dashboard.addCollection);

router.post('/collection/:id/updatemovie/:movieid', collection.updateMovie);

router.post('/about/addcomment', about.addComment);
router.post('/about/:id/updatecomment', about.updateComment);

// export router module
module.exports = router;