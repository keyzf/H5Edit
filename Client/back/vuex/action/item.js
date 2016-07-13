'use strict';

module.exports.addText = function(store) {
    store.dispatch('ADDTEXT');
}

module.exports.changeText = function(store, html, itemIndex) {
    store.dispatch('CHANGETEXT', html, itemIndex);
}

module.exports.addPicOrBg = function(store, src, type) {
    store.dispatch('ADDPICORBG', src, type);
}

module.exports.delBg = function(store) {
    store.dispatch('DELBG');
}

module.exports.addBgMusic = function(store, src, name) {
    store.dispatch('ADDBGMUSIC', src, name);
}

module.exports.delBgMusic = function(store) {
    store.dispatch('DElBGMUSIC');
}

module.exports.selectItem = function(store, index, multi) {
    store.dispatch('SELECTITEM', index, multi);
}

module.exports.clearCheckedItems = function(store) {
    store.dispatch('CLEARCHECKEDITEMS');
}

module.exports.delItem = function(store) {
    store.dispatch('DELITEM');
}