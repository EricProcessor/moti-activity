<template>
	<view class="my-order">
		<view class="order-groups">
			<view class="order-item">
				<view class="order-header">
					<view class="header-left">
						TOP的专属MOTI小店
					</view>
					<view class="header-right">
						待收货
					</view>
				</view>
				<view class="order-body">
					<image class="order-image" src="../../static/image/pay-successbg.png" mode="aspectFill"></image>
					<view class="order-desc">
						<view class="order-title-price">
							<view class="o-title">
								D13 电子烟套装 雾化换弹小烟（1烟杆+3烟弹） …
							</view>
							<view class="o-price">
								￥999.80
							</view>
						</view>
						<view class="order-spec-number">
							<view class="o-spec">
								颜色:淡蓝色
							</view>
							<view class="o-number">
								×3
							</view>
						</view>
					</view>

				</view>
				<view class="order-total">
					<text class="total-number">共计3件商品</text>
					<text class="total-title">合计:￥</text>
					<text class="price-total-int">9980</text>
					<text class="price-float">.50</text>
				</view>
				<view class="order-operate">
					<view class="operate-item">
						联系客服
					</view>
					<view class="operate-item">
						联系小店
					</view>
					<view class="operate-item">
						申请售后
					</view>
					<view class="operate-item">
						商品验真
					</view>
				</view>
			</view>
		</view>
		<view class="order-bottom">
			<view class="order-tip">
				下载MOTI到家APP关注您的订单状态
			</view>
			<button>立即体验</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.my-order {
		color: #333333;

		.order-groups {
			.order-item {
				margin-top: 20upx;
				background-color: #FFFFFF;
				padding: 32upx 24upx 40upx 24upx;

				.order-header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.header-left {
						font-size: 24upx;
					}

					.header-right {
						height: 42upx;
						line-height: 42upx;
						font-size: 30upx;
						font-weight: bold;
					}
				}

				.order-body {
					margin-top: 20upx;
					margin-bottom: 24upx;
					display: flex;

					.order-image {
						width: 148upx;
						height: 148upx;
						flex-shrink: 0;
					}

					.order-desc {
						background-color: #F9F9F9;

						width: 554upx;
						box-sizing: border-box;
						padding: 14upx 25upx 20upx 20upx;

						.order-title-price {
							display: flex;
							justify-content: space-between;
							font-size: 24upx;

							.o-title {
								width: 368upx;
							}

						}

						.order-spec-number {
							margin-top: 18upx;
							display: flex;
							justify-content: space-between;
							color: #999999;
							font-size: 22upx;
						}
					}
				}

				.order-total {
					font-size: 24upx;
					color: #999999;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-bottom: 32upx;

					.total-title {
						font-weight: bold;
						margin-left: 19upx;
					}

					.price-total-int {
						font-size: 36upx;
						font-weight: bold;
						color: #333333;
						height: 50upx;
					}

					.price-float {

						font-size: 18upx;
						font-weight: bold;
						color: #333333;
					}
				}

				.order-operate {
					display: flex;
					justify-content: flex-end;

					.operate-item {
						text-align: center;
						font-size: 22upx;
						color: rgba(51, 51, 51, 1);
						line-height: 56upx;
						width: 152upx;
						height: 56upx;
						border-radius: 8upx;
						border: 2upx solid rgba(221, 221, 221, 1);
						margin-right: 32upx;
					}

					:last-child {
						margin-right: 0;
					}
				}
			}
		}

		.order-bottom {
			position: fixed;
			bottom: 24upx;
			margin: 0 24upx;
			text-align: center;
			width: 702upx;

			.order-tip {
				font-size: 24upx;
				margin-bottom: 16upx;
			}

			button {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				background: rgba(255, 74, 101, 1);
				border-radius: 8upx;
				color: #FFFFFF;
				font-size: 28upx;
			}
		}
	}
</style>
