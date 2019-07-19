<template>
	<view class="page_wrapper">
		<view class="block">
			<view class="content">
				<view class="info" @tap="middle = true">
					<!-- 支付剩余时间  -->
					<view class="time">支付剩余时间<count-down splitorColor="#999" color="#999" borderColor="#fff" :show-day="false" :minute="30"
						 :second="0"></count-down>
					</view>
					<view class="price">{{amount}}元</view>
					<view class="order-number">订单号：{{orderNo}}</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="content">
				<view class="pay-type">
					<view class="item wxpay" @tap="paytype = 'wxpay'">
						<view class="weixin">微信支付</view>
						<text v-bind:class="{ 'moti-round': !(paytype === 'wxpay'), 'moti-duihao': paytype === 'wxpay' }" class="iconfont"></text>
					</view>
					<view class="item" @tap="paytype = 'alipay'">
						<view class="alipay">支付宝</view>
						<text v-bind:class="{ 'moti-round': !(paytype === 'alipay'), 'moti-duihao': paytype === 'alipay' }" class="iconfont"></text>
					</view>
				</view>
				<!-- <view class="pay-list">
					<view class="row" @tap="paytype='alipay'">
						<view class="left">
							<image src="/static/alipay.png"></image>
						</view>
						<view class="center">
							支付宝支付
						</view>
						<view class="right">
							<radio :checked="paytype=='alipay'" color="#ff0000" />
						</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
						<view class="left">
							<image src="/static/wxpay.png"></image>
						</view>
						<view class="center">
							微信支付
						</view>
						<view class="right">
							<radio :checked="paytype=='wxpay'" color="#ff0000" />
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view class="pay">
			<view class="pay-btn-box">
				<view class="pay-btn" @tap="pay">确认支付 ￥{{amount}}</view>
			</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms" @tap="agreement">
					《条款协议》
				</view>
			</view>
		</view>
		<view class="payhtml" v-if="payHtml" v-html="payHtml">

		</view>
	</view>
</template>

