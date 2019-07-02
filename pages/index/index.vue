<template>
	<view class="page-wrapper">
		<!-- style="height: cacl(100% - 120upx)" -->
		<scroll-view class="introduction-wrapper" style="height: 86vh" :scroll-into-view="intoViewid" scroll-y="true"
		 scroll-with-animation="true" @scroll="pageScroll">
			<!-- 上半部图片 -->
			<view class="introductions">
				<block v-for="(item, index) in imgs" :key="index" >
					<swiper :indicator-dots="false" indicator-active-color="#fff" :autoplay="true" :interval="3000" v-if="index === 0">
						<swiper-item class="swiper-item" v-for="(item, index) in banners" :key="index">
								<image :src="item"></image>
						</swiper-item>
					</swiper>
					<image v-else :src="'../../static/images/package/' + item" mode="widthFix"></image>
					<!-- <img> -->
				</block>
				<!-- <img v-for="(item, index) in imgs" :key="index" :src="'../../activity/static/images/package/' + item"> -->
				<!--  -->
				<view class="dynamic_wrapper"><dynamic></dynamic></view>
			</view>

			<!-- 商品信息 -->
			<view class="goods_info_popup">
				
				<view class="base_info">
					<image class="poster" :src="backgrounds[currentSpecIndex]"></image>
					<view class="info_text">
						<view class="price">
							<text class="icon_rmb">¥</text>
							<text class="number">{{goods.price}}</text>
							<text class="source_price">原价{{goods.sourcePrice}}</text>
						</view>
						<view class="title">
							<text class="title_text">{{goods.title}}</text>
							<text class="desc_text">(1烟杆+1经典烟草烟弹)</text>
						</view>
					</view>
				</view>

			</view>
			<!-- 颜色属性 -->
			<view class="attrs_wrapper">
				<!-- 改变index时选中的颜色不改变, 只要触发页面任何一次更新才生效 -->
				<view class="current">{{currentSpecIndex}}</view>
				<view class="colors_header">选择规格</view>
				<view class="colors">
					<view class="color" hover-class="none" :class="{active: index == currentSpecIndex, mr0: (index + 1) % 4 === 0}" v-for="(item, index) in spec"
					 :key="index" @touchend="chooseSpec" :data-index="index">{{item.text}}</view>
				</view>

				<view class="nums_header">
					<text>数量</text>
					<view class="nums-handle">
						<view class="text-icon del" @click="numsDownColor">-</view>
						<view class="text-num">{{buyNumbersColor}}</view>
						<view class="text-icon add" @click="numsUpColor">+</view>
					</view>
				</view>
				<view class="nums_header">
					<text>共计</text>
					<view class="total_price">
						<text class="icon_rmb">¥</text>
						<text class="price">{{totalPrice}}</text>
					</view>
				</view>
			</view>


			<view style="height: 20upx;background: #eee"></view>

			<!-- 口味属性 -->
			<!-- <view class="attrs_wrapper">
				<view class="colors_header" @tap="taggleTaste">
					<text>选择口味</text>
					<text class="price" v-show="isShowTastes">
						<text class="icon_rmb">¥</text>
						<text class="price_num">39</text>
					</text>
					<image src="/static/images/icons/arrow_up.png" v-show="isShowTastes"></image>
					<image src="/static/images/icons/add.png" v-show="!isShowTastes"></image>
				</view>
				<view class="colors" v-show="isShowTastes">
					<view class="color" :class="{active: index == currentTasteIndex, mr0: (index + 1) % 4 === 0}" v-for="(item, index) in goods.taste"
					 :key="index" @tap="chooseTaste" :data-index="index">{{item}}</view>
				</view>

				<view class="nums_header" v-show="isShowTastes">
					<text>数量</text>
					<view class="nums-handle">
						<view class="text-icon del" @click="numsDownTaste">-</view>
						<view class="text-num">{{buyNumbersTaste}}</view>
						<view class="text-icon add" @click="numsUpTaste">+</view>
					</view>
				</view>
			</view> -->


			<!-- 中间表单 -->
			<!-- <view style="height: 20upx;background: #eee"></view> -->
			<view class="form-wrapper">
				<view id="anchor"></view>
				<view class="form-data">
					<view class="take_info">
						<view class="line_1">RECEIVING INFORMATION</view>
						<view class="line_2">收货信息</view>
						<view class="line_3">填写订单后MOTI客服将会与您确认订单</view>
					</view>
					<view class="input-item" v-for="(item, index) in userInfo" :key="index">
						<view class="text">{{item.text}}</view>
						<!-- <view class="choose_location" v-if="index === 2">
							<picker class="picker" :range="provinceData" range-key="label" @change="provinceChnage">
								<view class="picker_text">
									<view class="text" :class="{choosed: provinceName}">{{provinceName || '请选择'}}</view>
									<image src="/static/images/icons/arrow_down.png"></image>
								</view>
							</picker>
							<picker class="picker" :range="cityData[provinceIndex]" range-key="label" @change="cityChange">
								<view class="picker_text">
									<view class="text" :class="{choosed: cityName}">{{cityName || '请选择'}}</view>
									<image src="/static/images/icons/arrow_down.png"></image>
								</view>
							</picker>
							<picker class="picker" :range="areaData[provinceIndex][cityIndex]" range-key="label" @change="areaChange">
								<view class="picker_text">
									<view class="text" :class="{choosed: areaName}">{{areaName || '请选择'}}</view>
									<image src="/static/images/icons/arrow_down.png"></image>
								</view>
							</picker>
						</view> -->
						<view class="pay_way" v-if="index === 3">
							<!-- <view class="pay_inline" @tap="choosePayWay('online')" :class="{active: payWay === 'online'}">在线支付</view> -->
							<view class="pay_got" @tap="choosePayWay('offline')" :class="{active: payWay === 'offline'}">货到付款</view>
						</view>
						<view class="input" v-else>
							<input type="text" placeholder-style="color: #b6b6b6;" :placeholder="item.placeholder" v-model="item.value">
						</view>
					</view>
				</view>
			</view>


			<!-- 最后一张图片 -->

			<!-- <img class="comments" :src="'../../activity/static/images/package/' + lastImg"> -->
			<img class="comments" :src="'../../static/images/package/' + lastImg">

			<!-- 提交信息后弹出卡片 -->
			<view class="mask-card" v-if="isShowPopupCard">
				<view class="card-content">
					<image class="close-icon" @tap="closePopup" src="../../static/images/icons/close.png"></image>
					<view class="content">
						<view class="title">
							<image :src="submitState > 0 ? '../../static/images/icons/success_2.png' : '../../static/images/icons/failed.png'"></image>
							<text :class="{'red-text': submitState > 0}">{{submitState > 0 ? '订单提交成功' : '订单提交失败'}}</text>
						</view>
						<text class="text">{{popupCardText}}</text>
						<view class="btn" @click="goMoti">查看更多商品</view>
					</view>
				</view>
			</view>


		</scroll-view>
		<view class="submit-btn" @click="submit">
			<image v-if="buyNumbersColor == 0" src="../../static/images/icons/buy.jpg"></image>
			<view v-else class="sub_order">提交订单</view>
		</view>

	</view>

