'use strict';
// import all required modules
const low = require('lowdb');
const fileAsync = require('lowdb/lib/file-async');

class JsonStore {
  
  constructor(file, defaults) {
    this.db = low(file, { storage: fileAsync, });
    this.db.defaults(defaults).value();
  }

  add(collection, obj) {
    this.db.get(collection).push(obj).last().value();
  }

  remove(collection, obj) {
    this.db.get(collection).remove(obj).value();
  }

  removeAll(collection) {
    this.db.get(collection).remove().value();
  }

  findAll(collection) {
    return this.db.get(collection).value();
  }

  findOneBy(collection, filter) {
    const results = this.db.get(collection).filter(filter).value();
    return results[0];
  }

  findByIds(collection, ids) {
    return this.db.get(collection).keyBy('id').at(ids).value();
  }

  findBy(collection, filter) {
    return this.db.get(collection).filter(filter).value();
  }
  
  add(comment, obj) {
    this.db.get(comment).push(obj).last().value();
  }
  remove(comment, obj) {
    this.db.get(comment).remove(obj).value();
  }

  removeAll(comment) {
    this.db.get(comment).remove().value();
  }

  findAll(comment) {
    return this.db.get(comment).value();
  }

  findOneBy(comment, filter) {
    const results = this.db.get(comment).filter(filter).value();
    return results[0];
  }

  findByIds(comment, ids) {
    return this.db.get(comment).keyBy('id').at(ids).value();
  }

  findBy(comment, filter) {
    return this.db.get(comment).filter(filter).value();
  }
}

module.exports = JsonStore;