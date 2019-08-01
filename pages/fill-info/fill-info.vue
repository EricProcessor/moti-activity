<template>
	<view class="content">
		<view v-if="0" class="header-title">
			<text>MOTI魔笛8 - 9月限时福利活动</text>
		</view>
		<view class="form">
			<view class="form-title">
				<text>信息填写</text>
			</view>
			<view class="form-item">
				<text class="item-title">性&emsp;别</text>
				<view class="check-box">
					<view class="image-box" @click="form.hdActivityUserDto.sex = 1">
						<image v-if="form.hdActivityUserDto.sex === 1" src="../../static/icon/check-box.png" mode=""></image>
					</view>
					<text>男</text>
				</view>
				<view class="check-box" @click="form.hdActivityUserDto.sex = 0">
					<view class="image-box">
						<image v-if="form.hdActivityUserDto.sex === 0" src="../../static/icon/check-box.png" mode=""></image>
					</view>
					<text>女</text>
				</view>
			</view>
			<view class="form-item">
				<text class="item-title">年&emsp;龄</text>
				<input v-model.number="form.hdActivityUserDto.age" type="number" placeholder="请输入年龄" placeholder-style="font-size: 32upx;color:#c6c6c6;"></input>
			</view>
			<view class="form-item">
				<text class="item-title">手机号</text>
				<input v-model="form.hdActivityUserDto.phone" placeholder="请输入手机号" placeholder-style="font-size: 32upx;color:#c6c6c6;"></input>
			</view>
			<view class="form-item">
				<text class="item-title">验证码</text>
				<input v-model="form.dynamicCode" placeholder="请输入验证码" placeholder-style="font-size: 32upx;color:#c6c6c6;"></input>

				<text class="time" :class="{clicking:buttonState.clickVerifyCode}" @touchstart.native="clickVerifyBtn"
				 @touchend.native="buttonState.clickVerifyCode = false" @click="getVerifyCode">{{verifyCodeMsg}}</text>
			</view>
			<view class="form-submit">
				<button @click="addOrder">提交</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		buyDynamicCode,
		downOrder
	} from "../../common/js/interface/register.js"
	export default {
		data() {
			return {
				form: {
					hdActivityUserDto: {
						shopAttDetailId: uni.getStorageSync("shopAttDetailId"),
						sex: '',
						phone: '',
						age: ''
					},
					hdGoodsSkuModel: {},
					dynamicCode: ''
				},
				verifyCodeMsg: "获取验证码",
				buttonState: {
					clickVerifyCode: false, //点击获取验证码
				},
				intervalID: ""
			}
		},
		computed: {
			isCanSubmit() {
				if (this.matchMobile() && this.verifiyCode) return true
				return false
			},
			errorMobile() {
				if (this.form.hdActivityUserDto.phone >= 11) {
					if (this.matchMobile()) return false
					else return true
				}
				return false
			},
			rightMobile() {
				if (this.matchMobile()) return true
				return false
			},
			shopDetail() {
				let info = this.$store.state.shopDetail

				return info

			}
		},
		methods: {
			matchMobile() {
				if (!(/^1[1-9][0-9]\d{8}$/.test(this.form.hdActivityUserDto.phone))) {
					return false
				}
				return true
			},
			async getVerifyCode() {
				if (!this.matchMobile()) {
					uni.showToast({
						title:"请输入正确的手机号码",
						icon:'none'
					})
					return false
				}
				if (this.getVerifyIng) return false;
				this.getVerifyIng = true;
				let count = 60;
				this.verifyCodeMsg = count + "s"
				this.intervalID = setInterval(() => {
					count--
					this.verifyCodeMsg = count + "s"
					if (count <= 0) {
						this.getVerifyIng = false
						clearInterval(this.intervalID)
						this.verifyCodeMsg = "获取验证码"
					}
				}, 1000)
				//parseFloat()
				let res = await buyDynamicCode({
					activityId: parseInt(uni.getStorageSync("customerActivityId")),
					shopId: uni.getStorageSync("customerShopId"),
					shopAttDetailId: uni.getStorageSync("shopAttDetailId"),
					phone: this.form.hdActivityUserDto.phone
				})

				if(res.code === '0'){
					uni.showToast({
						title: "短信发送成功",
						icon:'none'
					})
				}else{
					this.getVerifyIng = false
					clearInterval(this.intervalID)
					this.verifyCodeMsg = "获取验证码"
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if(res.code === '111'){
						setTimeout(function () {
							uni.navigateTo({
								url: '/pages/order-detail/order-detail',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}, 2000);
					}
				}
			
			},
			clickVerifyBtn() {

				this.buttonState.clickVerifyCode = true
				return false
			},
			async addOrder() {
				let msg = ""
				if (this.form.dynamicCode.length != 6) {
					msg = "验证码不正确"
				}
				if (!this.matchMobile()) {
					msg = "请填写正确的手机号"
				}
				if(isNaN(this.form.hdActivityUserDto.age || !this.form.hdActivityUserDto.age)){
					msg = "请填写正确的年龄"
				}
				if (this.form.hdActivityUserDto.age < 18 || this.form.hdActivityUserDto.age > 100) {
					msg = "18岁以上才能购买本产品哦~"
				}
				if (this.form.hdActivityUserDto.sex === '') {
					msg = "请选择性别"
				}

				if (msg) {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return
				}
				let res = await downOrder(this.form)
				if (res.code === '0') {
					uni.setStorageSync("attUserId", res.result.attUserId)
					uni.setStorageSync("getProductCode", res.result.getProductCode)
					uni.redirectTo({
						url: '/pages/order-detail/order-detail'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			}
		},
		onLoad() {
			this.form.hdGoodsSkuModel = uni.getStorageSync("hdGoodsSkuModel")
			console.log(this.form);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 0 48upx;
		font-family: PingFang-SC-Bold;
		padding-top: 71upx;
		.header-title {
			height: 52upx;
			width: 100%;
			height: 52upx;
			text-align: center;
			margin: 18upx 0;
			font-size: 37upx;
			font-weight: 600;
		}

		.form {
		

			.form-title {
				font-size: 52upx;
				height: 73upx;
				color: #333333;
				margin-bottom: 72upx;
			}

			.form-item {
				position: relative;
				border-bottom: 1upx #E3E5E6 solid;
				padding-bottom: 37upx;
				display: flex;
				//align-items: baseline;
				margin-bottom: 70upx;

				.item-title {
					margin-right: 48upx;
					font-size: 32upx;
					height: 52.5upx;
					line-height: 52.5upx;
					font-weight: 600;
				}

				.check-box {
					//display: flex;
					//align-items: baseline;
					margin-right: 74upx;

					.image-box {
						height: 34upx;
						width: 34upx;
						border-radius: 6upx;
						border: 2upx #C6C6C6 solid;
						display: inline-block;
						position: relative;
						bottom: 4.22upx;
						margin-right: 16upx;
						text-align: center;
						vertical-align: middle;

						image {
							width: 15upx;
							height: 15upx;
							position: relative;
							bottom: 5upx;
						}
					}

					text {
						display: inline-block;
						font-size: 32upx;
						height: 45upx;
						line-height: 45upx;
					}
				}

				.time {
					position: absolute;
					right: 0upx;
					bottom: 19upx;
					width: 184upx;
					height: 72upx;
					background-color: #F5F5F5;
					color: #333333;
					line-height: 40upx;
					font-size: 28upx;
					text-align: center;
					display: inline-block;
					box-sizing: border-box;
					vertical-align: middle;
					padding: 16upx 22upx;
					border-radius: 8upx;

					&.disabled {
						background: #F5F5F5;
						color: #C7C7C7;
					}

					&.clicking {
						background: #EAEAEA;
						color: #909090;
					}
				}

			}

			.form-submit {
				button {
					height: 104upx;
					background-color: #FB6947;
					font-size: 36upx;
					line-height: 104upx;
					text-align: center;
					vertical-align: middle;
					color: #FFFFFF;
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
