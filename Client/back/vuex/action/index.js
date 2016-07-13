'use strict';

var utils = require('../../utils');

var alert = require('./alert.js');
var confirm = require('./confirm.js');
var item = require('./item.js');
var page = require('./page.js');
var dom = require('./dom.js');

var actions = {};

actions.initData = function(store, id, cb) {
    $.ajax({
        url: '/api/work/getWork',
        type: 'get',
        data: {
            _id: id
        },
        // async: false,
        success: function(data) {
            if (!data.iserro) {
                store.dispatch('INITDATA', data.data);
            }
            cb && cb(data);
        }
    });
};

utils.mixin(actions, alert);
utils.mixin(actions, confirm);
utils.mixin(actions, item);
utils.mixin(actions, page);
utils.mixin(actions, dom);

module.exports = actions;