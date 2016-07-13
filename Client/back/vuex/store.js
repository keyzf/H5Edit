'use strict';

var state = {
	alertObj:{
        show: false,
        msg: '提示信息',
        type: 'info' // 四种样式 success/info/warning/danger
    },
    confirmObj:{
        show: false,
        msg: '提示信息',
        event: 'func'
    },
    checkedItems: [],
    currentPage: 1,
    workData: {
        about: {
            desc: '',
            keyWords: '',
            thumbnail: ''
        },
        mainCode: {
            pages: [{
                items: [],
                main: {
                    background: '#fff',
                    height: 486,
                    type: ''
                }
            }],
            wholeAttr: {
                background: '#fff',
                bgmusic: '',
                bgmusicName: ''
            }
        },
        setConfig: {
            autoBackPrePage: false,
            direction: '',
            effect: '',
            loop: 'false'
        },
        title: '',
        user_name: ''
    }
};
var mutations = require('./mutation');

module.exports = {
	state: state,
	mutations: mutations,
	strict: true
};