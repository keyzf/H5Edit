<template>
	<div class="head_con">
		<a href="javascript:void(0)" v-link="{path: '/list'}" class="item left">H5 Edit</a>
		<div class="item center" v-show="page == 'edit'">
			<ul class="create_group">
				<li @click="addText"><div class="icon icon1"></div><span>文本</span></li>
				<li @click="$dispatch('add-pic')"><div class="icon icon2"></div><span>图片</span></li>
				<li @click="$dispatch('change-bg')"><div class="icon icon3"></div><span>背景</span></li>
				<li @click="$dispatch('set-bgmusic')"><div class="icon icon6"></div><span>音乐</span></li>
			</ul>
		</div>
		<div class="item right">
			<ul class="btn_group">
				<li v-show="page == 'edit'" @click="save()">保存</li>
				<li v-show="page == 'edit'" @click.stop="preview($event)">
					预览
					<div class="qrcode hide">
						<div class="triangle"></div>
						<a v-qrcode="'http://'+ host + '/show/' + this.$route.params.id" :href="'http://'+ host + '/show/' + this.$route.params.id" target="_blank"></a>
						<div class="tips">点击或扫描二维码预览</div>
					</div>
				</li>
				<li v-show="page == 'edit'" @click="showSet = !showSet">设置</li>
				<li @click="logout()" style="background: #ff5151;">退出</li>
			</ul>
		</div>
	</div>
</template>
<script>
	var actions = require('../../vuex/action');
	module.exports = {
		data: function(){
			return {
				page : this.$route.path.split('/')[1],
				host: location.host
			}
		},
		props: ['showSet'],
		vuex: {
			getters: {
				mainCode: function(state){
					return state.workData.mainCode;
				}
			},
			actions: {
				addText: actions.addText,
				alert: actions.alert
			}
		},
		methods:{
			logout: function(){
				var self = this;
				$.ajax({
					url: '/api/user/logout',
					type: 'get',
					success: function(){
						self.$route.router.go('/');
					}
				})
			},
			save: function(){
				var self = this;
				$.ajax({
					url: '/api/work/save',
					type: 'get',
					data: {
						_id: self.$route.params.id,
						mainCode: JSON.stringify(self.mainCode)
					},
					success: function(data){
						localStorage.removeItem(self.$route.params.id);
						self.alert({
							show: true,
							msg: '保存成功',
							type: 'success'
						});
					}
				});
			},
			preview: function(ev){
				if($(ev.target).find('.qrcode').hasClass('hide')){
					$(ev.target).find('.qrcode').fadeIn('fast');
					$(ev.target).find('.qrcode').removeClass('hide');
				}else{
					$(ev.target).find('.qrcode').fadeOut('fast')
					$(ev.target).find('.qrcode').addClass('hide');
				}
			}
		}
	};
</script>
<style>
	.head_con {
		width: 100%;
		height: 60px;
		background: #31364a;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.head_con .item {
		color: #fff;
		line-height: 60px;
		font-size: 12px;
		text-decoration: none;
	}
	.item li{
		display: inline-block;
		vertical-align: top;
	}
	.item.left {
		margin-left: 20px;
		font-size: 22px;
	}
	.item.center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}
	.create_group {
		font-size: 0;
	}
	.create_group li {
		font-size: 12px;
		cursor: pointer;
		transition: all ease 0.2s;
		-webkit-transition: all ease 0.2s;
		width: 50px;
		padding: 0 5px;
		display: inline-block;
		vertical-align: middle;
	}
	.create_group li:hover {
		background: #484d64;
	}
	.create_group li span {
		display: block;
		text-align: center;
		line-height: 22px;
	}
	.create_group .icon {
		background-image: url('../../assets/img/icon.png');
		width: 30px;
		height: 30px;
		margin: 0 auto;
	}
	.create_group .icon1 {
		background-position: 0 0;
	}
	.create_group .icon2 {
		background-position: 0 -30px;
	}
	.create_group .icon3 {
		background-position: 0 -150px;
	}
	.create_group .icon4 {
		background-position: 0 -60px;
	}
	.create_group .icon5 {
		background-position: 0 -90px;
	}
	.create_group .icon6 {
		background-position: 0 -120px;
	}
	.btn_group {
		margin: 0 17px 0 0;
	}
	.btn_group li {
		background: #76838e;
		height: 28px;
		line-height: 28px;
		margin: 16px 3px 0;
		padding: 0 10px;
		border-radius: 6px;
		cursor: pointer;
		transition: all ease 0.3s;
		-webkit-transition: all ease 0.3s;
		position: relative;
	}
	.btn_group li:hover {
		background: #01d7b2!important;
	}
	.btn_group .qrcode {
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		background: #fff;
		padding: 10px;
		top: 45px;
		display: none;
		border-radius: 6px;
	}
	.btn_group .triangle {
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: 10px solid #fff;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid transparent;
		top: -20px;
		left: 50%;
		margin-left: -10px;
	}
	.btn_group .qrcode a {
		display: block;
		width: 198px;
		height: 198px;
	}
	.btn_group .qrcode .tips {
		color: #76838e;
		text-align: center;
		font-size: 12px;
		line-height: 12px;
		margin-top: 5px;
	}
</style>