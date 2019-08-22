<template>
	<view class="panel-body">
		<view class="main-pictures">
			<swiper class="swiper-style" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item  v-for="(item,index) in spuDetail.pictureList" :key="index" >
					<view class="swiper-item">
						<image :src="item.picture_url"
						 mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="description">
			<view class="price-discount">
				<view class="price">
					<text class="middle">￥</text> <text class="big">{{toDecimal2[0]}}.</text>{{toDecimal2[1]}}
				</view>
				<view class="discount" v-if="false">
					分享有礼
				</view>
			</view>


			<view class="goods-title">
		
				<text class="label-title">
					{{spuDetail.name}} {{selectAttrObj.skuName}}
				</text>
				

			</view>

		</view>
<!-- 
		<view class="selected-spec">
			<text class="select-title">重要</text> <text class="select-attr">未成年人请勿购买本产品</text>
		</view> -->
		<view class="shop-detail">
			<view class="shop-detail-title">
				商品详情
			</view>
			<view class="shop-detail-body">
				<image :src="spuDetail.describe_url" v-show="isLoadComplate"  @load="isLoadComplate = true" mode="widthFix"></image>
			</view>
		</view>
	
		<view class="bottom-button" @tap="confirmBuy">
			<button type="primary">立即购买</button>
		</view>
	</view>
</template>

<script>
	import PopupBottom from '@/component/popupBottom/popupBottom.vue'
	import uniNumberBox from "@/component/uni-number-box/uni-number-box.vue";
	import {postForm} from '../../common/request.js'
	import {appType} from '../../common/unils.js'
	export default {
		data() {
			return {
				isShowGoodsAttrs: false,
				services: [{
						url: "https://moti-dev.oss-cn-beijing.aliyuncs.com/image/moti-home-c/icons/clock.png",
						text: "一小时达"
					},
					{
						url: "https://moti-dev.oss-cn-beijing.aliyuncs.com/image/moti-home-c/icons/circle_zheng.png",
						text: "七天包退"
					},
					{
						url: "https://moti-dev.oss-cn-beijing.aliyuncs.com/image/moti-home-c/icons/circle_bao.png",
						text: "终身质保"
					},
					{
						url: "https://moti-dev.oss-cn-beijing.aliyuncs.com/image/moti-home-c/icons/circle_zhen.png",
						text: "全程验真"
					}
				],
				selectAttrObj:{
					attrName:"",
					skuPrice:"",
					skuId:"",
					skuName:"",
					skuNumber:1,
					title:"",
					img:""
				},
				spuDetail:{},
				isRequestComplate:false,
				isLoadComplate:false,
			}
		},
		methods: {
			confirmBuy(){
				if(!this.isRequestComplate) return uni.showToast({
					title:"加载中...",
					icon:"none"
				})
				this.MonitorEvent("immediate_buy")
				uni.setStorageSync("preOrderData",this.selectAttrObj)
				uni.navigateTo({
					url:"/pages/submit/submit"
				})
			},
			async queryGoods(type){
				let res = await postForm("/mall/h5/ofo/queryGoodsFrontByActiClass",{actiClass:type,appType:appType})
				if(res.code != 0) return uni.showToast({
					title:"获取商品详情失败",
					icon:"none"
				})
				
				this.spuDetail = res.result
				let attrArr = this.spuDetail.attr[0]
				this.selectAttrObj.attrName = attrArr.attrName
				this.selectAttrObj.skuPrice = this.spuDetail.price
				this.selectAttrObj.skuId = this.spuDetail.skuId
				this.selectAttrObj.skuName = attrArr.attrValueList[0].attrValue
				this.selectAttrObj.title = this.spuDetail.name
				let resSku = await postForm("/mall/h5/ofo/querySkupicturcBySkuId",{skuId:this.spuDetail.skuId})
				if(resSku.code == 0){
					this.selectAttrObj.img = resSku.result[0].picture_url
				}
				this.isRequestComplate = true
				console.log(resSku)
				
			},
			
		},
		computed:{
			toDecimal2() {
				let arr = ["0","00"]
				let f = parseFloat(this.spuDetail.price);
				if (isNaN(f)) {
					return arr
				}
				f = Math.round(this.spuDetail.price * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0) {
					arr[0] = s
					return arr
				}
				let rsarr = s.split(".")
					arr[0] = rsarr[0]
				
				let f0 = rsarr[1]
				while (s.length <= rs + 2) {
					f0 += '0';
				}
				arr[1] = f0
				return arr;
			}
		},
		components: {
			PopupBottom,
			uniNumberBox
		},
		onLoad(options) {
			let type  = options.type ? options.type : 'A'
			this.queryGoods(type)
			uni.setStorageSync("optionsType",type)
			this.MonitorPV()
		}

	}
</script>

