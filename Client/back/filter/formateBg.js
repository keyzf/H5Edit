'use strict';

var Vue = require('vue');

function checkIsColor(strColor) {
    var oSpan = document.createElement('span');
    oSpan.style.color = strColor;
    if (oSpan.style.color != "") {
        return true;
    } else {
        return false;
    }
    oSpan = null;
}

Vue.filter('FormatBg', function(value) {
    if (value && checkIsColor(value)) {
        return 'background-color:' + value;
    } else if (value) {
        return 'background-image:url(' + value + ')';
    }
});