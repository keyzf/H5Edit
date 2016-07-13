'use strict';

var route = require('express').Router();

var apis = ['./list.js', './user.js', './delete.js', './work.js', './img.js', './audio.js'];

module.exports = apis.map(function(item) {
	return require(item)(route);
});
