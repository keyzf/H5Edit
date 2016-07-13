'use strict';

module.exports.setStyle = function(store, index, params, isIn) {
    store.dispatch('SETSTYLE', index, params, isIn);
};

module.exports.addClass = function(store, index, className) {
    store.dispatch('ADDCLASS', index, className);
};

module.exports.removeClass = function(store, index, className) {
    store.dispatch('REMOVECALSS', index, className);
};
