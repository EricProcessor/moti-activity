<template>
	<view class="panel-body">
		<view class="main-pictures">
			<swiper class="swiper-style" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in spuDetail.pictureList" :key="index">
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
					<text class="middle">￥</text> <text class="big">{{parseInt(spuDetail.market_price)}}.</text>00
				</view>
				<view class="discount">
					约提现64
				</view>
			</view>

			<view class="goods-title">
				MOTI D13 电子烟套装 雾化换
			</view>
			<view class="under-border">

			</view>
			<view class="selected-spec">
				<text class="select-title">已选</text> <text class="select-attr">{{selectAttrObj.skuName}}，{{selectAttrObj.skuNumber}}件</text>
			</view>
		</view>

		<view class="shop-detail">
			<view class="shop-detail-title">
				商品详情
			</view>
			<view class="shop-detail-body">
				<image :src="spuDetail.describe_url" mode="widthFix"></image>
			</view>
		</view>
		<PopupBottom :show="isShowGoodsAttrs">
			<view class="goods-body">
				<view class="goods-info">
					<view class="goods-pic">
						<image :src="skuImg"
						 mode="aspectFit"></image>
					</view>
					<view class="goods-desc">
						<view class="good-title">
							{{spuDetail.name}}
						</view>
						<view class="selected">
							{{selectAttrObj.attrName}}:{{selectAttrObj.skuName}}
						</view>
						<view class="good-price">
							￥<text>{{selectAttrObj.skuPrice}}</text>
						</view>
						<view class="good-note">
							未成年人(未满18岁)请勿购买本产品
						</view>

					</view>
					<view class="close-pop"  @tap="hidePopup">
						<text class="iconfont moti-close"></text>
					</view>
				</view>
				<view class="good-attrs">
					<view class="attr-title">
						{{selectAttrObj.attrName}}
					</view>
					<view class="good-items">
						<view class="good-item "  :class="{active:index === skuIndex}"  @click="selectAttr(index)"   v-for="(item,index) in skuList" :key="index">
							{{item.skuName}}
						</view>
						
					</view>
				</view>
				<view class="handle-number">
					<view class="number-title">
						数量
					</view>
					<uni-number-box :value="selectAttrObj.skuNumber" :min="1" @change="numberChange" />
				</view>
				<view class="service-items">
					<view class="service-title">
						服务
					</view>
					<view class="services">
						<view class="service" v-for="(item, index) in services" :key="index">
							<image :src="item.url"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="confirm-button" @click="linkTo">
					<button type="primary">确定</button>
				</view>
			</view>
		</PopupBottom>
		<view class="bottom-button" @click="isShowGoodsAttrs = true">
			<button type="primary">立即购买</button>
		</view>
	</view>
</template>

<script>
	import PopupBottom from '@/component/popupBottom/popupBottom.vue'
	import uniNumberBox from "@/component/uni-number-box/uni-number-box.vue";
	import {post,get,postForm} from "../../common/request.js"
	export default {
		data() {
			return {
				spuId:'',
				spuDetail:{
					pictureList:[],		
				},
				skuIndex:0,
				skuImg:"",
				selectAttrObj:{
					attrName:"",
					skuPrice:"",
					skuId:"",
					skuName:"",
					skuNumber:1,
					title:"",
					img:""
				},	
				skuList:[],
				isShowGoodsAttrs:false,
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
			}
		},
		computed:{
			
		},
		methods: {
			numberChange(data) {
				this.selectAttrObj.skuNumber = data.num
			},
			hidePopup(){
				this.isShowGoodsAttrs = false
			},
			async queryGoods(){
			 let res = await postForm("/mall/h5/ofo/queryGoodsOfoSpuById",{spuId:this.spuId})
			 this.spuDetail = res.result
			 let defaultAttr = res.result.attr[0]
			 let defaultSku = defaultAttr.attrValueList[0]
			 this.skuList = defaultAttr.attrValueList
			 
			 this.selectAttrObj.attrName = defaultAttr.attrName
			 this.selectAttrObj.skuId = defaultSku.skuId
			 this.selectAttrObj.skuPrice = defaultSku.skuPrice
			 this.selectAttrObj.skuName = defaultSku.skuName
			 this.selectAttrObj.title = res.result.name
			 await this.querySkuImg(this.selectAttrObj.skuId)
			 this.selectAttrObj.img = this.skuImg
			 
			},
			async querySkuImg(skuId){
				for(let key in this.skuList){
					if(this.skuList[key].skuId != skuId) continue
					if(!this.skuList[key]['img']){
						let res = await postForm("/mall/h5/ofo/querySkupicturcBySkuId",{skuId:skuId})
						this.skuList[key]['img'] = res.result[0].picture_url		
					}
					this.skuImg = this.skuList[key]['img']
					
				}		
			},
			async selectAttr(index){
				this.selectAttrObj = Object.assign(this.selectAttrObj,this.skuList[index])
				this.skuIndex = index
				await this.querySkuImg(this.selectAttrObj.skuId)
				
			},
			linkTo(){
				if(!this.selectAttrObj.skuId) return uni.showToast({
					title:"请选择SKU",
					icon:"none"
				})
				if(this.selectAttrObj.skuNumber <1) return uni.showToast({
					title:"请选择购买数量",
					icon:"none"
				})
				uni.setStorageSync("preOrderData",this.selectAttrObj)
				uni.navigateTo({
					url:"/pages/submit/submit"
				})
			}
		},
		components: {
			PopupBottom,
			uniNumberBox
		},
		async onLoad(option) {
			this.spuId = option.spuId
			let res = await this.queryGoods()
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
			height: 311upx;
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
				height: 50upx;
				font-size: 36upx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				line-height: 50upx;
			}

			.under-border {
				margin-top: 31upx;
				width: 702upx;
				height: 1upx;
				background: #DCDCDC;
			}

			.selected-spec {
				height: 100upx;
				line-height: 100upx;
				font-size: 26upx;

				.select-title {
					font-size: 26upx;
					color: #999999;
					margin-right: 28upx;
				}

				.select-attr {
					font-size: 26upx;
					color: #333333;
					margin-right: 28upx;
				}
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
			border-radius:12upx 12upx 0upx 0upx;
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
						width: 465upx;
						font-size: 26upx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space:nowrap;
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
						
						height: 52upx;
						background: rgba(153, 153, 153, 0.1);
						border-radius: 8upx;
						color: #000000;
						font-size: 22upx;
						line-height: 52upx;
						text-align: center;
						margin-right: 16upx;
						padding: 0 32upx;
						

						&.active {
							border: 2upx solid rgba(250, 70, 80, 1);
							color: #FA4650;
							
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
