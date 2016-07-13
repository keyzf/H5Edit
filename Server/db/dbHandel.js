'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models.js");

for (var item in models) {
    mongoose.model(item, new Schema(models[item]));
}

module.exports = {
    getModel: function(type) {
        return mongoose.model(type);
    }
}
