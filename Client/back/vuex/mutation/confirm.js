'use strict';

var mutations = {};

mutations.CONFIRM = function(state, params) {
    state.confirmObj.show = params.show;
    state.confirmObj.msg = params.msg || '提示信息';
    state.confirmObj.event = params.event || null;
};

mutations.HIDECONFIRM = function(state) {
    state.confirmObj.show = false;
};

module.exports = mutations;