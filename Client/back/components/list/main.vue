<template>
	<m-header></m-header>
	<div class="list_con">
		<div class="list_head">
			<ul>
				<li :class="{'active':listType === 1}" @click="changeListTab(1)">我的作品</li>
				<li :class="{'active':listType === 0}" @click="changeListTab(0)">全部作品</li>
			</ul>
		</div>
		<div class="list_body">
			<ul>
				<li class="create" @click="showCreate = !showCreate">
					<div class="all_center">
						<div class="horizontal_line"></div>
						<div class="vertical_line"></div>
						<span>创建新作品</span>
					</div>
				</li>
				<li v-for="item in listData" track-by="$index">
					<div class="top" v-mouse-qrcode="'http://'+ host + '/show/' + item._id">
						<a :href="'http://'+ host + '/show/' + item._id" target="_blank" class="qrcode"></a>
						<span class="status" :class="item.status === 0 ? 'status_0' : 'status_1'">{{item.status === 0 ? '草稿' : '发布'}}</span>
					</div>
					<div class="middle">
						<p>{{item.title}}</p>
						<div class="desc">
							<em>{{item.user_name}}</em>
							<em>{{item.createTime | Date 'yyyy-MM-dd hh:mm:ss'}}</em>
						</div>
					</div>
					<div class="bottom">
						<a href="javascript:void(0)" v-show="listType === 1" v-link="{path:'/edit/' + item._id}">编辑</a>
						<a href="javascript:void(0)">复制</a>
						<a href="javascript:void(0)" v-show="listType === 1" @click="deleteWork(item._id)">删除</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<pagination :pagination-conf="paginationConf"></pagination>
	<create :show-create.sync="showCreate"></create>
	<loading :loading.sync="loading"></loading>
	<alert></alert>
	<confirm></confirm>
</template>
<script>
	var actions = require('../../vuex/action');
	module.exports = {
		data: function() {
			var vm = this;
			return {
				loading: false,
				showCreate: false,
				paginationConf: {
					currentPage: 1,
					totalItems: 60,
					itemsPerPage: 7,
					pagesLength: 5,
					onChange: function(){
						var self = this;
						vm.loadListData({me: vm.listType,page: this.currentPage},function(data){
							if(!data.iserro){
								vm.loading = false;
								self.totalItems = data.data.totalItems;
								vm.listData = data.data.listData;
							}else{
								vm.alertObj = {
									show: true,
									msg: data.msg
								}
							}
						});
					}
				},
				listType: 1, // 0:默认 1:自己
				listData: [],
			};
		},
		created: function() {
			var self = this;
			this.loadListData({me: this.listType,page: this.currentPage},function(data){
				if(!data.iserro){
					self.loading = false;
					self.paginationConf.totalItems = data.data.totalItems;
					self.listData = data.data.listData;
				}else{
					self.alert({
						show: true,
						msg: data.msg
					});
				}
			});
		},
		vuex: {
			actions: {
				confirm: actions.confirm,
				alert: actions.alert
			}
		},
		methods: {
			changeListTab: function(type){
				this.listType = type;
				this.paginationConf.currentPage = 1;
				this.paginationConf.onChange();
			},
			loadListData: function(params,cb){
				var me = params.me === undefined ? 1 : params.me;
				var page = params.page || 1;
				$.ajax({
					url: '/api/list',
					type: 'get',
					data: {
						page: page,
						me: me
					},
					success: function(data){
						cb && cb(data);
					}
				});
			},
			deleteWork: function(id){
				var self = this;
				var confirmParams = {
					show: true,
					msg: '是否删除本作品？',
					event: function(){
						self.loading = true;
						$.ajax({
							url: '/api/delete',
							type: 'get',
							data: {
								_id: id
							},
							success: function(data){
								self.loading = false;
								self.paginationConf.onChange();
							}
						})
					}
				};
				this.confirm(confirmParams);
			}
		},
		components: {
			'mHeader': require('../common/header.vue'),
			'create': require('./create.vue'),
			'pagination': require('../common/pagination.vue'),
			'loading': require('../common/loading.vue'),
			'confirm': require('../common/confirm.vue'),
			'alert': require('../common/alert.vue')
		}
	};
</script>
<style>
	.list_con {
		width: 960px;
		margin: 80px auto 0;
	}
	.list_head {
		width: 100%;
		height: 44px;
		position: relative;
		font-size: 0;
		background: #fff;
	}
	.list_head ul {
		display: inline-block;
		vertical-align: top;
		font-size: 0;
		padding: 0
	}
	.list_head li {
		display: inline-block;
		vertical-align: top;
		line-height: 44px;
		width: 150px;
		text-align: center;
		cursor: pointer;
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
		font-size: 16px;
	}
	.list_head li.active {
		background: #01d7b2;
		color: #fff;
	}
	.list_head li:hover {
		background: #01d7b2;
		color: #fff;
	}
	.list_head .search {
		display: inline-block;
		position: absolute;
		right: 20px;
	}
	.list_body {
		width: 100%;
		margin-top: 20px;
	}
	.list_body ul {
		font-size: 0;
		padding: 0;
	}
	.list_body li {
		width: 220px;
		background: #fff;
		margin: 10px;
		position: relative;
		font-size: 16px;
		display: inline-block;
		vertical-align: top;
		height: 314px;
		overflow: hidden;
	}
	.list_body li.create {
		cursor: pointer;
	}
	.list_body .vertical_line {
		width: 6px;
		height: 100px;
		background: #01d7b2;
		margin: 0 auto 10px;
	}
	.list_body .horizontal_line {
		width: 100px;
		height: 6px;
		background: #01d7b2;
		margin: 0 auto 10px;
		position: absolute;
		top: 47px;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}
	li.create span {
		font-size: 14px;
		color: #01d7b2;
	}
	li .top {
		position: relative;
		background: url('../../assets/img/eg.jpg');
		width: 220px;
		height: 220px;
		background-size: contain;
	}
	li .qrcode {
		position: absolute;
		width: 220px;
		height: 220px;
		left: 0;
		top: 0;
		cursor: pointer;
		display: none;
		background: rgba(0,0,0,0.4);
	}
	.top canvas {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		padding: 8px;
		border-radius: 6px;
		background: #fff;
	}
	.top img {
		display: block;
		width: 220px;
		height: 220px;
	}
	.top .status {
		display: block;
		position: absolute;
		width: 120px;
		height: 24px;
		color: #fff;
		font-size: 12px;
		line-height: 24px;
		transform: rotate(-45deg);
		-webkit-transform: rotate(45deg);
		background: #aaa;
		text-align: center;
		right: -36px;
		top: 8px;
	}
	.top .status.status_1 {
		background: #01d7b2;
	}
	li .middle {
		padding: 8px;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
		border-top: 1px solid #ddd;
	}
	.middle p {
		margin: 0;
		font-size: 16px;
		color: #3f4a58;
		line-height: 24px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.middle .desc {
		font-size: 0;
	}
	.desc em{
		font-size: 12px;
		color: #a0aec4;
		display: inline-block;
		vertical-align: top;
		width: 40%;
		font-style: normal;
		line-height: 20px;
	}
	.desc em:first-child {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.desc em:last-child {
		text-align: right;
		width: 60%;
	}
	li .bottom {
		text-align: left;
	}
	.bottom a {
		display: inline-block;
		vertical-align: top;
		color: #01d7b2;
		font-size: 14px;
		line-height: 32px;
		margin: 0 8px;
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
	}
	.bottom a:hover {
		text-decoration: underline;
	}
</style>