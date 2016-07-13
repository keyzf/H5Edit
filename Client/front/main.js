'use strict';

require('./lib/animate.css');
require('./lib/fastclick.min.js');
require('./lib/swiper/swiper.js');
require('./lib/swiper/swiper.css');

require('./img/arrow.png');
require('./img/music.png');
require('./img/loading.png');

require('./css/reset.css');
require('./css/common.css');
require('./css/loading.css');

// meta缩放
var clientW = document.body.clientWidth;
var percent = clientW / 320;
document.getElementById('H5EditViewPort').setAttribute('content', 'width=320, initial-scale=' + percent + ', maximum-scale=' + percent + ', user-scalable=no');

var load = require('./js/load.js');
var music = require('./js/music.js');

var GoH5 = require('./js/goh5.js');