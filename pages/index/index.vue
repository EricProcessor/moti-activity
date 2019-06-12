<template>
	<view class="page-wrapper">
		<scroll-view class="introduction-wrapper" 
			 style="height: 90vh"
			:scroll-into-view="intoViewid"
			scroll-y="true"
			scroll-with-animation="true"
			@scroll="pageScroll" >
			<!-- 上半部图片 -->
			<view class="introductions">
				<!-- <img v-for="(item, index) in imgs" :key="index" :src="'../../activity/static/images/package/' + item"> -->
				<img v-for="(item, index) in imgs" :key="index" :src="'../../static/images/package/' + item">
			</view>
			<!-- 中间表单 -->
			
			<view class="form-wrapper">
				<view id="form-wrapper"></view>
				<view class="form-data">
					<view class="input-item" v-for="(item, index) in userInfo" :key="index">
						<view class="text">{{item.text}}</view>
						<view class="input">
							<input type="text" placeholder-style="color: #b6b6b6;" :placeholder="item.placeholder" v-model="item.value">
						</view>
					</view>
				</view>
		
				<view class="nums-wrapper">
					<view class="nums-item" v-for="(item, index) in typeAndNums" :key="index">
						<view class="radio-wrapper" @click="chooseType" :data-index="index">
							<view class="radio">
								<view class="radio-inner" v-if="item.checked"></view>
							</view>
							<text class="text">{{item.radioText}}</text>
						</view>
						<view class="nums-handle">
							<view class="text-icon del" @click="numsDown" :data-index="index">-</view>
							<view class="text-num">{{item.number}}</view>
							<view class="text-icon add" @click="numsUp" :data-index="index">+</view>
						</view>
					</view>
				</view>
		
			</view>
		
		
			<!-- 最后一张图片 -->
			<!-- <img class="comments" :src="'../../activity/static/images/package/' + lastImg"> -->
			<img class="comments" :src="'../../static/images/package/' + lastImg">
		
			<!-- 提交信息后弹出卡片 -->
			<view class="mask-card" v-if="submitState >= 0">
				<view class="card-content">
					<image class="close-icon" @click="closePopup" src="../../static/images/icons/close.png"></image>
					<view class="content">
						<view class="title">
							<image :src="submitState > 0 ? '../../static/images/icons/success.png' : '../../static/images/icons/failed.png'"></image>
							<text :class="{'red-text': submitState > 0}">{{submitState > 0 ? '订单提交成功' : '订单提交失败'}}</text>
						</view>
						<text class="text">{{popupCardText}}</text>
						<view class="btn" @click="goMoti">查看更多商品</view>
					</view>
				</view>
			</view>
			
			
		</scroll-view>
		<view class="submit-btn" @click="submit">货到满意付款</view>

	</view>
	
</template>

