'use strict';

var Vue = require('vue');

Vue.filter('Number', function(value, defaultNum) {
    if (isNaN(parseFloat(value))) {
        if (defaultNum) {
            return defaultNum;
        } else {
            return 0;
        }
    } else {
        return parseFloat(value);
    }
});