<template>
	<view class="introduction-wrapper">
		<!-- 上半部图片 -->
		<view class="introductions">
			<image v-for="(item, index) in imgs" :key="index" :src="item" mode="widthFix"></image>
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
		<image class="comments" :src="lastImg" mode="widthFix"></image>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [],
				lastImg: '',
				imgs1: [
					'../../static/images/introduction/1.jpg',
					'../../static/images/introduction/2.jpg',
					'../../static/images/introduction/3.jpg',
					'../../static/images/introduction/4.jpg',
					'../../static/images/introduction/package_1_5.jpg',
					'../../static/images/introduction/package_1_6.jpg',
				],
				img71: '../../static/images/introduction/package_1_7.jpg', // 第一套图片的第七张
				imgs2: [
					'../../static/images/introduction/1.jpg',
					'../../static/images/introduction/2.jpg',
					'../../static/images/introduction/3.jpg',
					'../../static/images/introduction/4.jpg',
					'../../static/images/introduction/package_2_5.jpg',
					'../../static/images/introduction/package_2_6.jpg',
				],
				img72: '../../static/images/introduction/package_2_7.jpg',
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
				]
			};
		},
		created() {
			const param = location.href.split('?')[1]
			switch (param) {
				case 'type=1':
					this.imgs = this.imgs1
					this.lastImg = this.img71
					break
				case 'type=2':
					this.imgs = this.imgs2
					this.lastImg = this.img72
					break
				default:
					this.imgs = this.imgs1
					this.lastImg = this.img71
					break
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
			image {
				display: block;
				margin-bottom: -2upx;
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
	}
</style>
