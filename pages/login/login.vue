<template>
	<view class="content">
		<view class="login-title">
			<text>登录</text>
		</view>
		<view class="login-content">
			<view class="login-info" :class={errorTip:errorMobile}>
				<view class='info-title'>手机号</view>

				<input v-model="mobile" placeholder="请输入手机号" placeholder-class="input-placeholder" type="text" placeholder-style="font-size: 32upx;color:#C6C6C6;"></input>
				<view class="close-v" v-if="mobile.length>0">
					<image @click="mobile=''" src="../../static/icon/input-close.png"></image>
				</view>

				<!-- <i class="close iconfont  clear-input" ></i> -->
			</view>
			<view class="login-info">
				<text class="info-title">验证码</text>
				<input v-model="verifiyCode" placeholder="请输入验证码" placeholder-class="input-placeholder" 
				placeholder-style="font-size: 32upx;color:#C6C6C6;"></input>
				<text class="time"
				:class="{clicking:buttonState.clickVerifyCode,disabled:(!matchMobile() || getVerifyIng)}" 
				@touchstart.native="clickVerifyBtn"
				 @touchend.native="buttonState.clickVerifyCode = false"
				  @click="getVerifyCode">{{verifyCodeMsg}}</text>
			</view>
		</view>
		<view class="login-button">
			<button  @touchstart.native="buttonState.loginIng = true" @touchend.native="buttonState.loginIng = false"
			 @click="login" :class="{clicking:buttonState.loginIng}">登录</button>
		</view>
		<view class="shop-button">
			<button @click="shopApply" @touchstart.native="buttonState.applyIng = true" @touchend.native="buttonState.applyIng = false"
			 :class="{clicking:buttonState.applyIng}" type="warn">门店申请</button>
		</view>
		<!-- <ActivityImage></ActivityImage> -->
	</view>
</template>

<script>
	import {
		Login,
		loginVerify
	} from "../../common/js/interface/register.js"
	import ActivityImage from "../../components/ActivityImage.vue"
	import {ActivityId} from "../../common/js/common/const.js"
	export default {
		data() {
			return {
				mobile: '',
				verifiyCode: "",
				buttonState: {
					loginIng: false, //点击登录
					applyIng: false, // 点击申请门店
					clickVerifyCode: false, //点击获取验证码
				},

				verifyCodeMsg: "获取验证码",
				getVerifyIng: false, //是否获取验证码中
				intervalID: ""
			}
		},
		computed: {
			isCanSubmit() {
				if (this.matchMobile() && this.verifiyCode) return true
				return false
			},
			errorMobile() {
				if (this.mobile.length >= 11) {
					if (this.matchMobile()) return false
					else return true
				}
				return false
			},
			rightMobile() {
				if (this.matchMobile()) return true
				return false
			}
		},
		methods: {
			matchMobile() {
				if (!(/^1[1-9][0-9]\d{8}$/.test(this.mobile))) {
					return false
				}
				return true
			},
			shopApply() {
				uni.navigateTo({
					url: '/pages/shop-apply/shop-apply',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async login() {
				let msg = ""
				if(this.verifiyCode === ""){
					msg = "请输入验证码"
				}
				if(!this.matchMobile()){
					msg = "请输入正确的手机号"
				}
				if(msg){
					uni.showToast({
						title:msg,
						icon:'none'
					})
					return 
				}
				let res = await  Login({
					phone: this.mobile,
					dynamicCode: this.verifiyCode,
					activityId: ActivityId
				})
				if (res.code === '0') {
					uni.setStorageSync("token", res.token)
					uni.setStorageSync("shopId",res.result.shopId)
					uni.setStorageSync("managerShopAttId",res.result.id)
					uni.setStorageSync("manageQrCodeImg",res.result.imageUrl)
					uni.navigateTo({
						url: '/pages/my-order/my-order',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			},
			clickVerifyBtn() {
				if(this.getVerifyIng) return
				if (this.rightMobile) this.buttonState.clickVerifyCode = true
				return false
			},
			async getVerifyCode() {

				if (!this.matchMobile()) return false
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
				let res = await loginVerify({
					phone: this.mobile.toString()
				})
				
				if (res.code !== '0') {
					this.getVerifyIng = false
					clearInterval(this.intervalID)
					this.verifyCodeMsg = "获取验证码"
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					return
				}else{
						uni.showToast({
						title: '发送短信成功',
						icon:'none'
					});
				}
			
			}
		},
		components:{
			ActivityImage
		},
		onLoad() {
			let token = uni.getStorageSync("token")
			if(token){
				uni.redirectTo({
					url: '/pages/my-order/my-order'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-top: 161upx;
	}

	.content {
		margin: 0 48upx;

		.login-title {
			height: 73upx;
			width: 104upx;
			line-height: 73upx;
			font-weight: bold;
			font-size: 52upx;
			color: #333333;
			//margin-top: 161upx;
			margin-bottom: 112upx;
		}

		.login-content {
			.login-info {
				display: flex;
				//align-items: baseline;
				border-bottom: 1upx #E3E5E6 solid;
				padding-bottom: 32upx;
				position: relative;
				margin-bottom: 90upx;

				.info-title {
					width: 96upx;
					height: 52upx;
					font-size: 32upx;
					line-height: 52upx;
					font-weight: bold;
					margin-right: 46upx;
					color: #333333;

				}

				.close-v {
					width: 32upx;
					height: 32upx;
					line-height: 32upx;
					position: absolute;
					right: 0upx;
					top: 10.25upx;
					z-index: 8;

					image {
						width: 32upx;
						height: 32upx;
						display: inline-block;
					}
				}

				input {
					flex: 1;
					font-size: 32upx;
					//height: 52.5upx;
				}

				.input-placeholder {
					color: #C6C6C6;
					font-size: 32upx;
					line-height: 45upx;
					//	position: relative;
					//top: 60upx;
				}

				.time {
					position: absolute;
					right: 0upx;
					height: 72upx;
					width: 184upx;
					background-color: #F5F5F5;
					color: #3B3B3B;
					line-height: 40upx;
					font-size: 28upx;
					font-weight: 600;
					text-align: center;
					display: inline-block;
					box-sizing: border-box;
					vertical-align: middle;
					padding: 16upx 22upx;
					border-radius: 8upx;
					z-index: 2;

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

			.errorTip::after {
				content: "手机号输入有误";
				position: absolute;
				display: block;
				bottom: -49upx;
				height: 33upx;
				color: #FF1836;
				font-size: 24upx;
				text-align: center;
				line-height: 24upx;
				right: 0;
				left: 0;
			}
		}

		.login-button {
			margin-bottom: 32upx;

			button {
				width: 654upx;
				height: 104upx;
				background-color: #333333;
				color: #FFFFFF;
				font-size: 36upx;
				line-height: 104upx;

				&.disabled {
					background-color: #D9D9D9;
				}

				&.clicking {
					background-image: linear-gradient(-90deg, #000000 0%, #333333 100%);
				}
			}

		}

		.shop-button {
			margin-bottom: 32upx;

			button {
				width: 654upx;
				height: 104upx;
				background-color: #FB6947;
				color: #FFFFFF;
				font-size: 36upx;
				line-height: 104upx;

				&.disabled {
					background-color: #D9D9D9;
				}

				&.clicking {
					background: #E55D3E;
				}
			}
		}

		input {
			font-weight: bold;
		}

	}

	button::after {
		border: none;
	}
</style>
