'use strict';

module.exports.selectPage = function(store, idnex) {
    store.dispatch('SELECTPAGE', idnex);
};

module.exports.addPage = function(store) {
    store.dispatch('ADDPAGE');
};

module.exports.delPage = function(store, index) {
    if (store.state.workData.mainCode.pages.length === 1) {
        store.dispatch('ALERT', {
            show: true,
            msg: '至少保留一页',
            type: 'warning'
        });
        setTimeout(function() {
            store.dispatch('HIDEALERT');
        }, 2500);
        return;
    }
    store.dispatch('DELPAGE', index);
};