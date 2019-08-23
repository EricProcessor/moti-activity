<template>
	<view class="my-order">
		<view class="order-groups" :style="{height:height}">
			<view class="order-item" v-for="(items,index) in orderList" :key="index">
				<view class="order-header">
					<view class="header-left">
						MOTI商城
					</view>
					<view class="header-right">
						<!-- {{items.order_status === '30' ? '已支付' :'支付失败'}} -->
						{{formatDate(items.create_time)}}
						
					</view>
				</view>
				<view class="order-body" v-for="(item,key) in items.item" :key="key">
					<image class="order-image" :src="item.skuPicture.picture_url" mode="aspectFill"></image>
					<view class="order-desc">
						<view class="order-title-price">
							<view class="o-title">
								{{item.spu_name}}
							</view>
							<view class="o-price">
								￥{{parseInt(item.sku_price)}}
							</view>
						</view>
						<view class="order-spec-number">
							<view class="o-spec">
								{{item.skuAttr.attrName}}:{{item.skuAttr.attrValue}}
							</view>
							<view class="o-number">
								×{{item.sku_num}}
							</view>
						</view>
					</view>

				</view>
				<view class="order-total">
					<text class="total-number">共计{{items.item.length}}件商品</text>
					<text class="total-title">合计:￥</text>
					<text class="price-total-int">{{parseInt(items.order_old_money)}}</text>
					<!-- <text class="price-float">.{{toDecimalFloat(items.order_old_money)}}</text> -->
				</view>
				<view class="order-operate">
					<view class="operate-item">
						<a href="tel:4000126828">联系客服</a>
					</view>

				</view>
			</view>
		</view>

		<view class="order-bottom">
			<view class="order-tip">
				打开MOTI到家，实时关注我的订单进展
			</view>
			<button @tap="linkTo">立即体验</button>
		</view>
	</view>
</template>

<script>
	import {
		postForm
	} from "../../common/request.js"
	import {
		orderSource,
		daojiaUrl
	} from '../../common/unils.js'
	export default {
		data() {
			return {
				orderList: [],
				height: ""
			}
		},
		methods: {
			linkTo(){
				location.href = daojiaUrl
			},
			formatDate(date){
				let d = new Date(date.replace(/-/g, '/'))
				
				return [d.getFullYear(),(d.getMonth() +1).toString().padStart(2,'0'),d.getDate().toString().padStart(2,'0')].join(".")
			},
			async queryOrders() {
				uni.showLoading({
					title: "加载中..."
				})
				let res = await postForm("/mall/h5/ofo/queryOrderList", {
					orderSource: orderSource
				})
				uni.hideLoading()
				if (res.code != 0) return uni.showToast({
					title: res.msg,
					icon: "none"
				})
				this.orderList = res.result

			},
			toDecimalInt(price) {
				let arr = ["0", "00"]
				let f = parseFloat(price);
				if (isNaN(f)) {
					return arr[0]
				}
				f = Math.round(price * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');

				if (rs < 0) {
					arr[0] = s
					return arr[0]
				}

				let rsarr = s.split(".")
				arr[0] = rsarr[0]

				let f0 = rsarr[1]
				while (s.length <= rs + 2) {
					f0 += '0';
				}
				arr[1] = f0
				return arr[0];
			},
			toDecimalFloat(price) {
				let arr = ["0", "0"]
				let f = parseFloat(price);
				if (isNaN(f)) {
					return arr
				}
				f = Math.round(this.price * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0) {
					arr[0] = s
					return arr[1]
				}
				let rsarr = s.split(".")
				arr[0] = rsarr[0]

				let f0 = rsarr[1]
				while (s.length <= rs + 1) {
					f0 += '0';
				}
				arr[1] = f0
				return arr[1];
			},
		},
		computed: {

		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					self.height = (res.windowHeight - uni.upx2px(127+32)) + "px"
					
				}
			});
			this.MonitorPV()
			this.queryOrders()
		}
	}
</script>

<style lang="scss" scoped>
	.my-order {
		color: #333333;

		.order-groups {
			//height: 900upx;
			overflow-y: auto;

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
					align-items:  baseline;
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
						line-height: 56upx;
						border-radius: 8upx;
						border: 2upx solid rgba(221, 221, 221, 1);
						margin-right: 32upx;

						a {
							text-decoration: none;
							color: #333333;
						}
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
