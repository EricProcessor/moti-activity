<template>
	<view class="introduction-wrapper">
		<!-- 上半部图片 -->
		<view class="introductions">
			<img v-for="(item, index) in imgs" :key="index" :src="'../../static/images/package/' + item">
		</view>
		<!-- 中间表单 -->
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


		<view class="submit-btn" @click="submit">货到满意付款</view>

		<!-- 最后一张图片 -->
		<img class="comments" :src="'../../static/images/package/' + lastImg">
		
		<!-- 提交信息后弹出卡片 -->
		<view class="mask-card" v-if="isShowPopupCard">
			<view class="card-content">
				<image class="close-icon" src="../../static/images/icons/close.png"></image>
				<view class="content">
					<view class="title">
						<image v-if="submitState === 0" src="../../static/images/icons/failed.png" mode=""></image>
						<image v-else-if="submitState === 1" src="../../static/images/icons/failed.png" mode=""></image>
						<text v-if="submitState === 0">订单提交失败</text>
						<text v-else-if="submitState === 1">订单提交成功</text>
					</view>
					<view class="text">{{popupCardText}}</view>
					<view class="btn">查看更多商品</view>					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				imgs1: [ 'package_1/1.jpg', 'package_1/2.jpg', '/package_1/3.jpg', '/package_1/4.jpg' ],
				imgs2: [ 'package_2/1.jpg', 'package_2/2.jpg', '/package_2/3.jpg', '/package_2/4.jpg' ],
				imgs3: [ 'package_3/1.jpg', 'package_3/2.jpg', '/package_3/3.jpg', '/package_3/4.jpg', '/package_3/5.jpg' ],
				imgs4: [ 'package_4/1.jpg', 'package_4/2.jpg', '/package_4/3.jpg', '/package_4/4.jpg' ],
				imgs5: [ 'package_5/1.jpg', 'package_5/2.jpg', '/package_5/3.jpg', '/package_5/4.jpg', '/package_5/5.jpg' ],
				imgs6: [ 'package_6/1.jpg', 'package_6/2.jpg', '/package_6/3.jpg', '/package_6/4.jpg', '/package_6/5.jpg' ],
				userInfo: [{
						text: '姓名*',
						value: '',
						placeholder: '请输入'
					}, {
						text: '电话*',
						value: '',
						placeholder: '请输入'
					}, {
						text: '收获地址*',
						value: '',
						placeholder: '请输入'
					},
				],
				typeAndNums: [{
						radioText: '深海蓝套装',
						checked: true,
						number: 0
					},
					{
						radioText: '深海蓝套装',
						checked: false,
						number: 0
					}
				],
				isShowPopupCard: false,
				submitState: 0,
				popupCardText: '网络问题哦~~'
			};
		},
		created() {
			const params = location.href.split('?')[1]
			const paramVal = params ? Number(params.split('=')[1]) : ''
			console.log(paramVal)
			if (paramVal >= 1 && paramVal <= 6) {
				this.imgs = this[`imgs${paramVal}`]
				this.lastImg = this.lastImgs[paramVal - 1]
			} else {
				this.imgs = this.imgs1
				this.lastImg = this.lastImgs[0]
			}
		},
		methods: {
			submit() {
				if (!this.userInfo[0].value) return uni.showToast({
					title: '请输入收货人名称',
					icon: 'none'
				})
				if (!this.userInfo[1].value) return uni.showToast({
					title: '请输入联系电话',
					icon: 'none'
				})
				if (!this.userInfo[2].value) return uni.showToast({
					title: '请输入收货地址',
					icon: 'none'
				})
				const data = {}
				if (this.typeAndNums[0].checked && this.typeAndNums[0].number > 0) {
					data.type1 = true
					data.number1 = this.typeAndNums[0].number
				}
				if (this.typeAndNums[1].checked && this.typeAndNums[1].number > 0) {
					data.type2 = true
					data.number2 = this.typeAndNums[1].number
				}
				console.log(data)
				// uni.request({
				// 	url: 'xxx',
				// 	data,
				// })
			},
			chooseType(e) {
				const index = Number(e.currentTarget.dataset.index)
				if (index === 0) {
					this.typeAndNums[0].checked ? this.typeAndNums[0].checked = false : this.typeAndNums[0].checked = true
				}
				if (index === 1) {
					this.typeAndNums[1].checked ? this.typeAndNums[1].checked = false : this.typeAndNums[1].checked = true
				}
			},
			numsUp(e) {
				const index = Number(e.currentTarget.dataset.index)
				this.typeAndNums[index].number += 1
			},
			numsDown(e) {
				const index = Number(e.currentTarget.dataset.index)
				this.typeAndNums[index].number > 0 && (this.typeAndNums[index].number -= 1)
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
							width: 23upx;
							height: 23upx;
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

		.submit-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 61upx auto 89upx auto;
			width: 610upx;
			height: 90upx;
			background-color: #fa4650;
			border-radius: 10upx;
			font-size: 33upx;
			color: #ffffff;
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
				box-shadow: 5upx 10upx 26upx 0 rgba(0,0,0,0.15);
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
							margin-right: 2upx;
							width: 40upx;
							height: 40upx;
						}
					}
					.text {
						font-size: 26upx;
						color: #999;
					}
					.btn {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 347upx;
						height: 68upx;
						border: 1upx solid #040000;
						border-radius: 5upx;
						font-size: 25upx;
						background: rgba(250,70,80, 0.05);
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
</style>
