<template>
	<view class="input-item">
		<view class="text">选择支付方式 * </view>
		<view class="pay_way">
		<view class="payment-items" :class="{payTwo:isShowCashOnDelivery}">
		
			<view class="item" :key="0" v-if="isShowCashOnDelivery" @click="choicePay" :class="{active:currentPay === 6}"
			 :data-index="0">
				货到付款
			</view>
			<view class="item" :key="1" v-if="isShowWx" @click="choicePay" :class="{active:currentPay === 2}" :data-index="1">
				微信支付
			</view>
			<view class="item" :key="2" v-if="isShowAlPay" @click="choicePay" :class="{active:currentPay === 3}" :data-index="2">
				支付宝支付
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import wx from "../../common/wxJsApi.js"
	import {
		newOrder
	} from "@/common/utils.js";
	import typeConfig from "../../common/typeConfig.js"
	export default {
		data() {
			return {
				currentPay: this.payType,
				pageConfigure:{},
				payItems: [{
						text: "货到付款",
						payType: 6
					},
					{
						text: "微信支付",
						payType: 2
					},
					{
						text: "支付宝支付",
						payType: 3
					},
				]
			}
		},
		props: {
			orderInfo: {
				type: Object,
				default: function() {
					return {}
				}
			},
			isOrderSuccess: {
				type: Number,
				default: -1,
			},
			urlParams: {
				type: Object,
				default: function() {
					return {}
				}
			},
			ispolling: {
				type: Number,
				default: 0
			},
			payType: {
				type: Number,
				default: 0
			},
			paramType: {
				type: Number,
				default: 7
			}
		},
		
		watch: {
			payType() {
				this.currentPay = this.payType

			},

			async ispolling() {

				if (this.ispolling !== 1) return;
				
				let orderPay = uni.getStorageSync("orderPay")
				//uni.removeStorageSync("orderPay")
				let isCancleInterval = false
				if (!orderPay) return;
				uni.showLoading({
					title: "下单中....",
					
				});
				if (orderPay.payType === 2) {
					if (this.isWxAgent) {
						let wxcode = uni.getStorageSync("wxcode")
						uni.removeStorageSync("wxcode")
						wx.orderPay = orderPay

						wx.callBack = async () => {
							let res1 = await this.wxPayStatus(orderPay.id)
							if (res1.data.result == 20) {
								this.$emit("payCallBack", {
									submitState: -1
								})
							}
							if (res1.data.result == 30) {
								this.$emit("payCallBack", {
									submitState: 1
								})
							}
						}
						wx.failBack = () => {
							this.$emit("payCallBack", {
								submitState: -1
							})
						}
						wx.cancelBack = () => {
							this.$emit("payCallBack", {
								submitState: -2
							})
						}
						wx.onLoad(wxcode)
						return
					}

					uni.showModal({
						content: "是否完成微信支付？",
						confirmText: "完成",
						cancelText: "重新支付",
						success: async (res) => {

							if (res.confirm) { // 如果点击 完成支付，那么跳转到订单详情页面
								let res = await this.wxPayStatus(orderPay.id)
								if (res.data.code !== "0") return;
								if (res.data.result == 20) {
									this.$emit("payCallBack", {
										submitState: -1
									})
								}
								if (res.data.result == 30) {
									this.$emit("payCallBack", {
										submitState: 1
									})
								}
							}
							if (res.cancel) {
								let res = await this.wxPayStatus(orderPay.id)
								if (res.data.code !== "0") return;
								if (res.data.result == 20) {
									this.$emit("payCallBack", {
										submitState: -3
									})
									let res = await this.wxWap()
									return ;
								}
								if (res.data.result == 30) {
									this.$emit("payCallBack", {
										submitState: 1
									})
								}
							}
						}
					})
				}
				if (orderPay.payType === 3) {
					
					let aloption = uni.getStorageSync("alOptions")
					
					let res = await this.alPayStatus(orderPay.id)
					if (res.data.code !== "0") {
						this.$emit("payCallBack", {
							submitState: (aloption && aloption.out_trade_no) ? -1 : -2
						})
						return;
					}

					if (res.data.result == 20) {
						this.$emit("payCallBack", {
							submitState: (aloption && aloption.out_trade_no) ? -1 : -2
						})
						uni.removeStorageSync("alOptions")
					}
					if (res.data.result == 30) {
						this.$emit("payCallBack", {
							submitState: 1
						})
						uni.removeStorageSync("alOptions")
					}
					uni.hideLoading()

				}

			},
			isOrderSuccess() {
				console.log(this.orderInfo)

				if (this.isOrderSuccess === 1) {
					uni.setStorageSync("orderInfo", this.orderInfo)
					uni.setStorageSync("orderPay", {
						orderNo: this.orderInfo.orderNo,
						payType: this.currentPay,
						id: this.orderInfo.id,
						pageUniqueID:this.pageUniqueID
					})

					if (this.currentPay === 3) this.alWap()
					if (this.currentPay === 2) {
						if (!this.isWxAgent) return this.wxWap() // wap 浏览器
						this.jsApi() //微信客户端
					}
					if (this.currentPay === 6) {
						uni.removeStorageSync("orderInfo")
						uni.removeStorageSync("orderPay")
						this.$emit("payCallBack", {
							submitState: 1
						})
					}
				}
			}
		},
		mounted() {
			
		/* 	if(this.isWxAgent && (this.currentPay == 3)){
				this.currentPay = 2
				this.$emit("choicePay", this.currentPay)
			} */
			this.defaultPayMethod()
		},
		created() {
			this.pageConfigure = typeConfig[this.paramType]
		},
		methods: {
			defaultPayMethod(){
				if(this.isShowWx) this.currentPay = 2
				if(this.isShowAlPay) this.currentPay = 3
				if(this.isShowCashOnDelivery) this.currentPay = 6
				this.$emit("choicePay", this.currentPay)
			},
			isPayTwo() {
				
				return this.paramType === 14
			},
			choicePay(e) {
				let index = e.currentTarget.dataset.index
				this.currentPay = this.payItems[index].payType
				this.$emit("choicePay", this.currentPay)
			},
			async wxWap() { //微信map 支付
		    	let payOrderParam = uni.getStorageSync("payOrderParam")
				let orderRes = await newOrder("/activity1/pay/wx", {
					orderNo: payOrderParam.orderNo,
					spuName: payOrderParam.spuName,
					ip: payOrderParam.ip

				})
				if (orderRes.data.code === "0") {
					setTimeout(() => {
						this.$emit("payCallBack", {
							ispolling: 1
						})
					}, 1000)

					location.href = orderRes.data.result
				}

			},
			async alWap() { //支付宝wap支付

				let order = await newOrder("/activity1/pay/al", {
					orderNo: this.orderInfo.orderNo,
					spuName: this.orderInfo.spuName,
					returnUrl:  window.location.origin //todo
				})
				if (order.data.code === "0") {

					uni.setStorageSync("pageParams", this.urlParams)
					this.$nextTick(() => {
						const div = document.createElement('div');
						div.innerHTML = order.data.result;
						document.body.appendChild(div);
						document.forms[0].submit();
					})
				}
			},
			async alPayStatus(orderNo) {
				let res = await newOrder("/activity1/pay/alPayStatus", {
					orderNo: orderNo
				})
				return res
			},
			async wxPayStatus(orderNo) {
				let res = await newOrder("/activity1/pay/wxPayStatus", {
					orderNo: orderNo
				})
				return res
			},
			async jsApi() {

				uni.setStorageSync("pageParams", this.urlParams)
				let url = window.location.protocol + "//" + window.location.host
				location.replace(
					`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=homec`
				)
			}
		},
		computed: {
			isWxAgent() {
				let useAgent = window.navigator.userAgent.toLowerCase()
				if (useAgent.match(/MicroMessenger/i) == "micromessenger") {
					return true
				}
				return false
			},	
			pageUniqueID(){
				
				return this.urlParams.type + "-" + this.urlParams.orderSource + "-" + this.urlParams.channel + "-" + this.urlParams.material
			},
			isShowCashOnDelivery(){
				return this.pageConfigure.onArrivePay
				/* let b = true
				if(this.paramType === 14 || (this.paramType>=18 && this.paramType <= 22) || this.paramType === 32) b = false
				return b */
			},
			isShowWx(){
				return this.pageConfigure.onWxPay
				//return true;
			},
			isShowAlPay(){
				return this.pageConfigure.onAlipayPay && !this.isWxAgent
				/* if(this.isWxAgent) return false;
				return true; */
			},
		},

	}
</script>

<style lang="scss" scoped>
	.input-item{
		background-color: #FFFFFF;
		width: 660upx;
		
		padding: 28upx 45upx 100upx 45upx;
		
		.text {
			line-height: 1;
			font-size: 30upx;
			color: #323232;
		}
	}
	.payment-items {

		width: 660upx;
		padding-top: 30upx;

		.item {
			display: inline-block;
			width: 200upx;
			height: 76upx;
			font-size: 34upx;
			border: 1upx #B6B6B6 solid;
			border-radius: 7upx;
			text-align: center;
			line-height: 76upx;
			color: #B6B6B6;
			margin-left: 30upx;
			box-sizing: border-box;

			&.showTow {
				margin-left: 30upx;
			}


			&.active {
				background-color: #FF2714;
				color: #FFFFFF;
				border: none;
			}
		}

		:first-child {
			margin-left: 0upx;
		}

	}
</style>
