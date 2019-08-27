<template>
	<view class="form-body">
		<view class="goods-show">
			<view class="goods-desc-header">
				MOTI 商城
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
							￥<text>{{parseInt(preOrderData.skuPrice)}}</text>
						</view>
						<view class="operate-number">
							<uniNumberBox :value="preOrderData.skuNumber" :min="1" @change="numberChange"></uniNumberBox>
						</view>
					</view>
					<view class="goods-note">
						未成年人(未满18岁)请勿购买本产品
					</view>
				</view>
			</view>
		</view>
		<view class="form-fill">
			<view class="fill-header">
				收货地址
			</view>
			<view class="form-group">
				<view class="form-item">
					<view class="item-title">
						收货人
					</view>
					<input type="text"  v-model.trim="userName" placeholder="请填写姓名" placeholder-class="place-class"  />
				</view>
				<view class="form-item">
					<view class="item-title">
						手机号
					</view>
					<input type="text" v-model.trim="orderForm.mobile" placeholder="请填写手机号" placeholder-class="place-class" />
				</view>
				<view class="form-item">
					<view class="item-title">
						验证码
					</view>
					<input type="text" v-model.trim="verifyCode" placeholder="短信验证码" placeholder-class="place-class"  />
					<view class="right-view">
						<view class="verify-code" v-if="!timeOut"  @click="getVerifyCode"> 获取验证码 </view>
						<view class="verify-code gray" v-if="timeOut"  > {{timeOut}}秒后重新获取 </view>
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">
						选择地区
					</view>
					<input type="text" v-model.trim="city_address" disabled="true"  @tap="showCityPicker" placeholder="请选择省市区" placeholder-class="place-class" />
					<view class="right-view" @click="showCityPicker">
						<view class="verify-code gray normal"> <text class="iconfont moti-right"> </text> </view>
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">
						详细地址
					</view>
					<input type="text" v-model.trim="orderForm.userAddress" placeholder="具体到楼层门牌号" placeholder-class="place-class"  />
				</view>
			</view>
		</view>
			<mpvueCityPicker ref="mpvueCityPicker" :defaultValueCode="defaultValueCode" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel"  @onConfirm="onConfirm"></mpvueCityPicker>
		<!-- <view class="form-note">
			<text>填写订单后MOTI官方将会与您确认订单</text>
		</view> -->
		<view class="form-button" :class="{fixed:buttonFixed,noFixed:!buttonFixed}"  @click="submitForm">
			<button >确定</button>
		</view>
	
	</view>
</template>

