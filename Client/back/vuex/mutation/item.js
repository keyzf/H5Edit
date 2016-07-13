'use strict';

var mutations = {};

var getAllItemsLen = function(state) {
    var len = 0;
    for (var i = 0; i < state.workData.mainCode.pages.length; i++) {
        len += state.workData.mainCode.pages[i].items.length;
    }
    return len;
};

var tpl = {
    txt: function(index, num, params) {
        return {
            type: 'txt',
            style: 'z-index:' + index * 10 + ';width:100px;top:0px;left:0px;font-size:1em;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<div style="display:block;width:100%;height:100%;box-sizing:border-box;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);color:#1a1a1a;line-height:1.5;padding:5px;">文本文本文本</div>'
        };
    },
    pic: function(index, num, params) {
        return {
            type: 'pic',
            style: 'z-index:' + index * 10 + ';max-width:320px;top:0px;left:0px;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<img style="width:100%;height:100%;box-sizing:border-box;display:block;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" src="' + params.src + '">'
        };
    },
    video: function(index, num, params) {
        return {
            type: 'video',
            style: 'z-index:' + index * 10 + ';width:320px;top:0px;left:0px;box-sizing:border-box;position: absolute;',
            class: params.className ? params.className : '',
            id: 'n_' + num,
            attr: {},
            content: '<video style="width:100%;height:100%;box-sizing:border-box;background-color: rgba(0,0,0,0);box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);" data-vid="' + videoid + '" poster="' + pic_url + '" controls="controls" preload="none" src="http://video.proc.sina.cn/video_explore/location.php?video_id=' + videoid + '">您的浏览器不支持video标签。</video>'
        };
    }
};

mutations.ADDTEXT = function(state) {
    var items = state.workData.mainCode.pages[state.currentPage - 1].items;
    var index = items.length + 1;
    var num = getAllItemsLen(state) + 1;
    var txtData = tpl.txt(index, num, {});
    items.push(txtData);
    mutations.SELECTITEM(state, index - 1);
};

mutations.CHANGETEXT = function(state, html, itemIndex) {
    var items = state.workData.mainCode.pages[state.currentPage - 1].items;
    items[itemIndex].content = items[itemIndex].content.replace(/\>[\s\S]+\</, '>' + html + '<');
};

mutations.ADDPICORBG = function(state, src, type) {
    if (type === 'pic') {
        state.checkedItems = [];
        var items = state.workData.mainCode.pages[state.currentPage - 1].items;
        var index = items.length + 1;
        var num = getAllItemsLen(state) + 1;
        var picData = tpl.pic(index, num, {
            src: src
        });
        items.push(picData);
        mutations.SELECTITEM(state, index - 1);
    } else if (type === 'bg') {
        state.workData.mainCode.pages[state.currentPage - 1].main.background = src;
    }
};

mutations.DELBG = function(state) {
    // state.currentPageMain.background = '#fff';
    state.workData.mainCode.pages[state.currentPage - 1].main.background = '#fff';
};

mutations.ADDBGMUSIC = function(state, src, name) {
    state.workData.mainCode.wholeAttr.bgmusic = src;
    state.workData.mainCode.wholeAttr.bgmusicName = name;
};

mutations.DElBGMUSIC = function(state) {
    state.workData.mainCode.wholeAttr.bgmusic = '';
    state.workData.mainCode.wholeAttr.bgmusicName = '';
};

mutations.SELECTITEM = function(state, index, multi) {
    if (multi) {
        state.checkedItems.push(index);
    } else {
        state.checkedItems = [];
        state.checkedItems.push(index);
    }
};

mutations.CLEARCHECKEDITEMS = function(state, index, multi) {
    state.checkedItems = [];
};

mutations.DELITEM = function(state) {
    // var result = [];
    // for (var i = 0; i < state.checkedItems.length; i++) {
    //     var result = [];
    //     delete state.currentPageData.items[state.checkedItems[i]];
    // }
    // for (var i = 0; i < state.currentPageData.items.length; i++) {
    //     if (state.currentPageData.items[i] !== undefined) {
    //         result.push(state.currentPageData.items[i]);
    //     }
    // }
    // state.currentPageData.items = result;

    var result = [];
    var items = state.workData.mainCode.pages[state.currentPage - 1].items;

    for (var i = 0; i < state.checkedItems.length; i++) {
        delete items[state.checkedItems[i]];
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i] !== undefined) {
            result.push(items[i]);
        }
    }
    state.workData.mainCode.pages[state.currentPage - 1].items = result;
};

module.exports = mutations;