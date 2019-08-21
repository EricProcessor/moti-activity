<template>
	<view class="order-pay">
		<view class="order-user-info">
			<view class="adddress-icon">
				<image src="../../static/image/locate.png" mode=""></image>
			</view>
			<view class="address-info">
				<view class="address">
					{{address}}
				</view>
				<view class="user-info">
					<text class="user-name">{{preOrderResult.userName}}</text>
					<text class="user-contact">{{preOrderForm.mobile}}</text>
				</view>
			</view>
		</view>
		<view class="blue-red-wrap">
			<view class="blue-red">

			</view>
		</view>
		<view class="goods-show">
			<view class="goods-desc-header">
				MOTI专属小店
			</view>
			<view class="goods-body">
				<view class="good-pic">
					<image :src="preOrderData.img" mode=""></image>
				</view>
				<view class="goods-desc">
					<view class="goods-title">
						{{preOrderData.title}}
					</view>
					<view class="goods-attr">
						{{preOrderData.attrName}}:{{preOrderData.skuName}}
					</view>
					<view class="goods-buy">
						<view class="goods-price">
							￥<text>{{preOrderData.skuPrice}}</text>
						</view>
						<view class="operate-number">
							<uniNumberBox disabled :value="preOrderData.skuNumber"  type="small" :min="1" @change="numberChange"></uniNumberBox>
						</view>
					</view>
					<view class="goods-note">
						未成年人(未满18岁)请勿购买本产品
					</view>
				</view>
			</view>

		</view>
		<view class="order-total">
			<view class="order-total-body">
				<view class="total-title">
					商品金额
				</view>
				<view class="total-number">
					<text class="amount">¥{{preOrderData.skuPrice}}</text> <text class="number">× {{preOrderData.skuNumber}}</text>
				</view>
			</view>
		</view>


		<view class="pay-method-group">
			<view class="pay-item" @tap="payType = 'weixin' ">
				<view class="pay-icon">
					<image src="../../static/image/weixin.png" mode="aspectFit"></image>
					<view class="pay-title">
						微信支付
					</view>
					<view class="pay-carrier-fee">
						( 配送费6元 )
					</view>
				</view>
				<image class="select-pay" v-if="payType === 'weixin'" src="../../static/image/circle-acitve.png" mode=""></image>

				<image class="select-pay" v-else src="../../static/image/circle-choic.png" mode=""></image>

			</view>
			<view class="pay-item" @tap="payType = 'alipay'">
				<view class="pay-icon">
					<image src="../../static/image/zhifubao.png" mode="aspectFit"></image>
					<view class="pay-title">
						支付宝
					</view>
					<view class="pay-carrier-fee">
						( 配送费6元 )
					</view>
				</view>
				<image class="select-pay" v-if="payType === 'alipay'" src="../../static/image/circle-acitve.png" mode=""></image>
				<image class="select-pay" v-else src="../../static/image/circle-choic.png" mode=""></image>


			</view>
			<!-- <view class="pay-item" @tap="payType = 'arrive_pay'">
				<view class="pay-icon">
					<image src="../../static/image/zhuanqian-H@2X.png" mode="aspectFit"></image>
					<view class="pay-title">
						货到付款
					</view>
					<view class="pay-carrier-fee">
						( 配送费9元 )
					</view>
				</view>
				<image class="select-pay" v-if="payType === 'arrive_pay'" src="../../static/image/circle-acitve.png" mode=""></image>
				<image class="select-pay" v-else src="../../static/image/circle-choic.png" mode=""></image>
			</view> -->
		</view>
		<view class="bottom-button">
			<view class="bottom-left">
				<text class="left-title">需支付 ￥</text>
				<text class="left-money">{{amount}}</text>
			</view>
			<view class="button-right" @click="confirmPay">
				<button type="primary">确认支付</button>
			</view>
		</view>
		<popCard @emitClose="closePop" :submitState="submitState" v-if="isShowPayPop"></popCard>
		<view v-html="testMsg">
			
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/component/uni-number-box/uni-number-box.vue"
	import PayObject from "../../common/pay.js"
	import {
		post,
		postForm
	} from "../../common/request.js"
	import popCard from "../../component/popCard.vue"
	export default {
		data() {
			return {
				testMsg:"",
				isShowPayPop: false,
				submitState: 0,
				payType: "",
				preOrderForm: {},
				preOrderData: {},
				preOrderResult: {},
				payMap: {
					weixin: "2",
					alipay: "1",
					arrive_pay: "6"
				},
				payFee: {
					weixin: 6,
					alipay: 6,
					arrive_pay: 9
				},
				options:{}
			};
		},
		components: {
			uniNumberBox,
			popCard
		},
		computed: {
			address() {
				return this.preOrderForm.provinceName + this.preOrderForm.cityName + this.preOrderForm.districtName + this.preOrderForm
					.userAddress
			},
			amount() {
				let fee = this.payFee[this.payType] ? this.payFee[this.payType] : 0
				return (this.preOrderData.skuPrice * this.preOrderData.skuNumber) + fee
			}
		},
		methods: {
			numberChange() {

			},
			closePop() {
				this.isShowPayPop = false
				this.submitState = 0
			},
			async confirmPay() {
				if (!this.payType) return uni.showToast({
					title: "请选择支付方式",
					icon: "none"
				})
				uni.showLoading({
					title:"支付中..."
				})
				let res = await postForm("/mall/h5/ofo/savePaymentType", {
					orderId: this.preOrderResult.id,
					paymentType: this.payMap[this.payType]
				})
				if (res.code != 0  ) return uni.showToast({
					title: res.msg,
					icon: "none"
				})
				//forQueryPayParams 查询支付后就移除 用于判断是否需要调用查询接口
				uni.setStorageSync("forQueryPayParams", {
					orderNo: this.preOrderResult.order_no,
					payType: this.payType,
					spuName: this.preOrderData.title
				})
				uni.setStorageSync("payType",this.payType)
				if (this.payType == 'alipay') {

					let res = await PayObject.AliPay.createOrder(location.origin + "/#/pages/order-pay/order-pay", this.preOrderResult.order_no,this.preOrderData.title)
				}
				
				if (this.payType == 'weixin') {
					
					let wechat = PayObject.Wechat
					if (wechat.isWxBrowser()) {
					
						wechat.JsPay()
					}
					else {
						
						wechat.h5Pay(this.preOrderResult.order_no,this.preOrderData.title)
					}
				}
				if (this.payType == "arrive_pay"){
					PayObject.arrivedPay()
				}
				uni.hideLoading()
			},
			registerPayCall() {
				PayObject.successCallBack = () => {
					uni.removeStorageSync("forQueryPayParams")
					uni.navigateTo({
						url: "/pages/pay-success/pay-success?amount=" + this.amount + "&payType=" + this.payType
					})
				}

				PayObject.failCallBack = () => {
					this.isShowPayPop = true
					this.submitState = 2
					uni.removeStorageSync("forQueryPayParams")

				}
				PayObject.cancelCallBack = () => {
					this.isShowPayPop = true
					this.submitState = 3
					uni.removeStorageSync("forQueryPayParams")
					this.$nextTick(()=>{
						setTimeout(()=>{
							uni.hideLoading()
						})
					})
				}
				PayObject.systemCallBack = () => {
					this.isShowPayPop = true
					this.submitState = 4
					uni.removeStorageSync("forQueryPayParams")
				}
				PayObject.missApiCallBack = (data)=>{
					this.testMsg = data
				}
			},
			queryPayState(options) {
				
				let queryPayParams = uni.getStorageSync("forQueryPayParams");
				if (!queryPayParams) return;
				
				
				if (queryPayParams.payType === "alipay") {
					if(!options.out_trade_no) PayObject.cancelCallBack()
					else PayObject.queryPayStatus(queryPayParams.orderNo, "1")
				}
				if (queryPayParams.payType === "weixin") {
					
					if(PayObject.Wechat.isWxBrowser()) return ;
					
					setTimeout(() => {
						uni.showModal({
							content: "是否完成微信支付？",
							confirmText: "完成",
							cancelText: "重新支付",
							success: (res) => {
								if (res.confirm) {
									PayObject.queryPayStatus(queryPayParams.orderNo, "2")
								} else {
									this.confirmPay()
								}
							}
						})
					},0);
				}
			}
		},
		onShow() {
			
			if (this.options.code) {	
				PayObject.Wechat.onStart(this.options.code)
			}
			this.queryPayState(this.options)
		},
		onLoad(options) {
			this.options = options
			this.preOrderData = uni.getStorageSync("preOrderData")
			this.preOrderForm = uni.getStorageSync("orderForm")
			this.preOrderResult = uni.getStorageSync("orderResult")
			this.payType = uni.getStorageSync("payType")
			this.registerPayCall()		
		}
	}