<script>
	import uniNumberBox from "@/component/uni-number-box/uni-number-box.vue"
	import mpvueCityPicker from "@/component/mpvue-citypicker/mpvueCityPicker.vue"
	import {checkMobile,appType} from "../../common/unils.js"
	import {post,postForm} from "../../common/request.js"
	export default {
		data() {
			return {
				timeOut:0,
				cityPickerValueDefault: [0, 0, 0],
				defaultValueCode: '',	
				userName:"",
				mobile:'',
				verifyCode:"",		
				preOrderData:{},
				city_address:"",
				orderForm:{
					cityCode:"",
					cityName:"",
					districtCode:"",
					districtName:"",
					provinceCode:"",
					provinceName:"",
					mobile:"",	
					skuId:"",
					skuNum:"",
					userAddress:"",
					appType:appType
				},
				buttonFixed:true,
			};
		},
		computed:{
		
		},
		components: {
			uniNumberBox,
			mpvueCityPicker
		},
		methods: {
			numberChange(data) {
				this.orderForm.skuNum = data.num
				this.preOrderData.skuNumber = data.num
			},
			async getVerifyCode(){
				if(!checkMobile(this.orderForm.mobile)) return uni.showToast({
					title:"请输入正确的手机号",
					icon:"none"
				})
				
				let res = await postForm("/mall/h5/user/checkUserMobile",{mobile:this.orderForm.mobile})
				if(res.code === "1") return uni.showToast({
					title:res.msg,
					icon:"none"
				})
				let codeType = res.code == "0" ? "102" : "101"
				let resCode = await postForm("/mall/h5/code/sendDynamicCode",{codeType:codeType,mobile:this.orderForm.mobile})
				if(resCode.code != "0") return uni.showToast({
					title:resCode.msg,
					icon:"none"
				})
				this.timeOut = 90	
				let timer = setInterval(()=>{
					this.timeOut--;
					if(this.timeOut <= 0) {
						clearInterval(timer)
					}
				},1000)
				
			},
			showCityPicker(){
				this.$refs["mpvueCityPicker"].show()
			},
			onConfirm(data){	
				let arr = data.label.split("-")
				let codeArr = data.cityCode.split("-")
				this.orderForm.provinceName = arr[0]
				this.orderForm.cityName = arr[1]
				this.orderForm.districtName = arr[2]
				this.orderForm.provinceCode = codeArr[0]
				this.orderForm.cityCode = codeArr[1]
				this.orderForm.districtCode = codeArr[2]
				this.city_address = this.orderForm.provinceName + this.orderForm.cityName + this.orderForm.districtName
			},
			checkForm(){
				let data = {code:0,message:""}
				if(!this.orderForm.userAddress) data = {code:1, message:"请填写具体到楼层门牌号"}
				if(!this.orderForm.provinceName || !this.orderForm.cityName || !this.orderForm.districtName) data = {code:1, message:"请选择省市区"}
				if(!this.verifyCode) data = {code:1, message:"请输入短信验证码"}
				if(!checkMobile(this.orderForm.mobile)) data =  {code:1, message:"请输入正确的手机号码"}
				if(!this.userName) data =  {code:1, message:"请填写姓名"}
				return data
			},
			async submitForm(){
				let validate = this.checkForm()
				if(validate.code) return uni.showToast({
					title:validate.message,
					icon:"none"
				})
				uni.showLoading({
					title:"下单中..."
				})
				this.MonitorEvent("confirm")
				let resLogin = await postForm("/mall/h5/ofo/mobileLogin",{dynamicCode:this.verifyCode,mobile:this.orderForm.mobile,userName:this.userName})
				
				if(resLogin.code !== 0) return uni.showToast({
					title:resLogin.msg,
					icon:"none"
				})
				
				let resOrder = await postForm("/mall/h5/ofo/createOrder",this.orderForm)
				
				if(resOrder.code != 0) return uni.showToast({
					title:"下单失败",
					icon:"none"
				})
				uni.hideLoading()
				resOrder.result.userName = this.userName
				uni.setStorageSync("preOrderData",this.preOrderData)
				uni.setStorageSync("orderForm",this.orderForm)
				uni.setStorageSync("orderResult",resOrder.result)
				uni.setStorageSync("mobile",this.orderForm.mobile)
				uni.navigateTo({
					url:"/pages/order-pay/order-pay"
				})
				return resOrder
				
			},
			
			onCancel(){
				
			}
		},
		
		async onLoad() {
			
			window.onresize = ()=>{
				uni.getSystemInfo({
					success: function(res) {
						console.log("res.windowHeight:"+res.windowHeight)
						if(res.windowHeight <= uni.upx2px(1000)){
							self.buttonFixed = false
						}else{
							self.buttonFixed = true
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 100
							})
						}
					}
				});
			}
			this.preOrderData = uni.getStorageSync("preOrderData")
			this.orderForm.skuId = this.preOrderData.skuId
			this.orderForm.skuNum = this.preOrderData.skuNumber
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res)
					console.log(res.windowHeight)
					console.log(uni.upx2px(890));
					if(res.windowHeight <= uni.upx2px(1000)){
						console.log(res.windowHeight)
						self.buttonFixed = false
					}
					
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.form-body {
		padding-top: 20upx;
		position: relative;


		.goods-show {
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
						height: 43upx;
						margin-top: 10upx;
						display: flex;
						justify-content: space-between;

						.goods-price {
							color: #FA4650;
							font-size: 22upx;

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

		.form-fill {
			margin-top: 20upx;
			background-color: #FFFFFF;
			padding: 18upx 24upx 0 24upx;

			.fill-header {
				font-size: 30upx;
				color: #333333;
				margin-bottom: 14upx;
			}

			.form-group {
				.form-item {
					display: flex;
					border-bottom: 1upx solid #DCDCDC;
					padding: 25upx 0;
					align-items: center;
					position: relative;

					.item-title {
						width: 105upx;
						font-size: 26upx;
						line-height: 37upx;
						
					}

					input {
						height: 37upx;
						line-height: 37upx;
						margin-left: 75upx;
						flex-grow: 1;
					}

					.place-class {
						height: 37upx;
						font-size: 26upx;
						color: #999999;
						line-height: 37upx;

					}
					.right-view{
						position: absolute;
						right: 0;
						.verify-code{
							font-size: 24upx;
							font-weight: bold;
							color: #333333;
							&.gray{
								color: #979797;
							}
							&.normal{
								font-weight: normal;
							}
						}
					}
				}

				:last-child {
					border: none;
				}
			}


		}

		.form-note {
			margin-top: 25upx;
			text-align: center;
			color: #999999;
			font-size: 22upx;
		}

		.form-button {
			
			padding: 0 24upx;
			&.fixed{
				position: fixed;
				bottom: 24upx;
			}
			
			&.noFixed{
				margin-top: 24upx;
			}
			button{
				display: inline-block;
				height: 80upx;
				line-height: 80upx;
				background: rgba(255, 74, 101, 1);
				border-radius: 8upx;
				background-color: #FF4A65;
				color: #FFFFFF;
				width: 702upx;
				border: none;
			}
		}
	}
</style>
