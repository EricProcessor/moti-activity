<template>
	<view class="order-dtail">
		<view class="order-header">
			<view class="order-header-title-en">
				<image src="../../static/images/icons/order-information.png" mode=""></image>
			</view>
			<view class="order-header-title-cn">
				订单详情
			</view>
		</view>
		<view class="order-body">
			<view class="order-body-title">
				收货信息
			</view>
			<view class="order-address">
				<view class="order-address-left">
					<image src="../../static/images/icons/locate.png" mode=""></image>
				</view>
				<view class="order-address-right">
					<view class="order-address-content">
						{{initData.receiveAddress}}
					</view>
					<view class="order-address-contact">
						<text>{{initData.userName}}&emsp; {{formatMobile(initData.mobile)}}</text>
					</view>
				</view>
			</view>
			<view class="order-goods">
				<view class="order-goods-title">
					商品信息
				</view>
				<view class="order-goods-group">

					<view class="good-item"  :key="index" v-for="(item,index) in initData.list">
						<view class="good-left">
							<image :src="item.src" mode=""></image>
						</view>
						<view class="good-right">
							<view class="good-right-title">
								{{item.title}}
							</view>
							<view class="good-right-spec">
								{{item.desc}}
							</view>
							<view class="good-right-price">
								<view class="price-left">
									￥<text>{{item.price}}</text>
								</view>
								<view class="price-right">
									×{{item.qty}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-goods-total">
					<view class="order-goods-under-line">

					</view>
					<view class="order-total-price">
						合计:<text>¥{{initData.totalPrice}}</text>
					</view>

				</view>
			</view>
			<view class="order-receive-info">
				<view class="order-rece-title">
					订单信息
				</view>

				<view class="order-receive-line">
					<view class="order-receive-item">
						<text class="ori-title">订单编号：</text>
						<text class="ori-content">{{initData.result.orderNo}}</text>
					</view>
					<view class="order-receive-item">
						<text class="ori-title">下单时间：</text>
						<text class="ori-content">{{initData.result.orderTime}}</text>
					</view>
					<view class="order-receive-item">
						<text class="ori-title">付款方式：</text>
						<text class="ori-content">{{initData.result.paymentType}}</text>
					</view>
					<view class="order-receive-item">
						<text class="ori-title">配送信息：</text>
						<text class="ori-content">{{initData.result.deliveryInfo}}</text>
					</view>
					<view class="order-receive-item">
						<text class="ori-title">订单备注：</text>
						<text class="ori-content">{{initData.result.remark || "未填写"}}</text>
					</view>
				</view>
			</view>
			<view class="order-again">
				<button @click="$emit('againBuy')" >再来一单</button>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			initData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods:{
			formatMobile(mobile){
			  return	mobile.substr(0, 3) + '****' + mobile.substr(7, 11);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-dtail {
		padding: 0 40upx;
		letter-spacing: 2upx;
		background-color: #FFFFFF;

		.order-header {
			text-align: center;
			width: 100%;

			.order-header-title-en {
				width: 526upx;
				height: 32upx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;

				}
			}

			.order-header-title-cn {
				font-size: 55upx;
				font-weight: bold;
			}
		}

		.order-body {
			margin-top: 80upx;

			.order-body-title {
				font-size: 34upx;
				font-weight: bold;
				height: 63upx;
				border-bottom: 1upx solid #eeeeee;
			}

			.order-address {
				display: flex;
				margin-top: 42upx;
				align-items: center;
				margin-bottom: 60upx;

				.order-address-left {
					width: 56upx;
					height: 56upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.order-address-right {
					margin-left: 29upx;

					.order-address-content {
						font-size: 34upx;
						color: #333333;
						margin-bottom: 15upx;
					}

					.order-address-contact {
						font-size: 26upx;
						color: #999999;
					}
				}

			}

			.order-goods {
				.order-goods-title {
					height: 63upx;
					font-size: 39upx;
					font-weight: bold;

					border-bottom: 1upx solid #eeeeee;
				}

				.order-goods-group {
					.good-item {
						display: flex;
						margin-top: 40upx;
						position: relative;

						.good-left {
							width: 120upx;
							height: 120upx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.good-right {
							font-size: 28upx;
							margin-left: 25upx;

							.good-right-title {
								color: #333333;
								font-weight: bold;
							}

							.good-right-spec {
								color: #999999;
							}

							.good-right-price {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.price-left {
									color: #ff4d3d;
									font-size: 26.6upx;

									text {
										font-size: 40upx;
										font-weight: bold;
									}
								}

								.price-right {
									font-size: 26upx;
									color: #999999;
									position: absolute;
									right: 0;
								}

							}
						}
					}
				}

				.order-goods-total {
					margin-top: 40upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-goods-under-line {
						width: 433upx;
						border-bottom: 1upx solid #eeeeee;
					}

					.order-total-price {
						font-size: 26.6upx;

						text {
							color: #ff4d3d;
						}
					}
				}

			}

			.order-receive-info {
				margin-top: 60upx;
				padding-bottom: 140upx;

				.order-rece-title {
					height: 63upx;
					font-size: 34upx;
					font-weight: bold;
					border-bottom: 1upx solid #eeeeee;
				}

				.order-receive-line {
					margin-top: 14upx;
					

					.order-receive-item {
						line-height: 56upx;
						height: 56upx;

						.ori-title {
							font-size: 26upx;
							color: #999999;
						}

						.ori-content {
							font-size: 26upx;
							color: #333333;
						}
					}
				}
			}

			.order-again {
				margin-top: 85upx;
			
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 100;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				button {
					width: 100%;
					height: 105upx;
					background-color: #ff4d3d;
					color: #FFFFFF;
					line-height: 105upx;
					font-size: 42upx;
					//border-radius: 52.5upx;
					border: none;
					border-radius: 0
				}
			}
		}
	}
</style>
