<template>
	<div class="pages_con left">
		<div class="item pages_list">
			<div class="head">页面列表</div>
			<ul>
				<li v-for="page in pagesData" :class="{'active':currentPage == $index+1}" @click="selectPage($index+1)">
					<span>第{{$index+1}}页</span>
					<span class="del_page close" v-show="currentPage == $index+1" @click="delPage($index)">&times;</span>
				</li>
			</ul>
		</div>
		<div class="item nav_bottom">
			<a href="javascript:void(0)" title="添加新页" @click="addPage"><img src="../../assets/img/add_page.png"/><span>添加新页</span></a>
		</div>
	</div>
</template>
<script>
	var actions = require('../../vuex/action');
	module.exports = {
		vuex: {
			getters: {
				pagesData: function(state){
					return state.workData.mainCode.pages;
				},
				currentPage: function(state){
					return state.currentPage;
				}
			},
			actions: {
				selectPage: actions.selectPage,
				addPage: actions.addPage,
				delPage: actions.delPage
			}
		}
	};
</script>
<style>
	.pages_con {
		position: fixed;
		background: #fff;
		display: flex;
		flex-direction:column;
		width: 280px;
		box-sizing: border-box;
		height: 100%;
		padding-bottom: 60px;
		top: 60px;
		left: 0;
	}
	.pages_con .item {
		display: flex;
		flex-direction: column;
	}
	.pages_con .head {
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		background: #0fcebd;
		font-size: 16px;
		width: 100%;
	}
	.pages_con .item.pages_list {
		flex: 1;
	}
	.pages_con .item.pages_list ul {
		position: relative;
		width: 280px;
		padding: 0 20px;
		box-sizing: border-box;
		overflow-y: auto;
		flex:1;
	}
	.pages_con .item.pages_list ul li {
		display: block;
		height: 36px;
		line-height: 36px;
		margin-top: 10px;
		color: #666;
		text-align: center;
		background: #dcdcdc;
		cursor: pointer;
		width: 100%;
		border-radius: 4px;
		font-weight: bold;
		position: relative;
	}
	.pages_con .item.pages_list ul li:last-child {
		margin-bottom: 10px;
	}
	.pages_con .item.pages_list ul li.active {
		background: #0fcebd;
		color: #fff
	}
	.pages_con .item.pages_list .del_page {
		position: absolute;
		display: block;
		color: #ff5151;
		font-size: 27px;
		right: 7px;
		top: 4px;
		z-index: 9;
	}
	.pages_con .item.pages_list .del_page.close {
		opacity: 0.8;
		box-shadow: none;
		text-shadow: none;
	}
	.pages_con .item.pages_list .del_page.close:hover {
		opacity: 1;
	}
	.pages_con .item.nav_bottom {
		width: 280px;
		text-align: center;
		height: 44px;
		background: #3f4a58;
		font-size: 16px;
	}
	.pages_con .item.nav_bottom a {
		color: #10c3b3;
		display: block;
		cursor: pointer;
		line-height: 44px;
	}
	.pages_con .item.nav_bottom a img {
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
		width: 16px;
		height: 16px;
	}
	.pages_con .item.nav_bottom a span {
		display: inline-block;
		vertical-align: middle;
	}
</style>