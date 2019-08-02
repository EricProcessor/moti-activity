<template>
	<view class="content" :style="{height:viewHeight}">
		<scroll-view :scroll-y="true" :style="{height:viewHeight}">
		<view class="header-title" v-if="0">订单详情</view>
		<view class="take-info">
			<view class="take-code">
				<text>取货码：</text>
				<text>{{orderDesc.getGoodsCode}}</text>
			</view>
			<view class="shop-address">
				<view class="shop-address-title shop-value">
					门店：
				</view>
				<view class="shop-value">
					{{shopInfo.shopName}}
				</view>
			</view>
			<view class="shop-address">
				<view class="shop-address-title shop-value">地址：</view>
				<view class="shop-value">{{shopInfo.shopAddress}}</view>
			</view>
			<view class="shop-address">
				<view class="shop-address-title shop-value">
					电话：
				</view>
				<view class="shop-value">
					{{shopInfo.mobile}}
				</view>
			</view>
		
		</view>



		<view class="order-group">
			<view class="order-title" v-if="orderDesc.details">商品信息</view>
			<view class="order-item"  :key="index" v-for="(item,index) in orderDesc.details" >
				<view class="item-left">
					<image :src="item.picduceUrl"></image>
					<view class="gift-tag" v-if="item.goodsPrice === 0">赠品</view>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						<view class="irt-left">
							{{item.goodsSpuName}}
						</view>
						<view class="irt-right">
							￥{{toDecimal2(item.goodsPrice)}}
						</view>
					</view>
					<view class="item-right-bottom">
						{{item.goodsSkuName}}
						<text>x{{item.goodsQuantity}}</text>
					</view>
				</view>
			</view>

		</view>
		<view class="payment">
			<view>支付方式</view>
			<view class="payment-method">线下支付</view>
		</view>
		<view class="user-group">
			<view class="ug-title">
				个人信息
			</view>
			<view class="user-param">
				性别：{{ userDetail.sex === '1' ? '男' : '女' }}
			</view>
			<view class="user-param">
				年龄：{{userDetail.age}}
			</view>
			<view class="user-param">
				电话：{{userDetail.phone}}
			</view>
		</view>
		</scroll-view>
		<view class="follow-wechat" @click="showShopQrcode = true">
			<view class="fw-descript">
				关注MOTI公众平台，获取更多优惠
			</view>
			<view class="fw-icon">
				<i class="right iconfont"></i>
			</view>
		</view>
		<uni-popup :show="showShopQrcode" type="middle" mode="fixed" :h5Top="h5Top">
			<view class="show-wechat-qrcode">
				<view class="swq-image">
					<image src="../../static/wechat-gzh.jpg" mode=""></image>
				</view>
				<view class="swq-title">
					关注MOTI
				</view>
				<view class="swq-title">
					获取更多优惠信息
				</view>
			</view>
			<view class="close-view" @click="showShopQrcode = false;">
				<image src="../../static/icon/close.png"></image>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import {orderDetail,getAttDetail,userInfo} from "../../common/js/interface/register.js"
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				shopInfo:{},
				orderDesc:{},
				userDetail:{},
				viewHeight:"100%",
				h5Top:true,
				showShopQrcode:false
			}
		},
		methods: {
		 	async shopDetail(){
				let res = await getAttDetail({
					shopId:uni.getStorageSync("customerShopId"),
					activityId:uni.getStorageSync("customerActivityId")
				})
				if(res.code === '0'){
					this.shopInfo = res.result ? res.result : {}
				}
			},
			async orderInfo(){
				let res = await orderDetail({
					hdShopAttDetailId:uni.getStorageSync("shopAttDetailId"),
					attUserId:uni.getStorageSync("attUserId")
				})
				
				if(res.code === '0'){
					this.orderDesc = res.result[0]
					this.getUserInfo(this.orderDesc.buyerPhone)
				}
			},
			async getUserInfo(mobile){
				let res = await userInfo({
					hdShopAttDetailId: uni.getStorageSync("shopAttDetailId"),
					phone:mobile
				})
				if(res.code === '0'){
					this.userDetail = res.result ? res.result : {}
				}
				
			},
			toDecimal2(x) {
				let f = parseFloat(x);
				if (isNaN(f)) {
					return false;
				}
				f = Math.round(x * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + 2) {
					s += '0';
				}
				return s;
			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			this.shopDetail()
			this.orderInfo()
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.viewHeight = (res.windowHeight - uni.upx2px(88)) + 'px'
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}

	.content {
		//height: 1208upx;
		//padding-bottom: 32upx;
		//padding: 0 32upx;
		//position: relative;
		.header-title {
			height: 52upx;
			width: 100%;
			height: 52upx;
			text-align: center;
			padding: 18upx 0;
			font-size: 37upx;
			font-weight: 600;
			background-color: #FFFFFF;
		}

		.take-info {
			background-color: #FFFFFF;
			padding: 24upx 32upx;
			margin-bottom: 24upx;

			.take-code {
				color: #FB6947;
				font-size: 36upx;
				height: 50upx;
				line-height: 50upx;
				margin-bottom: 24upx;
				font-weight: 600;
			}

			.shop-name {
				font-size: 24upx;
				line-height: 33upx;
				height: 33upx;
				color: #333333;
			}

			.shop-address {
				margin: 16upx 0;
				font-size: 24upx;
				display: flex;

				.shop-address-title {
					width: 87upx;
					line-height: 33upx;
					height: 33upx;
				}
			}

			.shop-value {
				display: inline-block;
				width: 610upx;
			}
		}


		.order-group {
			background-color: #FFFFFF;
			padding: 32upx 32upx;
			

			.order-title {
				font-size: 28upx;
				height: 40upx;
				line-height: 40upx;
				color: #333333;
				font-weight: PingFang-SC-Bold;

			}

			.order-item {
				padding: 32upx 0 24upx 0;
				display: flex;

				.item-left {
					width: 148upx;
					height: 148upx;
					display: inline-block;
					position: relative;

					image {
						width: 148upx;
						height: 148upx;
					}

					.gift-tag {
						position: absolute;
						bottom: 0;
						right: 0;
						height: 32upx;
						width: 64upx;
						background-color: #ff4e4e;
						color: #FFFFFF;
						font-size: 20upx;
						text-align: center;
						border-radius: 0 0 4upx 0;
					}

				}

				.item-right {
					padding: 14upx 0 19upx 24upx;
					display: inline-block;
					align-items: baseline;
					font-size: 24upx;
					color: #333333;

					.item-right-top {
						width: 100%;
						display: flex;

						.irt-left {
							width: 386upx;
							line-height: 33upx;
							height: 66upx;
						}

						.irt-right {
							width: 128upx;
							text-align: right;
							font-family: PingFang-SC-Bold;
						}
					}

					.item-right-bottom {
						margin-top: 19upx;
						color: #999999;
						height: 30upx;
						line-height: 30upx;
						position: relative;
						text {
							position: absolute;
							right: 0;
						}
					}

				}
			}
		}

		.payment {
			background-color: #FFFFFF;
			margin: 24upx 0;
			height: 96upx;
			padding: 0 32upx;
			line-height: 96upx;
			font-size: 28upx;
			display: flex;
			justify-content: space-between;
			font-family: PingFang-SC-Medium;
			color: #333333;

			.payment-method {
				color: #999999;
			}
		}

		.user-group {
			//margin-bottom: 96upx;
			:first-child {
				margin-bottom: 24upx;
			}

			background-color: #FFFFFF;
			padding: 32upx 32upx 23upx 32upx;

			.ug-title {
				line-height: 40upx;
				height: 40upx;
				font-size: 28upx;
				color: #333333;
				font-family: PingFang-SC-Bold;

			}

			.user-param {
				font-size: 24upx;
				height: 33upx;
				line-height: 33upx;
				color: #333333;
				margin-bottom: 16upx;
			}

			:last-child {
				margin-bottom: 0upx;
			}
		}
	
		.follow-wechat {
			background: #333333;
			opacity: 0.9;
			font-family: PingFang-SC-Bold;
			font-size: 28upx;
			color: #FFFFFF;
			letter-spacing: 0;
			padding: 27upx 32upx 29upx 32upx;
			display: flex;
			height: 96upx;
			box-sizing: border-box;
			justify-content: space-between;
			position: absolute;
			bottom: 3upx;
			width: 100%;
		
			i {
				font-size: 40upx;
			}
		}
		.show-wechat-qrcode{
			//width: 578upx;
			//height: 271upx;
			text-align: center;
			.swq-image{
				width:500upx;
				height: 500upx;
				margin-bottom: 32upx;
				margin-top: 32upx;
				image{
					width: 500upx;
					height: 500upx;
				}
			}
			.swq-title{
				font-weight: 600;
				font-size: 40upx;
				margin-bottom: 20upx;
			}
			
		}
	}
	.close-view {
		position: absolute;
		top: 33.2upx;
		right: 33.3upx;
		width: 30upx;
		height: 30upx;
	
		image {
			width: 25.5upx;
			height: 25.5upx;
		}
	
	}
	
</style>
