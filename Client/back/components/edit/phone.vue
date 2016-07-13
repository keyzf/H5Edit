<template>
	<div class="phone_con">
        <div class="phone_title">{{title}}</div>
        <div class="phone_screen j_screen" :style="currentPageMain.background | FormatBg" :class="{'grid_bg': bgGridStatus}">
            <div v-for="item in currentPageData.items" track-by="$index" :id="item.id" :class="['item_wrapper', item.class]" :style="item.style" :title="'ID : '+item.id" :attr="item.attr | json" :type="item.type" :index="$index" @mousedown="selectItemOp($index, $event);">
                <div class="content">{{{item.content}}}</div>
                <div class="edit_mode_cont" v-show="checkedItems.indexOf($index) != -1">
                    <div class="edit_mode_layer">
                        <div class="edit_mode edit_mode_radius_t_l"></div>
                        <div class="edit_mode edit_mode_radius_t_m"></div>
                        <div class="edit_mode edit_mode_radius_t_r"></div>
                        <div class="edit_mode edit_mode_radius_m_r"></div>
                        <div class="edit_mode edit_mode_radius_b_r"></div>
                        <div class="edit_mode edit_mode_radius_b_m"></div>
                        <div class="edit_mode edit_mode_radius_b_l"></div>
                        <div class="edit_mode edit_mode_radius_m_l"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ul id="item_context_menu" class="context_menu" style="display: none;">
        <li @click="delItem()">删除</li>
    </ul>
