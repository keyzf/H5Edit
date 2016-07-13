<template>
	<div class="dialog_con" v-show="show" transition="fade">
		<div class="dialog_bg" @click="hideMaterialLibMusic"></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>素材库</h2>
				<p>{{msg}}</p>
				<a href="javascript:void(0)" class="dialog_link close" @click="hideMaterialLibMusic">&times;</a>
			</div>
			<div class="dialog_main lib_con">
				<div class="lib_list">
					<ul class="group">
						<li>我的乐库</li>
					</ul>
					<div class="upload_btn" v-tips="['top','大小不得超过4M（为了更好的体验，请控制音乐大小）']">
						<span>上传音乐</span>
						<input type="file" accept="audio/*" @change="uploadMusic($event)" style="display: block;width: 100%;height: 100%;position: absolute;opacity: 0;left: 0;top: 0;cursor: pointer;"></input>
					</div>
				</div>
				<div class="lib_main">
					<div class="lib_main_head">
						<ul class="lib_main_head_group">
							<li v-show="wholeAttr.bgmusic !== ''"><strong>当前背景音乐：{{wholeAttr.bgmusicName}}</strong><a href="javascript:void(0)" class="close" @click="delBgMusic">&times;</a></li>
							<li><span>管理</span></li>
						</ul>
						<ul class="lib_main_head_group" style="display: none;">
							<li><span>删除</span></li>
							<li><span>退出管理</span></li>
						</ul>
					</div>
					<div class="lib_main_body">
						<ul class="music_list">
							<li v-for="item in musicList" @click="addBgMusic(item.file_path,item.file_name)">
								<p>{{item.file_name}}</p>
								<a href="javascript:void(0)" :music-src="item.file_path" @click.stop="preMuisc($event)">播放</a>
								<span>{{item.file_size | FileSize}}</span>
							</li>
						</ul>
						<pagination :pagination-conf="paginationConf"></pagination>
					</div>
				</div>
			</div>
			<div class="dialog_bottom">
				<ul class="dialog_btn">
					<li @click="hideMaterialLibMusic">取消</li>
					<li @click="hideMaterialLibMusic">确认</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	var actions = require('../../vuex/action');
	module.exports = {
		data: function(){
			var self = this;
			return {
				musicList: [],
				paginationConf: {
					currentPage: 1,
					totalItems: 0,
					itemsPerPage: 7,
					pagesLength: 5,
					onChange: function(){
						self.loadMuisc(self.paginationConf.currentPage);
					}
				}
			}
		},
		props: ['show', 'msg', 'loading'],
		created: function(){
			this.loadMuisc(this.paginationConf.currentPage);
		},
		components:{
			'pagination': require('../common/pagination.vue')
		},
		vuex: {
			getters: {
				wholeAttr: function(state){
					return state.workData.mainCode.wholeAttr;
				}
			},
			actions: {
				addBgMusic: actions.addBgMusic,
				delBgMusic: actions.delBgMusic,
				alert: actions.alert
			}
		},
		methods:{
			hideMaterialLibMusic: function() {
				this.show = false;
			},
			uploadMusic: function(ev){
				var files = ev.target.files;
				var formData = new FormData();
				formData.append('files', files[0]);
				var self = this;
				if(files[0].size > 4194304){
					alert('请上传小于4M的文件');
					return false;
				}
				self.loading = true;
				$.ajax({
					url: '/api/audio/upload?file_name=' + files[0].name + '&file_size='+files[0].size,
					type: 'post',
					cache: false,
					data: formData,
					processData: false,
					contentType: false,
					success: function(data){
						self.loading = false;
						self.alert({
							show: true,
							msg: data.msg,
							type: 'success'
						})
						self.paginationConf.currentPage = 1;
						self.paginationConf.onChange();
					}
				})
			},
			loadMuisc: function(page){
				var self = this;
				$.ajax({
					url: '/api/audio/list',
					type: 'get',
					data: {
						page: page
					},
					success: function(data){
						self.musicList = data.data.musicList
						self.paginationConf.totalItems = data.data.totalItems;
					}
				})
			},
			preMuisc: function(ev){
				var src = $(ev.target).attr('music-src');
				if($('#pre_music').length === 0){
					var audio = document.createElement('audio');
					$(audio).attr('id','pre_music');
					$(audio).appendTo($('body'));
					$(audio).attr('src',src);
					$(audio).attr('autoplay','autoplay');
					$(ev.target).html('暂停');
				} else {
					if($(ev.target).html() === '暂停'){
						$(ev.target).html('播放');
						$('#pre_music')[0].pause();
						return;
					}
					$('.music_list a').html('播放');
					if($(ev.target).html() === '播放'){
						$(ev.target).html('暂停');
						if($('#pre_music').attr('src') !== src){
							$('#pre_music').attr('src',src);
						}else{
							$('#pre_music')[0].play();
						}
						return;
					}
				}
			}
		}
	};
</script>
<style>
	.lib_con {
		display: flex;
		flex-direction: row;
	}
	.lib_list {
		width: 200px;
		display: flex;
		flex-direction: column;
	}
	.lib_list .group {
		flex: 1;
		margin-top: 15px;
	}
	.lib_list li {
		border-bottom: 1px solid #ccd5db;
		background: #fff;
		width: 100%;
		padding: 0 0 0 20px;
		box-sizing: border-box;
		color: #76838f;
		font-size: 12px;
		height: 44px;
		line-height: 44px;
		cursor: pointer;
	}
	.lib_list .upload_btn {
		width: 100%;
		height: 44px;
		line-height: 44px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		background: #01d7b2;
		position: relative;
	}
	.lib_main {
		flex: 1;
		background: #fff;
		margin-top: 15px;
		border-top-left-radius: 6px;
		padding: 0 15px;
	}
	.lib_main_head {
		width: 100%;
		height: 44px;
		border-bottom: 1px solid #ccd5db;
		display: flex;
		justify-content: flex-end;
	}
	.lib_main_head_group {
		font-size: 0;
		height: 44px;
	}
	.lib_main_head_group li {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		line-height: 44px;
		margin: 0 5px;
		padding: 0 10px;
	}
	.lib_main_head_group a {
		display: inline-block;
		vertical-align: middle;
		margin-left: 10px;
	}
	.lib_main_head_group a:hover {
		color: #01d7b2;
	}
	.lib_main_head_group span {
		cursor: pointer;
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
		color: #76838f;
	}
	.lib_main_head_group span:hover {
		color: #01d7b2;
	}
	.music_list {
		width: 100%;
		font-size: 0;
		padding: 10px 0;
	}
	.music_list li {
		line-height: 32px;
		background: #fff;
	}
	.music_list li:hover {
		background: rgba(8,161,239,1)!important;
		color: #fff!important;
		cursor: pointer;
	}
	.music_list li:hover p {
		color: #fff!important;
	}
	.music_list li:hover span {
		color: #fff!important;
	}
	.music_list li:hover a {
		color: #fff!important;
	}
	.music_list li:nth-child(even) {
		background: #fff;
	}
	.music_list li:nth-child(odd) {
		background: rgba(245,245,245,1);
	}
	.music_list li>p {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		color: #76838f;
		margin-left: 10px;
	}
	.music_list li>span {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		color: #ccc;
		float: right;
		margin-right: 10px;
	}
	.music_list li>a {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		color: rgba(8,161,239,1);
		float: right;
		margin-right: 10px;
	}
	.music_list li>a:hover {
		text-decoration: underline;
	}
</style>