<script>
	import { post, checkMobile } from '@/common/utils.js'
	
	export default {
		config: {
			disableScroll: true
		},
		data() {
			return {
				orderSource: '',
				imgs: [],
				lastImg: '',
				lastImgs: [
					'package_1/5.jpg',
					'package_2/5.jpg',
					'package_3/6.jpg',
					'package_4/5.jpg',
					'package_5/6.jpg',
					'package_6/6.jpg'
				],
				imgs1: ['package_1/1.jpg', 'package_1/2.jpg', 'package_1/3.jpg', 'package_1/4.jpg'],
				imgs2: ['package_2/1.jpg', 'package_2/2.jpg', 'package_2/3.jpg', 'package_2/4.jpg'],
				imgs3: ['package_3/1.jpg', 'package_3/2.jpg', 'package_3/3.jpg', 'package_3/4.jpg', 'package_3/5.jpg'],
				imgs4: ['package_4/1.jpg', 'package_4/2.jpg', 'package_4/3.jpg', 'package_4/4.jpg'],
				imgs5: ['package_5/1.jpg', 'package_5/2.jpg', 'package_5/3.jpg', 'package_5/4.jpg', 'package_5/5.jpg'],
				imgs6: ['package_6/1.jpg', 'package_6/2.jpg', 'package_6/3.jpg', 'package_6/4.jpg', 'package_6/5.jpg'],
				userInfo: [{
					text: '姓名*',
					value: '',
					placeholder: '请输入'
				}, {
					text: '电话*',
					value: '',
					placeholder: '请输入'
				}, {
					text: '收货地址*',
					value: '',
					placeholder: '请输入'
				}, ],
				typeAndNums: [{
						radioText: '星辰银',
						checked: true,
						number: 0,
						skuId: 112492577675
					},
					{
						radioText: '燕尾黑',
						checked: false,
						number: 0,
						skuId: 112492575139
					}
				],
				isShowPopupCard: false,
				submitState: -1, // -1不显示, 0提交失败, 1货到付款提交成功, 2在线支付提交成功
				popupCardText: '网络暂时离线, 请重新提交~~',
				intoViewid: ''
			};
		},
		onLoad(options) {
			console.log('onLoad')
			const params = options
			const paramVal = params.type ? Number(params.type) : 0
			if (paramVal >= 1 && paramVal <= 6) {
				this.imgs = this[`imgs${paramVal}`]
				this.lastImg = this.lastImgs[paramVal - 1]
			} else {
				this.imgs = this.imgs1
				this.lastImg = this.lastImgs[0]
			}
			this.orderSource = options.order_source
		},
		methods: {
			async submit() {
				this.intoViewid = 'form-wrapper'
				if (!this.userInfo[0].value) return uni.showToast({
					title: '请输入收货人名称',
					icon: 'none'
				})
				if (!checkMobile(this.userInfo[1].value)) return uni.showToast({
					title: '请输入正确的联系电话',
					icon: 'none'
				})
				if (!this.userInfo[2].value) return uni.showToast({
					title: '请输入收货地址',
					icon: 'none'
				})
				// let checkRegRes = await post('/user/user/checkUserMobile', {
				// 	mobile: this.userInfo[1].value
				// })

					// 未注册
					let regRes = await post('/user/login/activityH5Regist', {
						userName: this.userInfo[0].value,
						mobile: this.userInfo[1].value,
						userAddress: this.userInfo[2].value,
						quickType: 4 // 活动页注册来源
					});
					if(regRes.data.code == 0){	// 注册登录成功
						// let status = this.submitOrder();
						const data = {
							pageOrder: {
								userName: this.userInfo[0].value,
								address: this.userInfo[2].value,
								mobile: this.userInfo[1].value
							}
						}
						if (this.orderSource === 'qutoutiao') {
							data.pageOrder.orderSource = 40
						} else if (this.orderSource === 'jinritoutiao') {
							data.pageOrder.orderSource = 41
						} else {
							data.pageOrder.orderSource = 43
						}
						
						if (this.typeAndNums[0].checked && this.typeAndNums[0].number > 0) {
							data.pageOrder.skuId = this.typeAndNums[0].skuId
							data.pageOrder.skuNum = this.typeAndNums[0].number
							data.pageOrder.orderSource = this.orderSource
						}
						if (this.typeAndNums[1].checked && this.typeAndNums[1].number > 0) {
							data.pageOrder.skuId = this.typeAndNums[1].skuId
							data.pageOrder.skuNum = this.typeAndNums[1].number
							data.pageOrder.orderSource = this.orderSource
						}
						const orderRes = await this.submitOrder(data)
						if (orderRes === 0) {
							this.popupCardText = '24小时内人工客服会与您联络\n请保持手机通畅'
							this.isShowPopupCard = 1
						} else {
							this.isShowPopupCard = 0
						}
						
					}
				// const checkRegRes = await this.checkIsReg(this.userInfo[1].value)
				// console.log(checkRegRes)
				// if (checkRegRes === 0) {
				// 	console.log(2)
				// 	// 未注册
				// 	const regRes = await this.regUser()
				// 	console.log(regRes)
				// 	if (regRes === 0) {
				// 		// 注册失败
				// 		this.submitState = 0
				// 		return
				// 	}
				// }
				
			},
			pageScroll() {
				this.intoViewid = ''
			},
			chooseType(e) {
				const index = Number(e.currentTarget.dataset.index)
				this.typeAndNums[0].checked ? this.typeAndNums[0].checked = false : this.typeAndNums[0].checked = true
				this.typeAndNums[1].checked ? this.typeAndNums[1].checked = false : this.typeAndNums[1].checked = true
				
			},
			numsUp(e) {
				const index = Number(e.currentTarget.dataset.index)
				this.typeAndNums[index].number += 1
			},
			numsDown(e) {
				const index = Number(e.currentTarget.dataset.index)
				this.typeAndNums[index].number > 0 && (this.typeAndNums[index].number -= 1)
			},
			closePopup() {
				this.submitState = -1
			},
			// async checkIsReg(phone) {
			// 	// 检查是否注册
			// 	const res = await post('/user/user/checkUserMobile', {
			// 		mobile: phone
			// 	})
			// 	return res.code
			// },
			// async regUser() {
			// 	// 注册
			// 	const res = await post('/user/user/registName', {
			// 		userName: this.userInfo[0].value,
			// 		mobile: this.userInfo[1].value,
			// 		userAddress: this.userInfo[2].value,
			// 		quickType: 4 // 活动页注册来源
			// 	})
			// 	return res.code
			// },
			async submitOrder(data) {
				// 提交订单
				const res = await post('/order/activityPage/bookingActivityOrder', data, 'application/json;charset=utf-8')
				//return res.code
				console.log(res)
				if(res.data.code == 0){
					this.submitState = 1;
					// this.popupCardText = res.data.msg
					this.popupCardText = '24小时内人工客服会与您联络请保持手机通畅'
				}else{
					this.submitState = 0;
				}
			},
			goMoti() {
				// uni.navigateTo({
				// 	url: 'http://mall.motivape.cn'
				// })
				location.href = 'http://mall.motivape.cn'
			}
		}
	}
