<template>
	<div class="edit_bg" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: #d0cfd8"></div>
	<m-header :show-set.sync="showSet" v-on:add-pic="showPic" v-on:change-bg="showBg" v-on:set-bgmusic="showMusic"></m-header>
	<page-list></page-list>
	<phone :bg-grid-status.sync="bgGridStatus"></phone>
	<attr-list></attr-list>
	<material-lib-pic :show.sync="libPicConfig.show" :msg="libPicConfig.msg" :type.sync="libPicConfig.type"></material-lib-pic>
	<material-lib-music :show.sync="libMusicConfig.show" :msg.sync="libMusicConfig.msg"></material-lib-music>
	<toolbar v-on:change-bg="showBg" :bg-grid-status.sync="bgGridStatus"></toolbar>
	<set :show-set.sync="showSet"></set>
	<alert></alert>
</template>
<script>
	var actions = require('../../vuex/action');
	module.exports = {
		data: function() {
			return {
				libPicConfig: {
					show: false,
					msg: '',
					type: '',
				},
				libMusicConfig: {
					show: false,
					msg: ''
				},
				bgGridStatus: true,
				showSet: false,
			}
		},
		created: function() {
			var self = this;
			this.initData(this.$route.params.id, function(data) {
				if(data.iserro && data.msg === '没有权限'){
					self.alert({
						show:true,
						msg: data.msg,
						type: 'danger'
					})
				}else{
					self.loading = false;
				}
			});
			$(window).bind("beforeunload",function(){
				if(self.$route.path.indexOf('edit') !== -1){
					return "请确认您的场景已保存";
				}
			});
		},
		ready: function(){
			var self = this;
			this.autoSave = setInterval(function(){
				if (self.workData) {
					localStorage[self.$route.params.id] = JSON.stringify(self.workData);
				}
			}, 10000);
		},
		beforeDestroy: function(){
			clearInterval(this.autoSave);
		},
		vuex: {
			getters: {
				workData: function(state) {
					return state.workData;
				}
			},
			actions: {
				initData: actions.initData,
				alert: actions.alert
			}
		},
		methods: {
			showPic: function() {
				this.libPicConfig = {
					show: true,
					msg: '插入图片',
					type: 'pic'
				};
			},
			showBg: function() {
				this.libPicConfig = {
					show: true,
					msg: '更改背景',
					type: 'bg'
				};
			},
			showMusic: function() {
				this.libMusicConfig = {
					show: true,
					msg: '设置背景音乐'
				};
			}
		},
		components: {
			'mHeader': require('../common/header.vue'),
			'materialLibMusic': require('./materialLibMusic.vue'),
			'materialLibPic': require('./materialLibPic.vue'),
			'pageList': require('./pageList.vue'),
			'attrList': require('./attrList.vue'),
			'phone': require('./phone.vue'),
			'toolbar': require('./toolbar.vue'),
			'set': require('./set.vue'),
			'alert': require('../common/alert.vue')
		}
	}
</script>
<style>
</style>