</template>

<script>
	import {
		post,
		checkMobile
	} from '@/common/utils.js'
	import provinceData from '@/common/city-data/province.js'
	import cityData from '@/common/city-data/city.js'
	import areaData from '@/common/city-data/area.js'
	import dynamic from './dynamic.vue'

	export default {
		config: {
			disableScroll: true
		},
		components: {
			dynamic
		},
		data() {
			return {
				banners: [
					'/static/images/banners/swiper_1.jpg',
					'/static/images/banners/swiper_2.jpg',
					'/static/images/banners/swiper_3.jpg'
				],
				provinceData: provinceData,
				cityData: cityData,
				areaData: areaData,
				totalPrice: 0,
				backgrounds: [
					'/static/images/1.jpg',
					'/static/images/2.jpeg',
					'/static/images/3.jpg',
					'/static/images/4.jpg',
					'/static/images/5.jpg',
					'/static/images/6.jpg',
					'/static/images/7.jpeg'
				],
				goods: {
					imgUrl: '/static/images/icons/goods_bg.png',
					price: '199.00',
					sourcePrice: '399',
					title: 'MOTI D11 电子烟套装 雾化 换蛋小烟',
					taste: [
						'经典烟草',
						'冰镇菠萝',
						'绿豆冰沙',
						'风情芒果',
						'激爽薄荷',
						'甜心草莓',
						'清甜西瓜',
						'清培绿茶'
					]
				},
				spec: [{
						text: '燕尾黑',
						sku: '112492575139'
					}, {
						text: '极光渐变',
						sku: '586197169359'
					}, {
						text: '深海蓝',
						sku: '112492578591'
					}, {
						text: '星辰银',
						sku: '112492577675'
					}, {
						text: 'C位红',
						sku: '112492575156'
					}, {
						text: '柠檬黄',
						sku: '112492577641'
					}, {
						text: '八重樱',
						sku: '112492579519'
					}],
				orderSource: '',
				imgs: [],
				lastImg: '',
				lastImgs: [
					'package_7/10.jpg',
					'package_1/5.jpg',
					'package_2/5.jpg',
					'package_3/6.jpg',
					'package_4/5.jpg',
					'package_5/6.jpg',
					'package_6/6.jpg'
				],
				imgs1: ['package_7/1.jpg', 'package_7/2.jpg', 'package_7/3.jpg', 'package_7/4.jpg', 'package_7/5.jpg',
					'package_7/6.jpg',
					'package_7/7.jpg',
					'package_7/8.jpg',
					'package_7/9.jpg',
				],
				imgs2: ['package_1/1.jpg', 'package_1/2.jpg', 'package_1/3.jpg', 'package_1/4.jpg'],
				imgs3: ['package_2/1.jpg', 'package_2/2.jpg', 'package_2/3.jpg', 'package_2/4.jpg'],
				imgs4: ['package_3/1.jpg', 'package_3/2.jpg', 'package_3/3.jpg', 'package_3/4.jpg', 'package_3/5.jpg'],
				imgs5: ['package_4/1.jpg', 'package_4/2.jpg', 'package_4/3.jpg', 'package_4/4.jpg'],
				imgs6: ['package_5/1.jpg', 'package_5/2.jpg', 'package_5/3.jpg', 'package_5/4.jpg', 'package_5/5.jpg'],
				imgs7: ['package_6/1.jpg', 'package_6/2.jpg', 'package_6/3.jpg', 'package_6/4.jpg', 'package_6/5.jpg'],
				
				userInfo: [{
					text: '收货人 *',
					value: '',
					placeholder: '请输入'
				}, {
					text: '联系方式 *',
					value: '',
					placeholder: '请输入'
				},
				// , {
				// 	text: '地区 *',
				// 	value: '',
				// 	placeholder: '请输入'
				// }, 
				{
					text: '详细地址 *',
					value: '',
					placeholder: '请输入'
				}, {
					text: '支付方式',
					value: '',
					placeholder: '请输入'
				}],
// 				typeAndNums: [{
// 						radioText: '星辰银',
// 						checked: true,
// 
// 						number: 1,
// 						skuId: 112492577675
// 					},
// 					{
// 						radioText: '燕尾黑',
// 						checked: false,
// 
// 						number: 1,
// 						skuId: 112492575139
// 					}
// 				],
				isShowPopupCard: false,
				submitState: -1, // -1不显示, 0提交失败, 1货到付款提交成功, 2在线支付提交成功
				popupCardText: '网络暂时离线, 请重新提交~~',
				intoViewid: '',
				currentSpecIndex: 0,
				currentTasteIndex: 0,
				buyNumbersColor: 0,
				buyNumbersTaste: 1,
				provinceIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
				provinceName: '',
				cityName: '',
				areaName: '',
				payWay: 'offline',
				isShowTastes: false
			};
		},
		onLoad(options) {
			console.log('onLoad')
			const params = options
			const paramVal = params.type ? Number(params.type) : 0
			if (paramVal >= 1 && paramVal <= 7) {
				this.imgs = this[`imgs${paramVal}`]
				this.lastImg = this.lastImgs[paramVal - 1]
			} else {
				this.imgs = this.imgs1
				this.lastImg = this.lastImgs[0]
			}
			this.orderSource = options.order_source
			this.sum()
		},
		methods: {
			jamp() {
				this.intoViewid = 'anchor'
			},
			async submit() {
				this.intoViewid = 'anchor'
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
				if (this.buyNumbersColor < 1) return uni.showToast({
					title: '请选择数量',
					icon: 'none'
				})
				// let checkRegRes = await post('/user/user/checkUserMobile', {
				// 	mobile: this.userInfo[1].value
				// })

				// 未注册
				uni.showLoading({
					title: '加载中'
				})
				let regRes = await post('/user/login/activityH5Regist', {
					userName: this.userInfo[0].value,
					mobile: this.userInfo[1].value,
					userAddress: this.userInfo[2].value,
					quickType: 4 // 活动页注册来源
				});
				if (regRes.data.code == 0) { // 注册登录成功
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
					data.pageOrder.skuId = this.spec[this.currentSpecIndex].sku
					data.pageOrder.skuNum = this.buyNumbersColor
					data.pageOrder.orderSource = this.orderSource
					// if (this.typeAndNums[0].checked && this.typeAndNums[0].number > 0) {
					// 	data.pageOrder.skuId = this.typeAndNums[0].skuId
					// 	data.pageOrder.skuNum = this.typeAndNums[0].number
					// 	data.pageOrder.orderSource = this.orderSource
					// }
					// if (this.typeAndNums[1].checked && this.typeAndNums[1].number > 0) {
					// 	data.pageOrder.skuId = this.typeAndNums[1].skuId
					// 	data.pageOrder.skuNum = this.typeAndNums[1].number
					// 	data.pageOrder.orderSource = this.orderSource
					// }
					const orderRes = await this.submitOrder(data)

				} else {
					uni.showToast({
						title: '身份信息提交失败',
						icon: 'none'
					})
				}
				uni.hideLoading()
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
			numsUpColor(e) {
				this.buyNumbersColor += 1
				this.sum()
			},
			numsDownColor(e) {
				this.buyNumbersColor > 0 && (this.buyNumbersColor -= 1)
				this.sum()
			},
			numsUpTaste(e) {
				this.buyNumbersTaste += 1
			},
			numsDownColorTaste(e) {
				this.buyNumbersTaste > 1 && (this.buyNumbersTaste -= 1)
			},
			closePopup() {
				if (this.submitState === 1) {
					this.currentSpecIndex = 0
					this.buyNumbersColor = 0
					this.userInfo = [{
						text: '收货人 *',
						value: '',
						placeholder: '请输入'
					}, {
						text: '联系方式 *',
						value: '',
						placeholder: '请输入'
					},
					{
						text: '详细地址 *',
						value: '',
						placeholder: '请输入'
					}, {
						text: '支付方式',
						value: '',
						placeholder: '请输入'
					}]
				}
				this.isShowPopupCard = false
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
				if (res.data.code == 0) {
					this.submitState = 1;
					this.popupCardText = '24小时内人工客服会与您联络请保持手机通畅'
				} else {
					this.submitState = 0;
				}
				this.isShowPopupCard = true
			},
			goMoti() {
				// uni.navigateTo({
				// 	url: 'http://mall.motivape.cn'
				// })
				location.href = 'http://mall.motivape.cn'
			},
			chooseSpec(e) {
				this.currentSpecIndex = Number(e.currentTarget.dataset.index)
			},
			chooseTaste(e) {
				this.currentTasteIndex = Number(e.currentTarget.dataset.index)
			},
			provinceChnage(e) {
				this.provinceIndex = e.detail.value
				this.provinceName = this.provinceData[this.provinceIndex].label
			},
			cityChange(e) {
				console.log(e)
				console.log(this.provinceIndex)
				console.log(this.cityData[this.cityIndex])
				this.cityIndex = e.detail.value
				this.cityName = this.cityData[this.provinceIndex][this.cityIndex].label
			},
			areaChange(e) {
				console.log(e)
				this.areaIndex = e.detail.value
				this.areaName = this.areaData[this.provinceIndex][this.cityIndex][this.areaIndex].label
			},
			choosePayWay(e = 'online') {
				this.payWay = e
			},
			taggleTaste() {
				this.isShowTastes = !this.isShowTastes
			},
			sum() {
				this.totalPrice = this.buyNumbersColor * 199
			}
		}
	}
</script>

<style lang="scss">
	.introduction-wrapper {
		.introductions {
			position: relative;
			.dynamic_wrapper {
				position: absolute;
				top: 930upx;
				left: 0;
				right: 0;
				height: 50upx;
				z-index: 1000;
			}
			swiper {
				position: relative;
				width: 100%;
				height: 980upx;
				.swiper-item {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
			image {
				display: block;
				// margin-bottom: -2upx;
				width: 100%;
			}
		}

		
		.goods_info_popup {
			position: relative;

			width: 100%;
			box-sizing: border-box;
			padding: 30upx 45upx;
			border-radius: 12upx 12upx 0 0;
			background-color: #fff;
			transition: all 0.2s;
			overflow: hidden;

			.base_info {
				background-color: #fff;
				display: flex;
				text-align: left;
				overflow: hidden;

				.poster {
					flex-shrink: 0;
					width: 180upx;
					height: 180upx;
					border-radius: 8upx;
				}

				.info_text {
					margin-left: 41upx;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.title {
						font-size: 34upx;
						line-height: 50upx;
						color: #333;

						.desc_text {
							margin-left: 10upx;
							font-size: 24upx;
							color: #999;
						}
					}

					.price {
						font-size: 50upx;
						line-height: 50upx;
						color: #fb8c00;

						.icon_rmb {
							font-size: 22upx;
						}

						.source_price {
							margin-left: 18upx;
							font-family: SourceHanSansCN-Normal;
							font-size: 26upx;
							line-height: 60upx;
							letter-spacing: 1px;
							color: #999999;
							text-decoration-line: line-through;
						}
					}
				}
			}

		}

		.attrs_wrapper {
			position: relative;
			padding: 0 45upx 50upx 45upx;
			text-align: left;
			margin-top: 50upx;
			.current {
				position: absolute;
				top: -100upx;
				left: -100upx;
			}
			.colors_header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30upx;
				line-height: 30upx;
				color: #323232;
				image {
					margin-top: -10upx;
					width: 40upx;
					height: 40upx;
				}
				.price {
					margin-right: 30upx;
					flex-grow: 1;
					text-align: right;
					color: #fb8c00;
					.icon_rmb {
						font-size: 26upx;
					}
					.price_num {
						font-size: 50upx;
					}
				}
			}

			.colors {
				display: flex;
				flex-wrap: wrap;
				margin-top: 41upx;

				.color {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 146upx;
					height: 49upx;
					flex-shrink: 0;
					margin-bottom: 14upx;
					margin-right: 25upx;
					border-radius: 8upx;
					line-height: 1;
					font-size: 22upx;
					border: 2upx solid #333;
					color: #333;
					box-sizing: border-box;

					&.mr0 {
						margin: 0;
					}

					&.active {
						background: #fb8c00;
						color: #fff;
						border: 2upx solid #fb8c00;

					}
				}
			}

			.nums_header {
				margin-top: 50upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30upx;
				line-height: 30upx;
				color: #323232;

				.nums-handle {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 296upx;
					height: 56upx;
					border: 1upx solid #b6b6b6;
					border-radius: 6upx;
					font-size: 40upx;
					color: #b6b6b6;

					.text-icon {
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 82upx;

						&.del {
							height: 100%;
							border-right: 1upx solid #b6b6b6;
						}

						&.add {
							height: 100%;
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
				
				.total_price {
					color: #fb8c00;
					.icon_rmb {
						font-size: 24upx;
					}
					.price {
						font-size: 38upx;
						font-weight: bold;
					}
				}
			}
		}

		.form-wrapper {
			position: relative;
			// background: #fff;
			padding: 0.1upx 0;
			#anchor {
				position: absolute;
				height: 1upx;
				top: -160upx;
				background: transparent;
			}


			.form-data {
				padding: 0 67upx 100upx 63upx;

				.take_info {
					text-align: center;
					line-height: 1;

					.line_1 {
						margin-top: 106upx;
						font-size: 45upx;
					}

					.line_2 {
						margin-top: 17upx;
						font-size: 55upx;
					}

					.line_3 {
						margin-top: 45upx;
						font-size: 26upx;
						color: #999;
					}
				}

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
						font-size: 30upx;
						color: #323232;

						input {
							line-height: normal;
							transform: translateZ(0);
						}
					}

					.choose_location {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.picker {
							margin-top: 23upx;
							width: 200upx;
							height: 76upx;
							border: 1px solid #b6b6b6;
							border-radius: 8upx;

							.picker_text {
								padding: 0 21upx;
								height: 76upx;
								display: flex;
								justify-content: space-between;
								align-items: center;
								.text {
									max-width: 180upx;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
									overflow: hidden;
									font-size: 34upx;
									color: #b6b6b6;
									&.choosed {
										color: #333;
									}
								}

								image {
									flex-shrink: 0;
									width: 24upx;
									height: 16upx;
								}

							}
						}

					}
					
					.pay_way {
						margin-top: 43upx;
						display: flex;
						align-items: center;
						view {
							width: 310upx;
							height: 76upx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 34upx;
							border-radius: 8upx;
							color: #b6b6b6;
							border: solid 1px #b6b6b6;
							box-sizing: border-box;
							&.active {
								color: #fff;
								border-color:  #fb8c00;
								background-color: #fb8c00;
							}
						}
						.pay_inline {
						}
						.pay_got {
							// margin-left: 39upx;
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
							color: #fb8c00;
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
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 105upx;
		background-color: #fa4650;
		font-size: 33upx;
		color: #ffffff;

		image {
			width: 100%;
			height: 100%;
		}
		.sub_order {
			width: 100%;
			height: 100%;
			background-color: #fb8c00;
			color: #fff;
			font-size: 36upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
