<template>
	<view class="">
		<view class="payment-items">
			<!-- <view class="item" :key="index" v-for="(item,index) in payItems" @click="choicePay" :class="{active:currentPay === item.payType}"
			 :data-index="index">
				{{item.text}}
			</view> -->
			<view class="item" :key="0" v-if="paramType !== 14"  @click="choicePay" :class="{active:currentPay === 6}"   :data-index="0" >
				货到付款
			</view>
			<view class="item" :key="1"  @click="choicePay" :class="{active:currentPay === 2}"   :data-index="1" >
				微信支付
			</view>
			<view class="item" :key="2"  @click="choicePay" :class="{active:currentPay === 3}"   :data-index="2" >
				支付宝支付
			</view>
		</view>
	</view>
</template>

<script>
	import wx from "../../common/wxJsApi.js"
	import {
		newOrder
	} from "@/common/utils.js";
	export default {
		data() {
			return {
				currentPay: this.payType,

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
			urlParams:{
				type: Object,
				default: function() {
					return {}
				}
			},
			ispolling:{
				type:Number,
				default: 0			
			},
			payType:{
				type:Number,
				default: 6	
			},
			paramType:{
				type:Number,
				default: 7	
			}
		},
		watch: {
			payType(){
				this.currentPay = this.payType
				
			},
			ispolling(){
				
				if(this.ispolling !== 1) return ;
				let orderPay = uni.getStorageSync("orderPay")
				uni.removeStorageSync("orderPay")
				let isCancleInterval = false
				if(!orderPay ) return ;
				uni.showLoading({
					title:"下单中...."
				})
				if(orderPay.payType === 2){
					if(this.isWxAgent){
						let wxcode = uni.getStorageSync("wxcode")
						uni.removeStorageSync("wxcode")
						wx.orderPay = orderPay
					
						wx.callBack = async () => {
							let res1 = await this.wxPayStatus(orderPay.id)
							if(res1.data.result == 20){
								this.$emit("payCallBack",{submitState:-1})
							}
							if(res1.data.result == 30){
								this.$emit("payCallBack",{submitState:1})
							}
						}
						wx.failBack = () => {
							this.$emit("payCallBack",{submitState:-1})
						}
						wx.onLoad(wxcode)
						return 
					}
					
					let timer = setInterval(async ()=>{
						let res = await this.wxPayStatus(orderPay.id)
						console.log(res)
						if(res.data.code !== "0") return ;
						if(res.data.result == 20) {
							this.$emit("payCallBack",{submitState:-1})
							clearInterval(timer)
							isCancleInterval = true
						}
						if(res.data.result == 30) {
							this.$emit("payCallBack",{submitState:1})
							clearInterval(timer)
							isCancleInterval = true
						}
						
					},1000)
				}
				if(orderPay.payType === 3){
					
					let timer = setInterval(async ()=>{
						let aloption = uni.getStorageSync("alOptions")
						if(!aloption) return ;
						let res = await this.alPayStatus(orderPay.id)
						if(res.data.code !== "0") {
							this.$emit("payCallBack",{submitState:-1})
							clearInterval(timer)
							return ;
						}
						
						if(res.data.result == 20) {
							this.$emit("payCallBack",{submitState:-1})
							clearInterval(timer)
							isCancleInterval = true
							uni.removeStorageSync("alOptions")
						}
						if(res.data.result == 30) {
							this.$emit("payCallBack",{submitState:1})
							clearInterval(timer)
							isCancleInterval = true
							uni.removeStorageSync("alOptions")
						}
					},1000)
				}
				//15分钟取消定时任务
				if( ! isCancleInterval ){
					setTimeout(()=>{
						clearInterval(timer)
						this.$emit("payCallBack",{submitState:-1})
					}, 1000*60*15);
				}			
			},
			isOrderSuccess() {
				console.log(this.orderInfo)
				
				if (this.isOrderSuccess === 1) {
					uni.setStorageSync("orderInfo",this.orderInfo)
					uni.setStorageSync("orderPay",{
						orderNo:this.orderInfo.orderNo,
						payType:this.currentPay,
						id:this.orderInfo.id
					})
					 
					if (this.currentPay === 3) this.alWap()			
					if (this.currentPay === 2) {
						if(!this.isWxAgent) return this.wxWap()// wap 浏览器
						this.jsApi()	  //微信客户端
					}
					if(this.currentPay === 6){
						uni.removeStorageSync("orderInfo")
						uni.removeStorageSync("orderPay")
						this.$emit("payCallBack",{submitState:1})
					}		
				}
			}
		},
		methods: {
			choicePay(e) {
				let index = e.currentTarget.dataset.index
				this.currentPay = this.payItems[index].payType
				this.$emit("choicePay", this.currentPay)
			},
			async wxWap() { //微信map 支付
				let orderRes = await newOrder("/activity1/pay/wx", {
					orderNo: this.orderInfo.orderNo,
					spuName: this.orderInfo.spuName,
					ip: this.orderInfo.ip

				})
				if (orderRes.data.code === "0") {
					
					setTimeout(() => {
						uni.showModal({
							content: "是否完成微信支付？",
							confirmText: "完成",
							cancelText: "重新支付",
							success: (res) => {
								console.log(res)
								if (res.confirm) { // 如果点击 完成支付，那么跳转到订单详情页面
									this.$emit("payCallBack",{ispolling:1})
								}
								if(res.cancel){
									this.$emit("payCallBack",{submitState:-1})
								}
							}
						})
					}, 1000)
					location.href = orderRes.data.result				
				}
			
			},
			async alWap() { //支付宝wap支付
			
				let order = await newOrder("/activity1/pay/al", {
					orderNo: this.orderInfo.orderNo,
					spuName: this.orderInfo.spuName,
					returnUrl: "http://" + window.location.host  //todo
				})
				if (order.data.code === "0") {
					
					uni.setStorageSync("pageParams",this.urlParams)
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
				
				uni.setStorageSync("pageParams",this.urlParams)
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
			}
		},
		
		created() {
			console.log(wx)
			
		}
	}
</script>

<style lang="scss" scoped>
	.payment-items {
		display: flex;
		justify-content: space-between;
		width: 668upx;
		padding-top: 30upx;

		.item {
			width: 200upx;
			height: 76upx;
			font-size: 34upx;
			border: 1upx #B6B6B6 solid;
			border-radius: 7upx;
			text-align: center;
			line-height: 76upx;
			color: #B6B6B6;

			&.active {
				background-color: #FF2714;
				color: #FFFFFF;
				border: none;
			}
		}

	}
</style>
