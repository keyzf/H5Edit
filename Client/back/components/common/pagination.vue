<template>
	<div class="page-list">
		<ul class="pagination" v-show="paginationConf.totalItems > 0">
			<li :class="{disabled: paginationConf.currentPage == 1}" @click="changeCurrentPage(1)"><span>首页</span></li>
			<li :class="{disabled: paginationConf.currentPage == 1}" @click="prevPage()"><span>&lt</span></li>
			<li v-for="item in pageList" track-by="$index" :class="{active: item == paginationConf.currentPage}" @click="changeCurrentPage(item)"><span>{{item}}</span></li>
			<li :class="{disabled: paginationConf.currentPage == paginationConf.numberOfPages}" @click="nextPage()"><span>&gt</span></li>
			<li :class="{disabled: paginationConf.currentPage == paginationConf.numberOfPages}" @click="changeCurrentPage(paginationConf.numberOfPages)"><span>末页</span></li>
		</ul>
	</div>
</template>
<script>
/*
vm.$data.paginationConf = {
	currentPage: 1,     // 当前页
	totalItems: 30,     // 总条数
	itemsPerPage: 4,    // 每页条数
	pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
	onChange: function() {
		// 回调
	}
};
*/
module.exports = {
	data: function(){
		return {
			pageList: []
		}
	},
	created: function(){
		var self = this;
		this.paginationConf.pagesLength = parseInt(this.paginationConf.pagesLength) ? parseInt(this.paginationConf.pagesLength) : 9;
		if (this.paginationConf.pagesLength % 2 === 0) {
			this.paginationConf.pagesLength = this.paginationConf.pagesLength - 1;
		}
		if (!this.paginationConf.perPageOptions) {
			this.paginationConf.perPageOptions = [10, 15, 20, 30, 50];
		}
		if(this.paginationConf.totalItems){
			this.getPagination();
		}
	},
	props:['paginationConf'],
	methods: {
		changeCurrentPage: function(item) {
			this.paginationConf.currentPage = item;
		},
		prevPage: function() {
			if (this.paginationConf.currentPage > 1) {
				this.paginationConf.currentPage -= 1;
			}
		},
		nextPage: function() {
			if (this.paginationConf.currentPage < this.paginationConf.numberOfPages) {
				this.paginationConf.currentPage += 1;
			}
		},
		getPagination: function(newValue, oldValue) {
			var self = this;
			self.paginationConf.currentPage = parseInt(self.paginationConf.currentPage) ? parseInt(self.paginationConf.currentPage) : 1;
			self.paginationConf.totalItems = parseInt(self.paginationConf.totalItems) ? parseInt(self.paginationConf.totalItems) : 0;
			self.paginationConf.itemsPerPage = parseInt(self.paginationConf.itemsPerPage) ? parseInt(self.paginationConf.itemsPerPage) : 8;
			self.paginationConf.numberOfPages = Math.ceil(self.paginationConf.totalItems / self.paginationConf.itemsPerPage);
			if (self.paginationConf.currentPage < 1) {
				self.paginationConf.currentPage = 1;
			}
			if (self.paginationConf.numberOfPages > 0 && self.paginationConf.currentPage > self.paginationConf.numberOfPages) {
				self.paginationConf.currentPage = self.paginationConf.numberOfPages;
			}
			self.pageList = [];
			if (self.paginationConf.numberOfPages <= self.paginationConf.pagesLength) {
				for (var i = 1; i <= self.paginationConf.numberOfPages; i++) {
					self.pageList.push(i);
				}
			} else {
				var offset = (self.paginationConf.pagesLength + 1) / 2;
				if (self.paginationConf.currentPage <= offset) {
					for (var i = 1; i <= self.paginationConf.pagesLength; i++) {
						self.pageList.push(i);
					}
				} else if (self.paginationConf.currentPage > self.paginationConf.numberOfPages - offset) {
					for (var i = self.paginationConf.pagesLength - 1; i > 0; i--) {
						self.pageList.push(self.paginationConf.numberOfPages - i);
					}
					self.pageList.push(self.paginationConf.numberOfPages)
				} else {
					for (var i = Math.ceil(self.paginationConf.pagesLength / 2); i > 1; i--) {
						self.pageList.push(self.paginationConf.currentPage - i + 1);
					}
					self.pageList.push(self.paginationConf.currentPage);
					for (var i = 1; i < Math.ceil(self.paginationConf.pagesLength / 2); i++) {
						self.pageList.push(self.paginationConf.currentPage + i);
					}
				}
			}
		}
	},
	watch: {
		'paginationConf': {
			handler: function(val){
				this.getPagination();
			},
			deep: true
		},
		'paginationConf.currentPage': {
			handler: function(val){
				this.paginationConf.onChange();
			}
		}
	}
};
</script>
<style>
	.page-list {
		font-size: 0;
		color: #333;
		text-align: center;
		margin-bottom: 20px;
		margin-top: 10px;
	}
	.page-list .pagination {
		font-size: 0;
		display: inline-block;
		vertical-align: middle;
		*display: inline;
		*zoom: 1;
	}
	.page-list .pagination li {
		display: inline-block;
		vertical-align: middle;
		font-size: 14px;
		text-align: center;
		border: 1px solid #ddd;
		margin: 0 5px;
		cursor: pointer;
		background: #fff;
		transition: all ease 0.3s;
		-webkit-transition: all ease 0.3s;
		-o-transition: all ease 0.3s;
		-moz-transition: all ease 0.3s;
	}
	.page-list .pagination li:hover {
		background: #01d7b2;
		color: #fff;
		border: 1px solid #01d7b2;
	}
	.page-list .pagination li:active {
		background: #006b59;
		color: #fff;border: 1px solid #006b59;
	}
	.page-list .pagination .active {
		border: 1px solid #01d7b2;
		background: #01d7b2;
		color: #fff;
	}
	.page-list .pagination .disabled {
		color: #aaa;
		cursor: not-allowed;
	}
	.page-list .pagination .disabled:hover {
		border: 1px solid #ddd;
		background: #fff;
		color: #aaa;
	}
	.page-list .pagination span {
		display: block;
		padding: 5px 10px;
	}
	.page-list .page-total {
		display: inline-block;
		vertical-align: middle;
		*display: inline;
		*zoom: 1;
		font-size: 14px;
	}
	.page-list .page-total input {
		height: 24px;
		border: 1px solid #ddd;
		width: 32px;
		text-align: center;
		margin-right: 5px;
	}
	.page-list .page-total span {
		cursor: pointer;
		padding: 5px 10px;
		transition: all ease 0.3s;
		-webkit-transition: all ease 0.3s;
		-o-transition: all ease 0.3s;
		-moz-transition: all ease 0.3s;
	}
	.page-list .page-total span:hover {
		color: #01d7b2;
	}
	.page-list .page-total strong {
		font-size: 14px;
		font-weight: bold;
	}
</style>