</script>

<style lang="scss">
	.introduction-wrapper {
		.introductions {
			img {
				display: block;
				// margin-bottom: -2upx;
				width: 100%;
			}
		}
		.form-wrapper {
			position: relative;
			background: #fff;
			padding: 0.1upx 0;
			#form-wrapper {
				position: absolute;
				height: 1upx;
				top: -160upx;
				background: transparent;
			}
			.form-data {
				padding: 0 67upx 0 63upx;

				.input-item {
					margin-top: 51upx;

					.text {
						line-height: 1;
						font-size: 30upx;
						color: #323232;
					}

					.input {
						padding: 27upx 0 15upx 0;
						border-bottom: 1upx solid #b6b6b6;
						font-size: 33upx;
						input{
							line-height: normal;
							transform: translateZ(0);
						}
					}
				}
			}

			.nums-wrapper {
				margin-top: 43upx;
				padding: 0 65upx;

				.nums-item {
					margin-bottom: 42upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.radio-wrapper {
						display: flex;
						justify-content: center;
						align-items: center;

						.radio {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 35upx;
							height: 35upx;
							border: solid 1upx #b6b6b6;
							border-radius: 50%;

							.radio-inner {
								width: 20upx;
								height: 20upx;
								border-radius: 50%;
								background-color: #fa4650;
							}
						}

						.text {
							margin-left: 15upx;
							font-size: 30upx;
							color: #323232;
						}
					}

					.nums-handle {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 224upx;
						height: 53upx;
						border: 1upx solid #b6b6b6;
						border-radius: 6upx;
						font-size: 40upx;
						color: #b6b6b6;

						.text-icon {
							box-sizing: border-box;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 57upx;

							&.del {
								border-right: 1upx solid #b6b6b6;
							}

							&.add {
								border-left: 1upx solid #b6b6b6;
							}
						}

						.text-num {
							flex-grow: 1;
							text-align: center;
							font-size: 29upx;
							color: #040000;
						}
					}
				}
			}

		}
		

		.comments {
			width: 100%;
		}

		.mask-card {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			// background-color: rgba(0, 0, 0, 0.5);
			z-index: 100;

			.card-content {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				width: 523.61upx;
				height: 455upx;
				border-radius: 3upx;
				background: #fff;
				box-shadow: 5upx 10upx 26upx 0 rgba(0, 0, 0, 0.15);

				.content {
					height: 271upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.title {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #333333;
						font-size: 33upx;

						image {
							margin-right: 10upx;
							width: 40upx;
							height: 40upx;
						}

						.red-text {
							color: #fa4650;
						}
					}

					.text {
						font-size: 26upx;
						color: #999;
						width: 370upx;
						text-align: center;
					}

					.btn {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 347upx;
						height: 68upx;
						border: 1upx solid #040000;
						border-radius: 10upx;
						font-size: 25upx;
						background: rgba(250, 70, 80, 0.05);
					}
				}

				.close-icon {
					position: absolute;
					top: 20upx;
					right: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}
		}
	}
	.submit-btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90upx;
		background-color: #fa4650;
		font-size: 33upx;
		color: #ffffff;
	}
	.submit-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90upx;
		background-color: #fa4650;
		font-size: 33upx;
		color: #ffffff;
	}
</style>