</script>

<style lang="scss" scoped>
	.order-pay {
		.order-user-info {
			background-color: #ffffff;
			padding: 24upx;
			display: flex;
			align-items: center;

			.adddress-icon {
				width: 56upx;
				height: 56upx;

				image {
					width: 56upx;
					height: 56upx;
				}
			}

			.address-info {
				margin-left: 24upx;

				.address {
					font-size: 28upx;
					font-weight: bold;
				}

				.user-info {
					margin-top: 8upx;
					font-size: 22upx;

					.user-name {
						color: #333333;
					}

					.user-contact {
						margin-left: 30upx;
						color: #999999;
					}
				}
			}

		}

		.blue-red-wrap {
			background-color: #ffffff;

			.blue-red {
				height: 6upx;
				background: repeat-x url("../../static/image/addBg.png");
			}
		}

		.goods-show {
			margin-top: 20upx;
			background-color: #FFFFFF;
			padding: 18upx 24upx 40upx 24upx;

			.goods-desc-header {
				font-size: 30upx;
				color: #333333;
			}

			.goods-body {
				margin-top: 26upx;
				display: flex;

				.good-pic {
					width: 160upx;
					height: 160upx;

					image {
						width: 160upx;
						height: 160upx;
					}
				}

				.goods-desc {
					width: 529upx;
					margin-left: 20upx;

					.goods-title {
						font-size: 26upx;
						font-weight: bold;
						color: #333333;
						height: 37upx;
						line-height: 37upx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space:nowrap;
					}

					.goods-attr {
						margin-top: 3upx;
						font-size: 22upx;
						color: #999999;
					}

					.goods-buy {
						margin-top: 10upx;
						display: flex;
						justify-content: space-between;

						.goods-price {
							color: #FA4650;
							font-size: 22upx;
							height: 43upx;
							line-height: 43upx;

							text {
								font-size: 36upx;
							}
						}
						.operate-number{
							height: 43upx;
						}
					}

					.goods-note {
						margin-top: 11upx;
						font-size: 22upx;
						color: #999999;
					}
				}
			}

		}

		.order-total {
			background-color: #FFFFFF;
			font-size: 26upx;
			padding: 0 24upx;

			.order-total-body {
				height: 100upx;
				line-height: 100upx;
				display: flex;
				justify-content: space-between;
				border-top: 1upx solid #DCDCDC;

				.total-title {
					color: #333333;
				}

				.total-number {
					.amount {
						font-weight: bold;
					}

					.number {
						margin-left: 13upx;
						color: #999999;
					}
				}
			}
		}

		.pay-method-group {
			margin-top: 20upx;
			background-color: #FFFFFF;
			padding: 0upx 40upx;

			.pay-item {

				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 96upx;
				line-height: 96upx;
				border-bottom: 1upx solid #E6E6E6;

				.pay-icon {
					display: flex;
					align-items: center;
					color: #333333;

					image {
						width: 50upx;
						height: 50upx;
						margin-right: 30upx;
					}

					.pay-title {
						width: 120upx;
						font-size: 30upx;
					}

					.pay-carrier-fee {
						color: #999999;
						font-size: 22upx;
						margin-left: 48upx;
					}
				}

				.select-pay {

					width: 36upx;
					height: 36upx;
				}
			}
			:last-child{
				border-bottom: none;
			}
		}

		.bottom-button {
			position: fixed;
			padding: 14upx 24upx 14upx 32upx;
			box-sizing: border-box;
			height: 100upx;
			width: 100%;

			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;
			bottom: 0;

			.bottom-left {

				.left-title {
					font-size: 30upx;
				}

				.left-money {
					font-size: 46upx;
				}
			}

			.button-right {
				button {
					width: 220upx;
					height: 72upx;
					background: rgba(255, 74, 101, 1);
					border-radius: 8upx;
					font-size: 28upx;
					font-weight: bold;
					color: #ffffff;
				}
			}

		}

	}
</style>