<style lang="scss" scoped>
	.panel-body {
		.main-pictures {
			.swiper-style {
				width: 750upx;
				height: 750upx;

				image {
					width: 750upx;
					height: 750upx;
				}
			}

		}

		.description {
			//height: 266upx;
			background-color: #ffffff;
			padding: 28upx 21upx 32upx 27upx;
			box-sizing: border-box;

			.price-discount {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					color: #FA4650;

					.middle {
						font-size: 32upx;
					}

					.big {
						font-size: 60upx;
					}

				}

				.discount {

					width: 160upx;
					height: 56upx;
					line-height: 56upx;
					text-align: center;
					font-size: 28upx;
					color: #FFFFFF;
					border-radius: 8upx;
					background: linear-gradient(270deg, rgba(255, 74, 101, 1) 0%, rgba(250, 70, 80, 1) 100%);

				}
			}

			.goods-title {
				margin-top: 16upx;
				position: relative;
						
				
				.label-spec {
					font-size: 24upx;
					background-color: #FA4650;
					color: #FFFFFF;
					border-radius: 4upx;
					height: 32upx;
					line-height: 32upx;
					margin-right: 24upx;
					padding: 1upx 8upx;
					display: inline-block;
					
				}

				.label-title {
					margin-left: 20upx;
					font-size: 36upx;
					font-weight: bold;
					color: #333333;
				}

				.month-sales {
					font-size: 26upx;
					color: #999999;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}

			.under-border {
				margin-top: 31upx;
				width: 702upx;
				height: 1upx;
				background: #DCDCDC;
			}


		}

		.selected-spec {
			margin-top: 20upx;
			height: 100upx;
			line-height: 100upx;
			font-size: 26upx;
			background-color: #FFFFFF;
			padding: 0 24upx;

			.select-title {
				font-size: 26upx;
				color: #999999;
				margin-right: 28upx;
			}

			.select-attr {
				font-size: 26upx;
				color: #FF0000;
				margin-right: 28upx;
			}
		}

		.shop-detail {
			background-color: #FFFFFF;
			margin-top: 20upx;

			.shop-detail-title {
				height: 106upx;
				padding: 0 24upx;
				box-sizing: border-box;
				font-size: 30upx;
				font-weight: bold;
				color: #333333;
				line-height: 100upx;
			}

			.shop-detail-body {
				width: 750upx;
				height: auto;
				margin-bottom: 86upx;

				image {
					width: 750upx;
					height: 100%;
				}
			}
		}

		.bottom-button {
			position: fixed;
			bottom: 0upx;
			height: 98upx;
			width: 100%;
			background-color: #FFFFFF;
			padding: 12upx 22upx;
			box-sizing: border-box;
			border-top: 1upx solid rgba(0, 0, 0, 0.1);

			button {
				width: 706upx;
				height: 72upx;
				background: linear-gradient(270deg, rgba(255, 74, 101, 1) 0%, rgba(250, 70, 80, 1) 100%);
				border-radius: 8upx;
				line-height: 72upx;
			}
		}

		.goods-body {
			border-radius: 12upx 12upx 0upx 0upx;
			border: none;
			width: 750upx;
			padding: 32upx 24upx;
			background-color: #FFFFFF;
			box-sizing: border-box;

			.goods-info {
				display: flex;

				.goods-pic {
					width: 180upx;
					height: 180upx;

					image {
						width: 180upx;
						height: 180upx;
					}
				}

				.goods-desc {
					flex-shrink: 0;
					margin-left: 24upx;

					.good-title {
						line-height: 37upx;
						width: 485upx;
						font-size: 26upx;
					}
				}

				.selected {
					color: #999999;
					font-size: 22upx;
				}

				.good-price {
					margin-top: 29upx;
					color: #FA4650;
					font-size: 22upx;

					text {
						font-size: 36upx;
						font-weight: bold;
					}
				}

				.good-note {
					margin-top: 5upx;
					color: #999999;
					font-size: 22upx;
				}

				.close-pop {
					text-align: right;
					line-height: 1;
					height: 100%;
					width: 76upx;
					position: relative;

					text {
						position: absolute;
						right: 0;
					}

				}
			}

			.good-attrs {
				margin-top: 33upx;

				.attr-title {
					font-size: 24upx;
					color: #333333;

				}

				.good-items {
					display: flex;
					flex-wrap: wrap;

					.good-item {
						margin-top: 20upx;
						width: 132upx;
						height: 52upx;
						background: rgba(153, 153, 153, 0.1);
						border-radius: 8upx;
						color: #000000;
						font-size: 22upx;
						line-height: 52upx;
						text-align: center;
						margin-right: 16upx;


						&.active {
							border: 2upx solid rgba(250, 70, 80, 1);
							color: #FA4650;
							width: 130upx;
							height: 50upx;
						}
					}
				}
			}

			.handle-number {
				margin-top: 36upx;
				display: flex;
				justify-content: space-between;
				line-height: 51upx;

				.number-title {
					font-size: 24upx;
					color: #333333;
				}
			}

			.service-items {
				margin-top: 32upx;

				.service-title {

					font-size: 24upx;
					line-height: 30upx;
					color: #333;
					font-weight: bold;
				}

				.services {
					display: flex;

					.service {
						margin-top: 16upx;
						margin-right: 30upx;
						line-height: 1;
						display: flex;
						align-items: center;
						font-size: 24upx;
						color: #333;

						image {
							margin-right: 6upx;
							width: 28upx;
							height: 28upx;
						}
					}
				}
			}

			.confirm-button {
				margin-top: 160upx;

				button {
					width: 700upx;
					height: 72upx;
					background: linear-gradient(90deg, rgba(255, 74, 101, 1) 0%, rgba(250, 70, 80, 1) 100%);
					border-radius: 8upx;
					color: #FFFFFF;
					font-size: 28upx;
					line-height: 72upx;
					border: none;
				}
			}
		}
	}
</style>
