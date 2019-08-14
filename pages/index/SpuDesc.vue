<template>
	<view class="spu-name">
		<view class="price">
			<text class="curency">￥</text><text class="price">{{price}}.00</text><text class="market-price">原价￥399</text>
		</view>
		<view class="title">
			MOTI 11 电子烟套装 雾化换弹小烟
		</view>
		<view class="desc">
			(1 烟杆 + 1 个经典烟草烟弹)
		</view>
		<view class="credible-groups" >
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
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		props:{
			price:{
				type:Number,
				default:199.00
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spu-name{
		padding: 56upx 30upx 30upx 30upx;
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
