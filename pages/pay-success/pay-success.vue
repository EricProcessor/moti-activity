<template>
	<view class="pay-success">
		<view class="space-height">

		</view>
		<view class="pay-tips">
			<view class="pay-status">
				<image src="../../static/image/duihao.png" mode=""></image>
			</view>
			<view class="pay-msg">
				{{payMessage}}
			</view>
			<view class="pay-amount">
				{{amount}}元
			</view>
			<!-- <view class="pay-note">
				客服将会联系您，请注意接听电话
			</view> -->
			<view class="buttons">
				<button class="back-home btn" @click="linkTo('index')">返回首页</button>
				<button class="order-list btn" @click="linkTo('order')">查看订单</button>
			</view>
		</view>
		<view class="space-height">

		</view>
		<view class="moti-services">
			<image src="../../static/image/pay-success.png" mode="widthFix"></image>
			<button class="right-feel" @click="linkTo('daojiac')">立即体验</button>
		</view>
	</view>
</template>

<script>
	import {
		orderSource,
		daojiaUrl
	} from '../../common/unils.js'
	export default {
		data() {
			return {
				amount: "",
				payType: ""
			};
		},
		computed: {
			payMessage() {
				if (this.payType == 'arrive_pay') return "预定成功"
				return "支付成功"
			}
		},
		methods: {
			linkTo(type) {
				if(type == 'order') return uni.navigateTo({
					url: '/pages/my-order/my-order',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				if(type == 'index') return uni.navigateTo({
					url: '/?type=' + uni.getStorageSync("optionsType"),
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
				if(type == 'daojiac') {
					this.MonitorEvent("immediate_experience")
					setTimeout(()=>{
						location.href = daojiaUrl()
					},100)					
				}
			}
		},
		onLoad(options) {
			this.amount = options.amount
			this.payType = options.payType
			this.MonitorPV()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.pay-success {

		.space-height {
			height: 20upx;
			background-color: #f5f5f5;
		}

		.pay-tips {

			background-color: #ffffff;

			display: flex;
			flex-direction: column;
			text-align: center;
			padding: 43upx 0 40upx 0;

			.pay-status {
				height: 111upx;

				image {
					width: 111upx;
					height: 111upx;
				}
			}

			.pay-msg {
				margin-top: 25upx;
				color: #333333;
				font-size: 32upx;
				font-weight: bold;
			}

			.pay-amount {
				font-size: 48upx;
				color: #FA4650;
				height: 67upx;
				line-height: 67upx;
				margin-top: 7upx;
			}

			.pay-note {
				font-size: 22upx;
				color: #999999;
			}

			.buttons {
				margin-top: 20upx;
				
				display: flex;
				padding: 0 40upx;

				.btn {
					width: 328upx;
					height: 80upx;
					line-height: 80upx;
					border-radius: 8upx;
					font-size: 28upx;
					
				}
				.back-home{
					background:rgba(153,153,153,0.05);
				
					color: #333333;
				}
				.order-list{
					background-color: #FF4A65;
					color: #FFFFFF;
					border: none;
				}
			}

		}

		.moti-services {
			position: relative;

			image {
				width: 750upx;

			}

			.right-feel {
				position: absolute;
				bottom: 24upx;
				width: 654upx;
				height: 80upx;
				background: rgba(255, 74, 101, 1);
				border-radius: 8upx;
				color: #ffffff;
				line-height: 80upx;
				right: 0;
				left: 0;
				font-size: 28upx;
			}
		}
	}
</style>
