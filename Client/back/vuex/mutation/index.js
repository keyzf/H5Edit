'use strict';

var utils = require('../../utils');
var _ = require('lodash');

var alert = require('./alert.js');
var confirm = require('./confirm.js');
var item = require('./item.js');
var page = require('./page.js');
var dom = require('./dom.js');

var mutations = {};

mutations.INITDATA = function(state, data) {
    if (localStorage[data._id] && localStorage[data._id] !== 'null' && !_.isEqual(JSON.parse(localStorage[data._id]), data) && window.confirm('检测到本地存在未保存数据，是否应用？')) {
        state.workData = JSON.parse(localStorage[data._id]);
    } else {
        state.workData = data;
    }
    localStorage.removeItem(data._id);
};

utils.mixin(mutations, alert);
utils.mixin(mutations, confirm);
utils.mixin(mutations, item);
utils.mixin(mutations, page);
utils.mixin(mutations, dom);

module.exports = mutations;