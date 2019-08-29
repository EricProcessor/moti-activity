<template>
	<view class="spu-name">
		<view class="price">
			<text class="curency" v-if="goods.price">￥</text>
			<text class="zero-get" v-if="!goods.price">{{priceText}}</text>
			<text v-else class="price">{{goods.price}}.00</text>
			<text class="market-price">原价￥{{goods.sourcePrice}}</text>
		</view>
		<view class="title">
			{{goods.title}}
		</view>
		<view class="desc">
			({{goods.desc}})
		</view>
		<view class="credible-groups" >
			<view class="credible-labels">
				<view class="item-label" v-for="(item,index) in goods.credible" :key="index">
					{{item}}
				</view>

			</view>
			<view class="saleable-qty">
				剩余 {{goods.saleQty}}
			</view>
		</view>
	</view>
</template>

<script>
	import typeConfig from "../../common/typeConfig.js"
	import goodsConfig from "../../common/goodsConfig.js"
	export default {
		data(){
			return{
				
			}
		},
		computed:{
			goods(){
				return goodsConfig[typeConfig[this.paramType].goodsName].goods
			},
			priceText(){
				return typeConfig[this.paramType].priceText ? typeConfig[this.paramType].priceText : '0元领取'
			},
		},
		props:{
			paramType:{
				type:Number,
				default:7
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.spu-name{
		padding: 30upx 30upx 30upx 30upx;
		background-color: #ffffff;
		color: #333333;
		font-size: 26upx;
		.price{
			.curency{
				font-size: 26.6upx;
				font-weight: bold;
				color: #fb8c00;
			}
			.price{
				font-size: 50upx;
				font-weight: bold;
				color: #fb8c00;
			}
			.market-price{
				margin-left: 10upx;		
				color: rgba(153, 153, 153, 0.76);
				text-decoration: line-through;
			}
			.zero-get{
				font-size: 50upx;
				font-weight: bold;
				color: #fb8c00;
			}
		}
		.title{
			margin-top: 15upx;
			font-size: 34upx;
			font-weight: bold;
			
		}
		.desc{
			margin-top: 15upx;
			color: #999999;
		}
		.credible-groups {
			margin-top: 15upx;
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
</style>
