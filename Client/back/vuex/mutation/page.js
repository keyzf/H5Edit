'use strict';

var mutations = {};

mutations.SELECTPAGE = function(state, index) {
    state.currentPage = index;
    state.checkedItems = [];
};
mutations.ADDPAGE = function(state) {
    var pageData = {
        main: {
            background: '#fff',
            type: '',
            height: 486,
        },
        items: []
    };
    state.workData.mainCode.pages.push(pageData);
    state.currentPage = state.workData.mainCode.pages.length;
};

mutations.DELPAGE = function(state, index) {
	var result = [];
	var pagesData = state.workData.mainCode.pages;
    // pagesData = result.concat(pagesData.slice(0, index), pagesData.slice(index + 1));
    pagesData.splice(index, 1);
    state.currentPage = state.currentPage === 1 ? 1 : state.currentPage - 1;
};

module.exports = mutations;