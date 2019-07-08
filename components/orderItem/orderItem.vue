<template>
	<view class="goods-item">
		<view class="buyer-state">
			<view class="name-mobile">
				<text>手机号 : {{data.buyerPhone}}</text>
			</view>
			<view class="order-status-text" :class="{void:data.orderStatus === 'CANCEL'}">{{statusText(data.orderStatus)}}</view>
		</view>
		<view class="goods" :key="key" v-for="(item,key) in data.details">
			<view class="goods-image">
				<image :src="item.picduceUrl"></image>
			</view>
			<view class="order-info">
				<view class="price-title">
					<view class="title">
						{{item.goodsSpuName}}
					</view>
					<view class="price-qty">
						<view class="price">￥{{toDecimal2(item.goodsPrice)}}</view>
						<view class="qty">x{{item.goodsQuantity}}</view>
					</view>
				</view>
				<view class="goods-sku">{{item.goodsSkuName}}</view>
			</view>
		</view>
		<view class="goods-total" :class="{complate:showComplateClass()}">
			<text class="total-text">共计{{count}}件商品 合计：</text>
			<text class="total-price">￥<text class="price-font">{{totalPriceFormmat[0]}}.</text>{{totalPriceFormmat[1]}}</text>
		</view>
		<view class="op-button" v-if="!(showComplateClass())">
			<button class="cancel-order" hover-class="button-hover" @click="$emit('cancelorder',data)">取消订单</button>
			<button class="check-code" hover-class="button-hover" @click="$emit('confirmorder',data)">验证取货码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//	scrollY: true
			}
		},
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		computed: {
			count() {
				let count = 0
				//console.log(this.data)
				for (let item of this.data.details) {

					count = count + item.goodsQuantity
				}
				return count
			},
			totalPriceFormmat(){
				let arr = ['0','00']
				let floatPrice = this.toDecimal2(this.data.totalPrice)
				arr = floatPrice.split(".")
				return arr
			}
		},
		methods: {
			statusText(type) {
				let map = {
					SEND: "待买家取货",
					FINISH: "订单已完成",
					CANCEL: "订单已取消",
					OKPAY: "待买家取货",
				}
				return map[type]
			},
			showComplateClass() {
				if (this.data.orderStatus === 'FINISH' || this.data.orderStatus === 'CANCEL') return true;
				return false
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
		created() {
			//	console.log(this.data);
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		background-color: #FFFFFF;
		border-radius: 12upx;
		padding: 29upx 24upx 32upx 24upx;
		margin-bottom: 32upx;

		.buyer-state {
			display: flex;
			justify-content: space-between;
			height: 37upx;
			margin-bottom: 34upx;

			.name-mobile {
				font-size: 26upx;
				color: #333333;
				line-height: 37upx;

				:first-child {
					margin-right: 16upx;
				}
			}

			.order-status-text {
				color: #FB6947;
				font-size: 26upx;
				line-height: 37upx;

				&.void {
					color: #999999;
				}
			}
		}

		.goods {
			display: flex;
			justify-content: space-between;
			height: 148upx;
			margin-bottom: 32upx;
			//padding-bottom: 32upx;
			//border-bottom:1upx solid #E3E5E6;

			.goods-image image {
				width: 148upx;
				height: 148upx;
				border-radius: 4upx;
				padding: 0;
				margin: 0;
				//border: 0.5upx #CCCCCC solid;
			}

			.order-info {
				padding: 14upx 0;

				.price-title {
					display: flex;

					.title {
						font-size: 24upx;
						line-height: 33upx;
						height: 66upx;
						width: 374upx;
						display: inline-block;
						align-self: flex-start;
					}

					.price-qty {
						display: inline-block;
						text-align: right;
						width: 107upx;

						.price {
							height: 33upx;
							font-size: 24upx;
						}

						.qty {
							height: 33upx;
							font-size: 22upx;
							color: #999999;
						}
					}
				}

				.goods-sku {
					color: #999999;
					font-size: 22upx;
					margin-top: 19upx;
				}

			}

		}

		.goods-total {

			text-align: right;
			height: 50upx;
			line-height: 50upx;
			margin-bottom: 34upx;
			vertical-align: middle;

			.total-text {
				font-size: 24upx;

			}

			.total-price {
				font-size: 24upx;
				color: #151515;

				.price-font {
					font-size: 36upx;

				}
			}

			&.complate {
				margin-bottom: 0upx;
			}
		}

		.op-button {
			display: flex;
			justify-content: space-between;

			.cancel-order {
				width: 314upx;
				background-color: #CCCCCC;
				color: #FFFFFF;
				font-size: 28upx;

			}

			.check-code {
				width: 314upx;
				background-color: #FB6947;
				color: #FFFFFF;
				font-size: 28upx;

				&.button-hover {
					background: #E55D3E;
					color: #FFC5B7;
				}
			}
		}
	}

	button::after {
		border: none;
	}

	input {
		font-weight: 600;
	}
</style>