</template>
<script>
	var actions = require('../../vuex/action');
	require('../../assets/vendor/jquery-popline.js');
	module.exports = {
		props: ['bgGridStatus'],
		vuex: {
			getters: {
				title: function(state) {
					return state.workData.title;
				},
				alertObj: function(state) {
					return state.alertObj;
				},
				currentPageData: function(state) {
					return state.workData.mainCode.pages[state.currentPage - 1];
				},
				currentPageMain: function(state) {
					return state.workData.mainCode.pages[state.currentPage - 1].main;
				},
				checkedItems: function(state) {
					return state.checkedItems;
				}
			},
			actions: {
				alert: actions.alert,
				selectItem: actions.selectItem,
				delItem: actions.delItem,
				clearCheckedItems: actions.clearCheckedItems,
				setStyle: actions.setStyle,
				changeText: actions.changeText
			}
		},
		ready: function(){
			var self = this;
			// 点击其它地方隐藏元素属性
			$(document).bind('click',function(ev){
				var obj = $(ev.target);
				if (obj.parents('.j_screen').length === 0 && obj.parents('.pages_con').length === 0 && obj.parents('.side_con').length === 0 && obj.parents('.tool_bar').length === 0 && obj.parents('.popline').length === 0 && obj.parents('.head_con').length === 0 && obj.parents('.context_menu').length === 0 && obj.parents('li').find('.group_head').length === 0) {
					self.clearCheckedItems();
				}
			});
			//改变大小
			$('.phone_screen').on('mousedown', '.edit_mode', function(ev) {
					var target = $(this).closest('.item_wrapper')[0];

					var conWidth = parseFloat($('.j_screen').css('width'));
					var conHeight = parseFloat($('.j_screen').css('height'));

					var preClientX = ev.clientX;
					var preClientY = ev.clientY;

					var itemWidth = parseFloat($(target).width());
					var itemHeight = parseFloat($(target).height());

					var itemLeft = itemLeft ? itemLeft : parseFloat($(target).css('left'));
					var itemTop = itemTop ? itemTop : parseFloat($(target).css('top'));

					var btnIndex = $(this).index();

					$(window).bind('mousemove', function(ev) {
						var difX = ev.clientX - preClientX;
						var difY = ev.clientY - preClientY;

						var styleParams = {};
						switch (btnIndex) {
							case 0:
								if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
									if (ev.shiftKey) {
										styleParams = {
											width: (itemWidth - difX) + 'px',
											height: (itemHeight / itemWidth * (itemWidth - difX))  + 'px',
											left: (itemLeft + difX) + 'px',
											top: (itemTop + itemHeight / itemWidth * difX) + 'px'
										};
									} else {
										styleParams = {
											width: (itemWidth - difX) + 'px',
											height: (itemHeight - difY) + 'px',
											left: (itemLeft + difX) + 'px',
											top: (itemTop + difY) + 'px'
										};
									}
								}
								break;
							case 1:
								if ((itemHeight - difY) > 3) {
									styleParams = {
										height: (itemHeight - difY) + 'px',
										top: (itemTop + difY) + 'px'
									};
								}
								break;
							case 2:
								if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
									if (ev.shiftKey) {
										styleParams = {
											width: (itemWidth + difX) + 'px',
											height: (itemHeight / itemWidth * (itemWidth + difX)) + 'px',
											top: (itemTop - (itemHeight / itemWidth * difX)) + 'px'
										};
									} else {
										styleParams = {
											width: (itemWidth + difX) + 'px',
											height: (itemHeight - difY) + 'px',
											top: (itemTop + difY) + 'px'
										};
									}
								}
								break;
							case 3:
								if ((itemWidth - difX) > 3) {
									styleParams = {
										width: (itemWidth + difX) + 'px'
									}
								}
								break;
							case 4:
								if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
									if (ev.shiftKey) {
										styleParams = {
											width: (itemWidth + difX) + 'px',
											height: (itemHeight / itemWidth * (itemWidth + difX)) + 'px'
										};
									} else {
										styleParams = {
											width: (itemWidth + difX) + 'px',
											height: (itemHeight + difY) + 'px'
										};
									}
								}
								break;
							case 5:
								if ((itemHeight - difY) > 3) {
									styleParams = {
										height: (itemHeight + difY) + 'px'
									};
								}
								break;
							case 6:
								if ((itemWidth - difX) > 3 && (itemHeight - difY) > 3) {
									if (ev.shiftKey) {
										styleParams = {
											width: (itemWidth - difX) + 'px',
											height: (itemHeight / itemWidth * (itemWidth - difX)) + 'px',
											left: (itemLeft + difX) + 'px'
										};
									} else {
										styleParams = {
											width: (itemWidth - difX) + 'px',
											height: (itemHeight + difY) + 'px',
											left: (itemLeft + difX) + 'px'
										};
									}
								}
								break;
							case 7:
								if ((itemWidth - difX) > 3) {
									styleParams = {
										width: (itemWidth - difX) + 'px',
										left: (itemLeft + difX) + 'px'
									};
								}
								break;
						}
						self.setStyle(self.checkedItems[0], styleParams);
					});
					$(window).bind('mouseup', function() {
						$(window).unbind('mousemove');
						$(window).unbind('mouseup');
					});
			});
			//右键菜单
			var eleId = '#item_context_menu';
			$(window).bind('click', function(ev) {
				var obj = $(ev.target);
				if (obj.parents(eleId).length === 0) {
					$(eleId).fadeOut('fast');
				}
			})
			$('.phone_screen').on('contextmenu', '.item_wrapper', function(ev) {
				ev.preventDefault();
				var obj = $(eleId);
				var clientX = ev.clientX;
				var clientY = ev.clientY;
				obj.css({
					left: clientX + 10 + 'px',
					top: clientY + 10 + 'px',
					display: 'block'
				});
				$(eleId).bind('mouseleave', function() {
					$(eleId).fadeOut('fast');
				});
				$(eleId).bind('click', function() {
					$(eleId).fadeOut('fast');
				});
				return false;
			});
			//拖拽
			$('body').on('mousedown','.j_screen>div .content',function(ev) {
				if($('.j_screen>div').eq(self.checkedItems[0]).find('.content>div').attr('contenteditable') === 'true'){
					return;
				}

				var conWidth = parseFloat($('.j_screen').css('width'));
				var conHeight = parseFloat($('.j_screen').css('height'));

				var preClientX = ev.clientX;
				var preClientY = ev.clientY;

				var itemLeft = {},
				itemTop = {};

				$(window).bind('mousemove', function(ev) {
					for (var i = 0; i < self.checkedItems.length; i++) {

						var obj = $('.j_screen').children().eq(self.checkedItems[i]);

						itemLeft[i] = itemLeft[i] ? itemLeft[i] : (isNaN(parseFloat(obj.css('left'))) ? 0 :parseFloat(obj.css('left')));
						itemTop[i] = itemTop[i] ? itemTop[i] : (isNaN(parseFloat(obj.css('top'))) ? 0 :parseFloat(obj.css('top')));

						var difX = ev.clientX - preClientX;
						var difY = ev.clientY - preClientY;

						var x = difX + itemLeft[i];
						var y = difY + itemTop[i];

						var alertMsg = {
							show: true,
							msg: '超出屏幕外的元素将不可见',
							type: 'warning'
						}

						if (x < 0 || y < 0 || parseFloat(obj.outerWidth()) + parseFloat(obj.css('left')) > conWidth || parseFloat(obj.outerHeight()) + parseFloat(obj.css('top')) > conHeight) {
							if (!self.alertObj.show) {
								self.alert(alertMsg);
							}
						}
						self.setStyle(self.checkedItems[i], {
							left: x + 'px',
							top: y + 'px'
						})
					}
					return false;
				});
				$(window).bind('mouseup', function() {
					$(window).unbind('mousemove');
					$(window).unbind('mouseup');
				});
			});
			//键盘响应
			var moveItem = function(direction) {
				for (var i = 0; i < self.checkedItems.length; i++) {
					var obj = $('.j_screen>div').eq(self.checkedItems[i]);
					var objLeft = parseFloat(obj.css('left'));
					var objTop = parseFloat(obj.css('top'));
					var cssObj = {};
					switch (direction) {
						case 'top':
							cssObj.top = objTop - 1 + 'px';
							break;
						case 'right':
							cssObj.left = objLeft + 1 + 'px';
							break;
						case 'left':
							cssObj.left = objLeft - 1 + 'px';
							break;
						case 'down':
							cssObj.top = objTop + 1 + 'px';
							break;
					}
					self.setStyle(self.checkedItems[i], cssObj)
				}
			};

			var delItem = function() {
				self.delItem();
			};
			var copyItem = function() {

			};
			var paste = function() {

			};
			$(window).keydown(function(ev) {
				var preventKeyboard = !self.checkedItems.length || $('.j_screen>div').eq(self.checkedItems[0]).find('.content>div').attr('contenteditable') === 'true' || $('input:focus').length;
				if(preventKeyboard){
					return;
				}
				var keyCode = event.keyCode;
				if (keyCode === 38) { // 上
					moveItem('top');
					return false;
				} else if (keyCode === 40) { // 下
					moveItem('down');
					return false;
				} else if (keyCode === 37) { // 左
					moveItem('left');
					return false;
				} else if (keyCode === 39) { // 右
					moveItem('right');
					return false;
				} else if ((keyCode === 8 || keyCode === 46)) { // 删除
					delItem();
					return false;
				} else if ((event.ctrlKey || event.metaKey) && keyCode === 67) { // 复制
					console.log('copy');
					return false;
				} else if ((event.ctrlKey || event.metaKey) && keyCode === 86) { // 粘贴
					console.log('paste');
					return false;
				} else if ((event.ctrlKey || event.metaKey) && keyCode === 65) { // 全选
					console.log('selectall');
					return false;
				}
			});
			//编辑
			$('.phone_screen').on('dblclick', '.item_wrapper', function() {
				var $target = $(this);
				var itemIndex = self.checkedItems[0];
				if ($target.attr('type') !== 'txt') {
					return;
				}
				$target.find('.content>div').attr('contenteditable', true);
				$target.css('cursor', 'auto');
				$target.find('.content>div').popline({ position: 'fixed'});
				var obj = $target.find('.content>div')[0];
				window.getSelection().selectAllChildren(obj);

				$target.find('.content>div').bind('blur', function() {
					var html = $target.find('.content>div').html();
					// 修改数据|还原状态
					self.changeText(html, itemIndex);
					$target.find('.content>div').popline("destroy");
					$target.css('cursor', 'pointer');
					$target.find('.content>div').attr('contenteditable', false);
					$target.find('.content>div').unbind('blur');
				});
			})
		},
		methods: {
			selectItemOp: function(index, ev){
				// 防止多选移动的时候触发选中元素
				if(this.checkedItems.length > 1 && !ev.shiftKey && !ev.ctrlKey){
					return;
				}
				if(ev.shiftKey || ev.ctrlKey){
					this.selectItem(index, true);
				}else{
					this.selectItem(index);
				}
			}
		}
	};
