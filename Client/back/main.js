var Vue = require('vue');
var VueRouter = require('vue-router');
var Vuex = require('vuex');

Vue.use(VueRouter);
Vue.use(Vuex);

require('./assets/css/reset.css');
require('./assets/css/common.css');

require('./filter/date.js');
require('./filter/formateBg.js');
require('./filter/number.js');

require('./directive/qrcode.js');
require('./directive/tips.js');

// vue component
var Home = require('./components/home/main.vue');
var List = require('./components/list/main.vue');
var Edit = require('./components/edit/main.vue');

var store = require('./vuex/store.js');
var App = Vue.extend({
    store: new Vuex.Store(store)
});

var router = new VueRouter();

router.map({
    '/': {
        component: Home
    },
    '/list': {
        component: List
    },
    '/edit/:id': {
        component: Edit
    }
});

var utils = require('./utils');
router.beforeEach(function() {
    if (utils.getCookie('isLogin') !== '1') {
        router.go('/');
        return;
    }
    if(router.app.$route.path === '/' && utils.getCookie('isLogin') === '1'){
        router.go('/list');
        return;
    }
});

router.redirect({
  '*': '/'
});

router.start(App, "#app");