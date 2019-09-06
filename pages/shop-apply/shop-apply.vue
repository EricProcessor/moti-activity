<template>
	<view class="content">
		<view v-if="0" class="header-title">
			<text>MOTI魔笛9 - 10月限时福利活动</text>
		</view>
		<view class="form">
			<view class="form-title">门店申请</view>
			<view class="form-item">
				<text class="item-title">代理商</text>
				<!-- <input value="海口东岭贸易有限公司"></input> -->
				<picker mode="selector" range-key="operatorName"  :value="agentIndex" :range="agents" ref="agent" @change="selectAgent"
				 style="width: 73%;height: 45upx;">
					<view class="uni-input" :class="{placeholder:agentIndex === 0}">
						{{agents[agentIndex].operatorName}}
					</view>
				</picker>
				<i class="iconfont right" @click="choicAgent"></i>
			</view>
			<view class="form-item">
				<text class="item-title">选择门店</text>
				<picker mode="selector"  range-key="shopName" :value="index" :range="range" ref="picker"
				 @change="selectShop" style="width: 73%;height: 45upx;">
					<view class="uni-input" :class="{placeholder:index === 0}">
						{{range[index].shopName}}
					</view>
				</picker>
				<i class="iconfont right" @click="choicShop"></i>
			</view>
			<view class="form-item">
				<text class="item-title">促销员</text>
				<input placeholder="请输入姓名" v-model="form.activityManager" placeholder-style="font-size: 32upx;color:#c6c6c6"></input>
			</view>
			<view class="form-item">
				<text class="item-title">手机号</text>
				<input type="text" v-model="form.managerPhone" placeholder="请输入手机号" placeholder-style="font-size: 32upx;color:#c6c6c6" />
			</view>
			<view class="form-item">
				<text class="item-title">验证码</text>
				<input placeholder="请输入验证码" v-model="dynamicCode" placeholder-style="font-size: 32upx;color:#c6c6c6"></input>
				<text class="time" @touchstart.native="clickVerifyBtn" @touchend.native="buttonState.clickVerifyCode = false"
				 :class="{clicking:(buttonState.clickVerifyCode || getVerifyIng),disabled:!matchMobile()}" @click="getVerifyCode">{{verifyCodeMsg}}</text>
			</view>
			<view class="form-submit">
				<button @click="submit" :class="{disabled:!isCanSubmit}">申请</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shopApply,
		registVerify,
		shops,
		getAgent
	} from "../../common/js/interface/register.js"
	import {
		ActivityId,
		GoodsUrl
	} from "../../common/js/common/const.js"
	export default {
		data() {
			return {
				index: 0,
				agentIndex: 0,
				range: [{
					id: 0,
					shopName: '请选择门店'
				}, ],
				agents: [{
					id: 0,
					operatorName: "请选择代理商"
				}, ],
				buttonState: {
					clickVerifyCode: false, //点击获取验证码
				},

				verifyCodeMsg: "获取验证码",
				getVerifyIng: false, //是否获取验证码中
				intervalID: "",
				dynamicCode: '',
				form: {
					agentId: 0,
					shopId: 0,
					activityId: ActivityId,
					activityManager: '',
					managerPhone: '',
					shopActivityUrl: GoodsUrl

				}

			}
		},
		computed: {
			isCanSubmit() {
				if (this.form.activityManager && this.form.managerPhone && this.dynamicCode) return true
				return false
			}
		},
		methods: {
			matchMobile() {
				if (!(/^1[1-9][0-9]\d{8}$/.test(this.form.managerPhone))) {
					return false
				}
				return true
			},
			clickVerifyBtn() {
				this.buttonState.clickVerifyCode = true
			},
			pushRoute() {
				uni.navigateTo({
					url: '/pages/my-order/my-order',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async getVerifyCode() {

				if (!this.matchMobile()) return false
				if (this.getVerifyIng) return false
				this.getVerifyIng = true;
				let count = 60;
				this.verifyCodeMsg = count + "s"
				this.intervalID = setInterval(() => {
					count--
					this.verifyCodeMsg = count + "s"
					if (count <= 0) {
						clearInterval(this.intervalID)
						this.verifyCodeMsg = "获取验证码"
						this.getVerifyIng = false
					}
				}, 1000)
				let res = await registVerify({
					phone: this.form.managerPhone,
					dynamicCodeType: '0',
					flag: '0',
					activityId: ActivityId
				})
				if (res.code !== '0') {
					clearInterval(this.intervalID)
					this.verifyCodeMsg = "获取验证码"
					this.getVerifyIng = false
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				} else {
					uni.showToast({
						title: "发送成功",
						icon: 'none'
					})
				}

			},
			choicShop() {

				if (this.form.agentId === 0) {
					uni.showToast({
						title: "请先选择代理商",
						icon: 'none'
					})
					return
				}
				this.$refs["picker"].click()
			},
			choicAgent() {
				this.$refs["agent"].click()
			},
			selectShop(e) {
				this.index = e.target.value
				this.form.shopId = this.range[this.index].id
			},
			selectAgent(e) {
				this.agentIndex = e.target.value
				this.form.agentId = this.agents[this.agentIndex].id
				this.index = 0
				this.form.shopId = 0
				this.range = [{
					id: 0,
					shopName: '请选择门店'
				}, ]
				this.shopList()

			},
			async submit() {
				console.log(this.form)
				let msg = ""
				if (this.dynamicCode.length !== 6) {
					msg = "请输入完整的验证码"
				}
				if (!this.matchMobile()) {
					msg = "请输入正确的手机号"
				}
				if (!this.form.activityManager) {
					msg = "请填写促销员名称"
				}
				if (!this.form.shopId) {
					msg = "请选择门店"
				}
				if (!this.form.agentId) {
					msg = "请选择代理商"
				}
				if (msg) {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return
				}
				let res = await shopApply({
					hdShopAttDetailModel: this.form,
					dynamicCode: this.dynamicCode,
				})
				if (res.code === '0') {
					uni.setStorageSync("token", res.result.token)
					uni.setStorageSync("shopId", res.result.shopDetail.shopId)
					uni.setStorageSync("managerShopAttId", res.result.shopDetail.id)
					uni.setStorageSync("manageQrCodeImg", res.result.shopDetail.imageUrl)
					uni.showToast({
						title: "申请成功",
						icon: 'none'
					})
					uni.redirectTo({
						url: '/pages/my-order/my-order?showQrCode=1'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

				console.log(res);
			},
			async shopList() {
				let res = await shops({
					operatorId: this.form.agentId
				})
				if (res.code === '0') {
					console.log(res);
					this.range.push(...res.result)
					console.log(this.range);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}

			},
			async agentList() {
				let res = await getAgent()
				if (res.code === '0') {
					this.agents.push(...res.result.operator)
					return
				}
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		},
		onLoad() {
			this.agentList()
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		margin: 0 48upx;
		//padding: 18upx 0;

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
			padding-top: 71upx;

			.form-title {
				font-size: 52upx;
				height: 73upx;
				color: #333333;
				margin-bottom: 92upx;
				font-weight: 600;
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
					width: 128upx;
				}

				input {
					font-size: 32upx;
				}

				.check-box {
					display: flex;
					align-items: baseline;
					margin-right: 74upx;

					i {
						height: 34upx;
						width: 34upx;
						border-radius: 6upx;
						border: 2upx #C6C6C6 solid;
						display: inline-block;
						position: relative;
						top: 6upx;
						margin-right: 16upx;
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
					height: 72upx;
					width: 184upx;
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
					width: 184upx;
					z-index: 999;

					&.clicking {
						background: #EAEAEA;
						color: #909090;
					}

					&.disabled {
						background: #F5F5F5;
						color: #C7C7C7;
					}
				}

				i {
					font-size: 32upx;
					color: #D8D8D8;
					border-radius: 50%;
					line-height: 32upx;
					position: absolute;
					right: 0upx;
					bottom: 39upx;
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

					&.disabled {
						background-color: #E55D3E;
					}

					&.button-hover {
						background: #E55D3E;
						color: #FFC5B7;
					}
				}
			}
		}
	}

	.uni-input {
		color: #333333;
		font-weight: 600;
		font-size: 32upx;
		height: 52.5upx;
		line-height: 52.5upx;

		&.placeholder {
			color: #c6c6c6;

		}
	}

	button::after {
		border: none;
	}

	input {
		font-weight: 600;
	}
</style>