<script>
	import {
		aliWapPay,
		wxPay,
		wechatPay,
		authWechat,
		queryPayStatus,
		getJsApiParam
	} from '@/common/request.js'
	import {
		isWxBrowser,
		device,
		doWXplatformPay
	} from '@/common/utils.js'
	import CountDown from '@/components/uni-countdown/uni-countdown'
	import md5 from 'js-md5'
	// import sdk from '@/common/jssdk.js'

	export default {
		data() {
			return {
				options: {},
				amount: 0,
				orderNo: '',
				price: '',
				paytype: 'wxpay', //支付类型
				payHtml: '',
				timeDown: '',
				spuName: ''
			};
		},
		components: {
			CountDown
		},
		onLoad(options) {
			console.log('options', options)
			// 处理去微信授权又回来的情况
			this.options = uni.getStorageSync('orderParam')
			for (let item in options) {
				this.options[item] = options[item]
			}
			this.orderNo = this.options.orderNo // 流水号
			this.amount = this.options.price //  订单金额
			this.spuName = this.options.spuName
			if (options.code) {
				this.jssdkPay()
			}
		},
		onShow() {
			this.queryPayStatus()
		},
		methods: {
			async startPayment() {
				// 支付方式分流
				console.log('startPayment')
				this.paytype === 'alipay' ? this.aliPay() : this.wxPayCheck()
			},
			async queryPayStatus() {
				const res = await queryPayStatus(this.orderNo, this.paytype === 'alipay' ? '1' : '2')
				if (res.code == 30) {
					uni.redirectTo({
						url: `/pages/payWay/success?orderNo=${this.orderNo}&price=${this.amount}&paymentType=2&isPayed=1`
					})
				}
			},
			pay() {
				if (this.paytype === 'alipay') {
					this.aliPay()
				} else {
					this.wxPayCheck()
				}
			},
			// 支付宝支付
			async aliPay() {
				uni.showLoading({
					title: '支付中...'
				});


				let res = await aliWapPay(
					`http://daojia.gray.motivape.cn/#/pages/payWay/success?paymentType=1&orderNo=${this.orderNo}&price=${this.amount}&isPayed=1`,
					this.orderNo)

				if (res.code == 0) {
					this.payHtml = res.result // 接受到跳转支付宝页面表单HTML
					this.$nextTick(() => {
						document.forms[0].submit();
					})
				} else {
					uni.showToast({
						title: `${res.msg}`,
						icon: 'none'
					})
				}


			},
			wxPayCheck() { // 微信支付前效验浏览器（微信浏览器不能用H5微信支付）
				isWxBrowser() ?
					this.jssdkPay() // 跳出微信弹窗
					:
					this.wxPay() //  进行微信支付
			},
			async jssdkPay() { // 微信内部的JSSDK支付
				// uni.showModal({
				// 	content: '暂不支持微信内支付，请用外部浏览器打开',
				// 	showCancel: false
				// })
				if (!this.options.code) {
					const href = location.href.split('?')
					const url = href[0]
					uni.setStorageSync('orderParam', this.options)
					location.replace(
						`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=homec`
					)
				} else if (this.options.code) {
					const code = this.options.code
					const authRes = await authWechat(code)
					// code只可以用一次的
					delete this.options.code
					// console.log(result)
					if (authRes.code == 0) {
						const wxJsRes = await wechatPay(this.options.orderNo, this.options.spuName)
						if (wxJsRes.code == 0) {
							const apiParams = await getJsApiParam(wxJsRes.result)
							if (apiParams.code == 0) {
								// 标记已经掉调起过支付
								function onBridgeReady() {
									let signStr = `appId=${apiParams.result.appid}&nonceStr=${apiParams.result.nonce_str}&package=${apiParams.result.package}&signType=MD5&timeStamp=${apiParams.result.timeStamp}&key=58Lei2Yan95kE42jI17mo87TI5312640`
									let sign = md5(signStr).toUpperCase()
									WeixinJSBridge.invoke('getBrandWCPayRequest', {
										"appId": apiParams.result.appid, //公众号名称，由商户传入     
										"timeStamp": apiParams.result.timeStamp, //时间戳，自1970年以来的秒数     
										"nonceStr": apiParams.result.nonce_str, //随机串     
										"package": apiParams.result.package,
										"signType": apiParams.result.signType, //微信签名方式：     
										// "paySign": apiParams.result.paySign ,//微信签名 
										"paySign": sign //微信签名 
									}, function(res) {
										if (res.err_msg == "get_brand_wcpay_request:ok") {
											uni.removeStorageSync('orderParam')
											uni.redirectTo({
												url: `/pages/payWay/success?orderNo=${this.options.orderNo}&price=${this.amount}&paymentType=2&isPayed=1`
											})
											// 使用以上方式判断前端返回,微信团队郑重提示：
											//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
										} else {
											uni.showToast({
												title: '支付失败',
												icon: 'none'
											})
										}
									});
								}
								if (typeof WeixinJSBridge == "undefined") {
									if (document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
									} else if (document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
										document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
									}
								} else {
									onBridgeReady();
								}
							}
						}
					}
				}
			},
			// 微信外浏览器的微信支付
			async wxPay() {
				// uni.showLoading({
				// 	title: '支付中...'
				// });
				let res = await wxPay(this.orderNo)
				if (res.code == 0) {
					uni.hideLoading()
					// this.wxPayResult() // 显示 微信支付结果选择弹窗
					window.location.href = res.result // 跳转到微信支付页面
				}
			},
			wxPayResult() { // 微信支付结果确认
				setTimeout(() => {
					uni.showModal({
						content: "是否完成微信支付？",
						confirmText: "完成",
						cancelText: "重新支付",
						success: (res) => {
							if (res.confirm) { // 如果点击 完成支付，那么跳转到订单详情页面
								uni.navigateTo({
									url: '/pages/payWay/success?orderNo=' + this.orderNo + '&price=' + this.amount + '&paymentType=2'
								})
							}
						}
					})
				}, 1000)
			},
			agreement() { // 用户使用协议跳转
				uni.navigateTo({
					url: '/pages/payWay/agreement'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page_wrapper {
		overflow: auto;

		.msg {
			overflow: auto;
		}
	}

	.block {
		width: 94%;
		padding: 0 3% 40upx 3%;
		background-color: #fff;
		margin-top: 20upx;

		.title {
			width: 100%;
			font-size: 34upx;
		}

		.content {
			.info {
				width: 100%;
				height: 170upx;
				padding: 24upx 0;
				background: #ffffff;
				margin: 20upx 0;
				text-align: center;

				.time {
					height: 40upx;
					font-size: 28upx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 40upx;
					padding-bottom: 24upx;
				}

				.price {
					height: 66upx;
					font-size: 48upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 66upx;
					padding-bottom: 8upx;
				}

				.order-number {
					height: 32upx;
					font-size: 22upx;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 32upx;
				}
			}

			.pay-type {
				padding: 0 40upx;
				background-color: #ffffff;

				.iconfont {
					width: 32upx;
					height: 32upx;
					line-height: 32upx;
					border-radius: 100%;
				}

				.moti-duihao {
					color: #ffffff;
					background: rgba(250, 70, 80, 1);
				}

				.item {
					display: flex;
					height: 40upx;
					padding: 28upx 0;
					font-size: 30upx;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 40upx;

					&.wxpay {
						border-bottom: 2upx solid #e6e6e6;
					}

					.weixin {
						flex: 1;
						padding-left: 76upx;
						background-image: url('/static/weixin.png');
						background-repeat: no-repeat;
						background-position: left center;
						background-size: 46upx 40upx;
					}

					.alipay {
						flex: 1;
						padding-left: 76upx;
						background-image: url('/static/zhifubao.png');
						background-repeat: no-repeat;
						background-position: left center;
						background-size: 44upx;
					}
				}
			}

			.pay-list {
				width: 100%;
				border-bottom: solid 1upx #eee;

				.row {
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;

					.left {
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;

						image {
							width: 80upx;
							height: 80upx;
						}
					}

					.center {
						width: 100%;
						font-size: 30upx;
					}

					.right {
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}

	.pay {
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.pay-btn-box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 702upx;
			height: 76upx;
			background: rgba(255, 255, 255, 1);
			padding: 12upx 24upx;

			.pay-btn {
				width: 702upx;
				height: 76upx;
				background: rgba(250, 70, 80, 1);
				border-radius: 8upx;
				font-size: 28upx;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 76upx;
				text-align: center;
			}
		}

		.tis {
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;

			.terms {
				color: #5a9ef7;
			}
		}
	}
</style>
