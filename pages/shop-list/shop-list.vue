<template>
	<view class="shop-list-box">
		<view class="content-box">
			<view class="content" v-if="shopList.length > 0">
				<view class="item">
					<view class="id">编号</view>
					<view class="name">门店名称</view>
					<view class="link"></view>
				</view>
				<view class="item" v-for="(item, index) in shopList" :key="index">
					<view class="id">{{index+1}}</view>
					<view class="name">{{item.shopName}}</view>
					<view class="link" @tap="showDetail(index)">查看门店详情</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="add" @tap="add">新增门店</view>
			<view class="back" @tap="back">返回代理商列表</view>
		</view>
		
		
		<uni-popup :show="showSelectShop" position="middle" type="center" mode="fixed" :h5Top="h5Top" @hidePopup="hidePopup">
			<view class="shop-detail">
				<view class="close-pop" @tap="hidePopup"></view>
				<view class="item">
					<view class="title">代理商名称:</view>
					<view class="detail">{{agentName}}</view>
				</view>
				<view class="item">
					<view class="title">门店名称:</view>
					<view class="detail">{{currentData.shopName}}</view>
				</view>
				<view class="item">
					<view class="title">门店地址:</view>
					<view class="detail">{{currentData.shopAddress}}</view>
				</view>
				<view class="item">
					<view class="title">门店电话:</view>
					<view class="detail">
						<a :href="'tel:'+currentData.mobile">{{currentData.mobile}}</a>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import { shops } from "../../common/js/interface/register.js"
	export default {
		data() {
			return {
				agentId: '',
				agentName: '',
				showSelectShop: false,
				h5Top: true,
				shopList: [],
				currentData: {}
			};
		},
		methods: {
			hidePopup(){
				this.showSelectShop = false;
			},
			showDetail(index){
				this.currentData = this.shopList[index];
				this.showSelectShop = true;
			},
			add(){
				uni.navigateTo({
					url: '/pages/add-shop/add-shop?agentId=' + this.agentId + '&agentName=' + this.agentName
				});
			},
			back(){
				uni.navigateTo({
					url: '/pages/agent-list/agent-list'
				});
			},
			async getShopList() {
				let res = await shops({
					operatorId: this.agentId
				})
				if (res.code === '0') {
					this.shopList.push(...res.result)
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			},
		},
		onLoad(option) {
			this.agentId = option.agentId;
			this.agentName = option.agentName;
			this.getShopList();
		},
		components: {
			uniPopup
		},
	}
</script>

<style lang="scss" scoped>
.shop-list-box {
	position: relative;
	.content-box {
		padding: 30upx 30upx 110upx 30upx;
		.content {
			border: 2upx solid #999999;
			border-bottom: 0;
			border-radius: 8upx;
			.item {
				font-size: 28upx;
				color: #333333;
				text-align: center;
				display: flex;
				.id {
					width: 68upx;
					padding: 10upx;
					border-right: 2upx solid #999999;
					border-bottom: 2upx solid #999999;
				}
				.name {
					flex: 1;
					padding: 10upx;
					text-align: left;
					border-right: 2upx solid #999999;
					border-bottom: 2upx solid #999999;
				}
				.link {
					color: #42b983;
					text-decoration: underline;
					width: 170upx;
					padding: 10upx;
					border-bottom: 2upx solid #999999;
				}
			}
		}
	}
	.shop-detail {
		position: relative;
		width: 630upx;
		height: auto;
		.close-pop {
			width: 30upx;
			height: 30upx;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA40lEQVQ4T7WU0RHCIAyG/0xg3cQRdAIdwRF8CjPAFHUDN9ARHKVOgEePehRD4HptXxu++5L8QFj5o5V52BZore2J6AzgxMxvzd45dwDwBHBn5ttUOzO01g5EtAMwaNAE1nnvP8aYTgSGQu/9S4PmMCI6pt38zVCD1mDBUlyKBI0thZmNbeZmYsvpEgRo+K3CioYTOINCM6sahoJ0ZvGAun3VMF/AWNwQqeJSYmh/MwvAWqREQy0aLTmdGbbkrAYVr15tmzmUmfelu9wDuJRCK+UUwMMYc22KzZK3ctv3cIlRfuYLsVzDFRpVIzsAAAAASUVORK5CYII=);
			background-size: contain;
			background-repeat: no-repeat;
			position: absolute;
			top: 0;
			right: 0;
		}
		.item {
			display: flex;
			padding: 10upx 0;
			.title {
				width: 160upx;
				height: 80upx;
				margin-right: 10upx;
				font-size: 28upx;
				line-height: 80upx;
				color: #333333;
				text-align: right;
			}
			.detail {
				flex: 1;
				font-size: 28upx;
				line-height: 80upx;
				color: #333333;
				a {
					font-size: 28upx;
					line-height: 80upx;
					color: #333333;
					text-decoration: none;
				}
			}
		}
	}
	.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 710upx;
		height: 68upx;
		border-top: 2upx solid #F5F5F5;
		padding: 16upx 20upx;
		background: #FFFFFF;
		.add {
			width: 345upx;
			height: 68upx;
			line-height: 68upx;
			text-align: center;
			font-size: 24upx;
			font-weight: 400;
			border-radius: 6upx;
			background: #409eff;
			color: #FFFFFF;
			margin-right: 20upx;
		}
		.back {
			width: 345upx;
			height: 68upx;
			line-height: 68upx;
			text-align: center;
			font-size: 24upx;
			font-weight: 400;
			border-radius: 6upx;
			background: #c0c0c0;
			color: #FFFFFF;
		}
	}
}
</style>
