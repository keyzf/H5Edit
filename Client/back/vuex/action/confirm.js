'use strict';

module.exports.confirm = function(store, params) {
	store.dispatch('CONFIRM', params);
};

module.exports.hideConfirm = function(store) {
	store.dispatch('HIDECONFIRM');
};