'use strict';

var Vue = require('vue');
require('jquery.qrcode');

Vue.directive('mouseQrcode',function(value){
	var self = this;
	var target = $(this.el);
	target.mouseenter(function(){
		$(target).find('.qrcode').qrcode({
			width: 160,
			height: 160,
			text: value,
			render: 'canvas'
		});
		$(target).find('.qrcode').fadeIn('fast');
	});
	target.mouseleave(function(){
		$(target).find('.qrcode').fadeOut('fast');
		$(target).find('.qrcode').html('');
	});
});

Vue.directive('qrcode',function(value){
	var self = this;
	var target = $(this.el);
	target.qrcode({
		width: 198,
		height: 198,
		text: value,
		render: 'canvas'
	});
});