</script>
<style>
	.phone_con {
		position: relative;
		margin: 90px auto 0;
		background-size: 100%;
		background-image: url('../../assets/img/phone.svg');
		background-repeat: no-repeat;
		width: 326px;
		height: 620px;
	}
	.phone_con .phone_title {
		position: absolute;
		top: 65px;
		width: 80%;
		left: 10%;
		text-align: center;
		color: #fff;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		height: 20px;
		font-size: 18px;
	}
	.phone_con .phone_screen {
		width: 320px;
		height: 486px;
		position: absolute;
		top: 97px;
		left: 3px;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.phone_con .phone_screen>div {
		cursor: pointer;
	}
	.phone_con .phone_screen>div .content {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.phone_screen.grid_bg:after {
		display: block;
		width: 100%;
		height: 100%;
		content: " ";
		background-image: url('../../assets/img/grid_bg.png');
		background-size: 320px 486px;
		opacity: 0.5;
	}
	.content p, .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
		display: inline;
		font-weight: normal;
	}
	.content h1 {
		font-size: 2em;
	}
	.content h2 {
		font-size: 1.5em;
	}
	.content h3 {
		font-size: 1.17em;
	}
	.content h4 {
		font-size: 1em;
	}
	.content h5 {
		font-size: 0.83em;
	}
	.content h6 {
		font-size: 0.67em;
	}
	.edit_mode_cont {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		-webkit-user-select: none;
		-webkit-user-drag: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		border: 1px dashed #585858;
	}
	.edit_mode_layer {
		position: relative;
		z-index: 800;
		-webkit-user-select: none;
		-webkit-user-drag: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		width: 100%;
		height: 100%;
	}
	.edit_mode_layer>div {
		position: absolute;
		width: 10px;
		height: 10px;
		background: #fff;
		border: 1px solid #585858;
		z-index: 888;
		box-sizing: border-box;
	}
	.edit_mode_radius_t_l {
		cursor: nw-resize;
		left: -8px;
		top: -8px;
		border-radius: 50%;
	}
	.edit_mode_radius_t_m {
		cursor: n-resize;
		left: 50%;
		margin-left: -6px;
		top: -8px;
	}
	.edit_mode_radius_t_r {
		cursor: ne-resize;
		right: -8px;
		top: -8px;
		border-radius: 50%;
	}
	.edit_mode_radius_m_r {
		cursor: e-resize;
		top: 50%;
		margin-top: -6px;
		right: -8px;
	}
	.edit_mode_radius_b_r {
		cursor: se-resize;
		right: -8px;
		bottom: -8px;
		border-radius: 50%;
	}
	.edit_mode_radius_b_m {
		cursor: s-resize;
		left: 50%;
		margin-left: -6px;
		bottom: -8px;
	}
	.edit_mode_radius_b_l {
		cursor: sw-resize;
		bottom: -8px;
		left: -8px;
		border-radius: 50%;
	}
	.edit_mode_radius_m_l {
		cursor: e-resize;
		top: 50%;
		margin-top: -6px;
		left: -8px;
	}
</style>