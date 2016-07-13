<template>
	<div class="tool_bar">
        <ul>
            <li v-tips="['right','背景']">
                <div class="tool_btn tool_btn3" @click="setBg">背景</div>
                <ul class="bg_btn" v-show="dropDown" @click="dropDown = !dropDown">
                    <li @click="$dispatch('change-bg')">更换</li>
                    <li @click="delBg">删除</li>
                </ul>
            </li>
            <li v-tips="['right','预览']" @click="reload">
                <div class="tool_btn tool_btn4">预览</div>
            </li>
            <li @click="bgGridStatus = !bgGridStatus" v-tips="['right','网格']">
                <div class="tool_btn tool_btn5">网格</div>
            </li>
        </ul>
    </div>
</template>
<script>
	var utils = require('../../utils');
	var actions = require('../../vuex/action');
	module.exports = {
		data: function() {
			return {
				dropDown: false
			}
		},
		props: ['bgGridStatus'],
		vuex: {
			getters: {
				currentPageMain: function(state) {
					return state.workData.mainCode.pages[state.currentPage - 1].main;
				}
			},
			actions: {
				delBg: actions.delBg
			}
		},
		methods: {
			setBg: function() {
				if (!utils.checkIsColor(this.currentPageMain.background)) {
					this.dropDown = !this.dropDown;
				} else {
					this.$dispatch('change-bg');
				}
			},
			reload: function() {
				$('.j_screen').fadeOut('fast');
				$('.j_screen').fadeIn('fast');
			},
		}
	};
</script>
<style>
	.tool_bar {
		position: fixed;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		margin-left: 190px;
		/*z-index: 9998;*/
	}
	.tool_bar>ul>li {
		color: #fff;
		width: 30px;
		height: 30px;
		cursor: pointer;
		text-align: center;
		line-height: 40px;
		display: block;
		background-color: rgba(0,0,0,0.5);
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
		padding: 5px;
		position: relative;
	}
	.tool_bar>ul>li:hover {
		background-color: rgba(0,0,0,0.8);
	}
	.tool_btn {
		background-image: url('../../assets/img/icon.png');
		text-indent: -9999px;
		background-repeat: no-repeat;
		width: 30px;height: 30px;
	}
	.tool_btn1 {
		background-position: -90px 0;
	}
	.tool_btn2 {
		background-position: -90px -30px;
	}
	.tool_btn3 {
		background-position: 0 -150px;
	}
	.tool_btn4 {
		background-position: -90px -270px;
	}
	.tool_btn5 {
		background-position: -90px -60px;
	}
	.bg_btn {
		position: absolute;
		width: 80px;
		background-color: rgba(0,0,0,0.8);
		left: -80px;
		top: 0;
	}
	.bg_btn>li {
		width: 100%;
		font-size: 14px;
		color: #fff;
		text-align: center;
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
	}
	.bg_btn>li:hover {
		background-color: #01d7b2
	}
</style>