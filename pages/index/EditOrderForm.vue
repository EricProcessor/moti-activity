<template>
	<view>
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
			<view class="credible-groups" v-if="isShowcredible">
				<view class="credible-labels">
					<view class="item-label">
						官方发货
					</view>
					<view class="item-label">
						消费者保障服务
					</view>
					<view class="item-label">
						包邮
					</view>
					<view class="item-label">
						假一赔三
					</view>
				</view>
				<view class="saleable-qty">
					剩余 93
				</view>
			</view>

		</view>
		<!-- 颜色属性 -->
		<view class="attrs_wrapper">
			<!-- 改变index时选中的颜色不改变, 只要触发页面任何一次更新才生效 -->
			<view class="current">{{currentSpecIndex}}</view>
			<view class="colors_header">选择规格</view>
			<view class="colors">
				<view class="color" hover-class="none" :class="{active: index == currentSpecIndex, mr0: (index + 1) % 4 === 0}"
				 v-for="(item, index) in spec" :key="index" @touchend="chooseSpec" :data-index="index">{{item.text}}</view>
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
		<view class="attrs_wrapper">
			<view class="colors_header" @tap="taggleTaste">
				<text>我要新增其他口味（可选）</text>
				<text class="price" v-show="isShowTastes">
					<text class="icon_rmb">¥</text>
					<text class="price_num">{{tasteTotal}}</text>
				</text>
				<image src="/static/images/icons/arrow_up.png" v-show="isShowTastes"></image>
				<image src="/static/images/icons/add.png" v-show="!isShowTastes"></image>
			</view>
			<view class="colors" v-show="isShowTastes">
				<view class="color" :class="{active: index === currentTasteIndex, mr0: (index + 1) % 4 === 0}" v-for="(item, index) in goods.taste"
				 :key="index" @tap="chooseTaste" :data-index="index">{{item.text}}</view>
			</view>

			<view class="nums_header" v-show="isShowTastes">
				<text>数量</text>
				<view class="nums-handle">
					<view class="text-icon del" @click="numsDownTaste">-</view>
					<view class="text-num">{{buyNumbersTaste}}</view>
					<view class="text-icon add" @click="numsUpTaste">+</view>
				</view>
			</view>
		</view>
		<view class="form-wrapper">
			<!-- <view id="anchor"></view> -->
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

					<view class="input">
						<input type="text" placeholder-style="color: #b6b6b6;" :placeholder="item.placeholder" v-model="item.value">
					</view>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {

		checkMobile,

	} from "@/common/utils.js";
	import Goods from "./goods.js"
	export default {
		data() {
			return {
				currentSpecIndex: 0,
				currentTasteIndex: "",
				buyNumbersColor: 1,
				buyNumbersTaste: 0,
				isShowTastes: false,
				spec: Goods.spec,
				backgrounds: Goods.backgrounds,
				goods: Goods.goods,
				userInfo: [{
						text: "收货人 *",
						value: "",
						placeholder: "请输入"
					},
					{
						text: "联系方式 *",
						value: "",
						placeholder: "请输入"
					},
					// , {
					// 	text: '地区 *',
					// 	value: '',
					// 	placeholder: '请输入'
					// },
					{
						text: "详细地址 *",
						value: "",
						placeholder: "请输入"
					},

				],

			}
		},
		props: {
			isClear: {
				type: Boolean,
				default: false,
			},
			initData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			paramType:{
				type:Number,
				default:7
			}
		},
		computed: {
			tasteTotal() {
				return this.buyNumbersTaste * 35.00
			},
			totalPrice() {
				return this.buyNumbersColor * 199;
			},
			isShowcredible(){
				return this.paramType == 15
			}
		},
		watch: {
			isClear() {

				this.currentSpecIndex = 0;
				this.buyNumbersColor = 1;
				this.currentTasteIndex = "";
				this.buyNumbersTaste = 0;

				this.userInfo = [{
						text: "收货人 *",
						value: "",
						placeholder: "请输入"
					},
					{
						text: "联系方式 *",
						value: "",
						placeholder: "请输入"
					},
					{
						text: "详细地址 *",
						value: "",
						placeholder: "请输入"
					},
				];
			}

		},
		created() {
			console.log("child init ..", this.initData)
			if (!this.initData || JSON.stringify(this.initData) === '{}') return;
			this.userInfo = Object.assign(this.userInfo, this.initData.userInfo)
			this.buyNumbersColor = this.initData.buyNumbersColor
			this.buyNumbersTaste = this.initData.buyNumbersTaste
			this.currentSpecIndex = this.initData.currentSpecIndex
			this.currentTasteIndex = this.initData.currentTasteIndex
			this.isShowTastes = this.initData.isShowTastes

		},
		methods: {

			chooseSpec(e) {
				this.currentSpecIndex = Number(e.currentTarget.dataset.index);
				this.buyNumbersColor < 1 && (this.buyNumbersColor = 1) && this.sum()

			},
			chooseTaste(e) {
				let choicIndex = Number(e.currentTarget.dataset.index)
				if (this.currentTasteIndex === choicIndex) {
					this.currentTasteIndex = ""
					this.buyNumbersTaste = 0
					return
				}
				this.currentTasteIndex = Number(e.currentTarget.dataset.index);
				if (this.buyNumbersTaste < 1) this.buyNumbersTaste = 1
			},
			numsUpColor(e) {
				this.buyNumbersColor += 1;

			},
			numsDownColor(e) {
				this.buyNumbersColor > 0 && (this.buyNumbersColor -= 1);

			},
			numsUpTaste(e) {
				this.buyNumbersTaste += 1;
			},
			numsDownTaste() {
				this.buyNumbersTaste > 0 && (this.buyNumbersTaste -= 1)
			},
			numsDownColorTaste(e) {
				this.buyNumbersTaste > 1 && (this.buyNumbersTaste -= 1);
			},
			taggleTaste() {
				this.isShowTastes = !this.isShowTastes;
				if (!this.isShowTastes) {
					this.currentTasteIndex = ""
					this.buyNumbersTaste = 0
				}

			},
			checkSubmit() {

				if (!this.userInfo[0].value) {
					return {
						code: 1,
						message: "请输入收货人名称"
					}
				}
				if (!checkMobile(this.userInfo[1].value)) {
					return {
						code: 1,
						message: "请输入正确的联系电话"
					}
				}
				if (!this.userInfo[2].value) {
					return {
						code: 1,
						message: "请输入收货地址"
					}
				}
				if (this.buyNumbersColor < 1) {
					return {
						code: 1,
						message: "请选择数量"
					}
				}

				if (this.currentTasteIndex !== "" && this.buyNumbersTaste < 1) {
					return {
						code: 1,
						message: "请选择口味数量"
					}
				}
				return {
					code: 0,
					message: ""
				}
			},
			getRegisterParams() {
				return {
					userName: this.userInfo[0].value,
					mobile: this.userInfo[1].value,
					userAddress: this.userInfo[2].value,
					quickType: 4 // 活动页注册来源
				}
			},
			getOrderParams() {
				const orderInfo = {
					userName: this.userInfo[0].value,
					address: this.userInfo[2].value,
					mobile: this.userInfo[1].value,
					tobaccoSku: this.spec[this.currentSpecIndex].sku,
					tobaccoSkuNum: this.buyNumbersColor,
					cartridgesSku: this.currentTasteIndex === "" ? "" : this.goods.taste[this.currentTasteIndex].sku,
					cartridgesSkuNum: this.currentTasteIndex === "" ? 0 : this.buyNumbersTaste
				};
				return orderInfo
			}

		}
	}
