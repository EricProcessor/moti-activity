<template>
	<view class="content">
		<view class="cover">
			<image src="../../static/banner.png"></image>
			<view class="shop-info">
				<view class="item-shop">门店：{{shopDetail.shopName}}</view>
				<view class="item-shop shop-address">
					<view class="shop-address-title">
						地址：
					</view>
					<view class="shop-address-value">
						{{shopDetail.shopAddress}}
					</view>
					
				</view>
				<view class="item-shop">电话：{{shopDetail.mobile}}</view>
			</view>
		</view>
		<view class="occupying-height">

		</view>
		<view class="goods-body">
			<view class="title">商品信息</view>

			<view class="goods-group">
				<view class="goods-item" :key="key" v-for="(item,key) in goods">
					<view class="item-left">
						<image :src="item.pictureUrl"></image>
						<view class="git-tag" v-if="!item.marketPrice">赠品</view>
					</view>
					<view class="item-right">
						<view class="item-right-top">
							<view class="item-goods-title">
								{{item.name}}
							</view>
							<view class="item-goods-price">
								￥{{toDecimal2(item.marketPrice)}}
							</view>
						</view>
						<view class="item-right-bottom">
							<view class="specifications">
								{{skuName[key]}}
							</view>
							<view class="item-right-button">
								<button @click="initSku(key)">选择口味</button>
							</view>
						</view>

					</view>
				</view>

			</view>

		</view>
		<view class="next-button">
			<button @click="fillForm" :disabled="!isNext" :class={active:isNext}>下一步</button>
		</view>
		<uni-popup :show="showSelectSku" position="bottom" type="bottom" mode="fixed" :h5Top="h5Top" @hidePopup="hidePopup">
			<view class="detail-wrap" v-if="selectGood">
				<view class="goods-detail">
					<view class="detail-left">
						<image :src="selectGood.pictureUrl"></image>
						<view class="gift-tag" v-if="!selectGood.marketPrice">赠品</view>
					</view>
					<view class="detail-right">
						<view class="detail-right-top">
							{{selectGood.name}}
						</view>
						<view class="detail-right-bottom">
							未成年人(未满18岁)请勿购买本产品
						</view>
					</view>
				</view>
				<view class="sku-title">颜色</view>
				<view class="goods-skus">
					<view class="sku-attr" :key="index" v-for="(item,index) in selectGood.skus" :class="{active:skuId === item.id}"
					 @click="skuId = item.id">{{item.name}}</view>
				</view>
				<view class="btn-con">
					<button @click="addOrder" :disabled="!skuId">确定</button>
				</view>
				<i class="close iconfont close-view" @click="clear"></i>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import {
		goodsInfo,
		getAttDetail
	} from "../../common/js/interface/register.js"

	export default {
		data() {
			return {
				showSelectSku: false,
				h5Top: true,
				skuId: 0,
				activityId: 0,
				shopId: '0',
				goods: [],
				currentGood: 0,
				hdGoodsSkuModel: [],
				shopDetail: {},
				skuName:{}
			}
		},
		computed: {
			selectGood() {
				return this.goods[this.currentGood]
			},
			isNext() {
				if (this.hdGoodsSkuModel.length >= this.goods.length && this.hdGoodsSkuModel.length) return true
				return false
			}
		},
		methods: {
			changePrice(good){
				if(parseInt(good.marketPrice)) good.marketPrice = 129
				return good
			},
			initSku(index) {
				this.showSelectSku = true
				this.currentGood = index
				let curGood = this.goods[index]
				for (let key in this.hdGoodsSkuModel) {
					let so = this.hdGoodsSkuModel[key]
					if (so.frontId === (curGood.id + '')) {
						this.skuId = so.id
						return
					}
				}
			},
			addOrder() {
				let obj = {
					id: this.skuId,
					frontId: this.selectGood.id + '',
					buyNum: 1
				}

				for(let sku of this.goods[this.currentGood]['skus']){
					if(sku.id === this.skuId){
						this.skuName[this.currentGood] = sku.name
						break
					}
				}
				for (let key in this.hdGoodsSkuModel) {
					let so = this.hdGoodsSkuModel[key]
					if (so.frontId === obj.frontId) {
						this.$set(this.hdGoodsSkuModel, key, obj)
						this.clear()
						return
					}
				}
				this.hdGoodsSkuModel.push(obj)
				this.clear()
				console.log(this.hdGoodsSkuModel)
			},
			clear() {
				this.skuId = 0
				this.showSelectSku = false
				this.currentGood = 0
			},
			fillForm() {
				uni.navigateTo({
					url: '/pages/fill-info/fill-info',
					success: res => {
						uni.setStorageSync("hdGoodsSkuModel", this.hdGoodsSkuModel)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			async getGoodsInfo() {
				let res = await goodsInfo({
					activityId: this.activityId,
					shopId: this.shopId + ''
				})
				if (res.code !== '0') {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					return
				}
				this.goods = res.result ? res.result : {}
				for(let item of this.goods){
					this.changePrice(item)
				}

			},
			async getShopInfo() {
				let res = await getAttDetail({
					shopId: this.shopId + '',
					activityId: this.activityId
				})
				this.shopDetail = res.result ? res.result : {}
				if(!res.result){
					uni.showToast({
						title:"门店信息获取失败",
						icon:"none"
					})
				}
				uni.setStorageSync("shopAttDetailId", this.shopDetail.shopAttDetailId)
				this.$store.commit("updateShopDetail", res.result)
			},
			toDecimal2(x) {
				let f = parseFloat(x);
				if (isNaN(f)) {
					return false;
				}
				f = Math.round(x * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + 2) {
					s += '0';
				}
				return s;
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			this.activityId = option.activityid
			this.shopId = option.shopid  + ''
			uni.setStorageSync("customerActivityId", this.activityId)
			uni.setStorageSync("customerShopId", this.shopId)

			this.getGoodsInfo()
			this.getShopInfo()
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}

	.content {
		.header-title {
			height: 52upx;
			width: 100%;
			height: 52upx;
			text-align: center;
			margin: 18upx 0;
			font-size: 37upx;
			font-weight: 600;
		}

		.cover {
			position: relative;
			width: 750upx;
			height: 393upx;

			image {
				width: 100%;
				height: 100%;
			}

			.shop-info {
				position: absolute;
				bottom: 0;
				width: 750upx;
				box-sizing: border-box;
				padding: 20upx 32upx;
				//opacity: 0.8;
				//background: #03574A;
				background: rgba(3, 87, 74, 0.6);
				.shop-address{
					display: flex;
					.shop-address-title{
						
						display: inline-block;
					}
					.shop-address-value{
						display: inline-block;
						//margin-left: 80upx;
						width: 606upx;
					}
				}
				.item-shop {
					min-width: 60upx;
					opacity: 1;
					//white-space: nowrap;
					font-size: 22upx;
					color: #ffffff;
					margin-bottom: 3upx;
					z-index: 2000;
				}

				:last-child {
					margin-bottom: 0upx;
				}
			}

		}

		.occupying-height {
			height: 32upx;
			background-color: #FFFFFF;
		}

		.goods-body {
			padding: 0 32upx;
			background-color: #FFFFFF;

			.title {
				font-size: 28upx;
				color: #333333;
				margin-bottom: 32upx;
				height: 40upx;
				line-height: 40upx;
				font-weight: 600;
			}

			.goods-group {
				&:first-child {
					padding-top: 0;
					background-color: red;
				}

				.goods-item {
					display: flex;
					padding: 24upx 0;
					border-bottom: 1upx #E3E5E6 solid;

					.item-left {
						width: 148upx;
						height: 148upx;
						position: relative;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}

						.git-tag {
							position: absolute;
							bottom: 0;
							right: 0;
							height: 32upx;
							width: 64upx;
							background-color: #ff4e4e;
							color: #FFFFFF;
							font-size: 20upx;
							text-align: center;
							border-radius: 0 0 4upx 0;
						}
					}

					.item-right {
						padding: 13upx 0 0 24upx;
						position: relative;
						width: 100%;

						.item-right-top {
							display: flex;
							align-items: baseline;

							.item-goods-title {
								height: 66upx;
								width: 386upx;
								font-size: 24upx;
								color: #333333;
								display: inline-block;
							}

							.item-goods-price {
								display: inline-block;
								font-size: 24upx;
								position: absolute;
								right: 0;
								text-align: right;
							}
						}

						.specifications {
							position: absolute;
							bottom: 0upx;
							color: #999999;
							font-size: 22upx;
							height: 48upx;
							line-height: 48upx;
						}

						.item-right-button {
							position: absolute;
							bottom: 0;
							right: 0;

							button {
								font-family: PingFangSC-Medium;
								font-size: 24upx;
								color: #FFFFFF;
								background-color: #FB6947;
								text-align: center;
								line-height: 48upx;
								background: #FB6947;
								border-radius: 6upx;
								width: 148upx;
								padding: 0;
								height: 48upx;

								&.button-hover {
									background: #E55D3E;
									color: #FFC5B7;
								}
							}
						}

					}
				}

				:last-child {
					border: none;
				}
			}

		}

		.next-button {
			height: 104upx;
			width: 100%upx;
			margin-bottom: 31upx;
			margin-top: 198upx;
			text-align: center;

			button {
				background: #d9d9d9;
				border-radius: 9px;
				width: 590upx;
				height: 104upx;
				line-height: 104upx;
				color: #FFFFFF;
				font-size: 38upx;
				font-family: PingFang-SC-Bold;

				&.active {
					background: #333333;
				}
			}

		}

		.detail-wrap {
			padding: 31upx 32upx;

			.goods-detail {
				display: flex;
				height: 148upx;

				.detail-left {
					position: relative;
					width: 148upx;
					height: 148upx;

					image {
						width: 100%;
						height: 100%;
					}

					.gift-tag {
						position: absolute;
						bottom: 0;
						right: 0;
						height: 32upx;
						line-height: 32upx;
						vertical-align: middle;
						width: 64upx;
						background-color: #ff4e4e;
						color: #FFFFFF;
						font-size: 20upx;
						text-align: center;
						border-radius: 0 0 4upx 0;
					}
				}

				.detail-right {
					box-sizing: border-box;
					padding: 21upx 0 18upx 24upx;

					.detail-right-top {
						color: #333333;
						font-size: 24upx;
						line-height: 33upx;
						width: 386upx;
						height: 66upx;
						text-align: left;
					}

					.detail-right-bottom {
						margin-top: 13upx;
						font-size: 22upx;
						color: #999999;
						height: 30upx;
						line-height: 30upx;
					}
				}
			}

			.sku-title {
				height: 30upx;
				line-height: 30upx;
				font-size: 22upx;
				margin: 30upx 0 18upx 0;
				text-align: left;
				color: #333333;
				font-family: PingFangSC-Semibold;
			}

			.goods-skus {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin-bottom: 38upx;

				.sku-attr {
					background: #F2F2F2;
					border-radius: 8px;
					height: 30upx;
					line-height: 30upx;
					font-size: 22upx;
					font-family: PingFangSC-Regular;
					margin-bottom: 32upx;
					margin-right: 16upx;
					padding: 10upx 34upx 12upx 32upx;

					&.active {

						color: #FB6947;
						background: rgba(250, 149, 70, 0.10);
						border: 0.5upx solid #FB6947;

					}
				}
			}

			.btn-con {
				button {
					width: 654upx;
					height: 104upx;
					background: #333333;
					border-radius: 9upx;
					line-height: 104upx;
					font-size: 36upx;
					color: #FFFFFF;

					&.button-hover {
						background-image: linear-gradient(-90deg, #000000 0%, #333333 100%);
						color: #B2B2B2;
					}
				}
			}

			.close-view {
				position: absolute;
				top: 0upx;
				right: 32upx;
				font-size: 25upx;
				font-weight: 600;
			}

		}
	}

	button::after {
		border: none;
	}
</style>