</script>

<style lang="scss" scoped>
	.goods_info_popup {
		position: relative;
		margin-top: 20upx;

		width: 100%;
		box-sizing: border-box;
		padding: 20upx 45upx;
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

		.credible-groups {
			margin-top: 38upx;
			display: flex;
			justify-content: space-between;

			.credible-labels {
				display: flex;

				.item-label {
					box-sizing: border-box;
					border: 1upx solid #fb8c00;
					color: #fb8c00;
					font-size: 22upx;
					margin-left: 10upx;
					border-radius: 4upx;
					padding: 0 6upx;
					height: 34upx;
					line-height: 34upx;
				}

				:first-child {
					margin-left: 0upx;
				}
			}

			.saleable-qty {
				font-size: 26upx;
				color: #a0a0a0;
				height: 34upx;
				line-height: 34upx;
			}
		}


	}

	.attrs_wrapper {
		position: relative;
		padding: 0 45upx 50upx 45upx;
		text-align: left;
		padding-top: 50upx;
		background-color: #fff;

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
		background: #fff;
		padding: 0.1upx 0;

		#anchor {
			position: absolute;
			height: 1upx;
			top: -1200upx;
			background: transparent;
		}

		.form-data {
			padding: 0 45upx 0upx 45upx;

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
					margin-top: 13upx;

					.pay_inline {}

					.pay_got {
						// margin-left: 39upx;
					}
				}
			}
		}
	}
</style>
