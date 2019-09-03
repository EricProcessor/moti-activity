<template>
	<view class="mask-card">
		<view class="card-content">
			<image class="close-icon"  @click="$emit('emitClose')" src="../../static/image/icons/close.png"></image>
			<view class="content">
				<view class="title">

					<text>{{popupCardTitle}}</text>
				</view>
				<!-- <text class="text">11111</text> -->
				<view class="btn" @click="$emit('emitClose')"> 确定  </view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:{
			payType:{
				type:Number,
				default:6
			},
			submitState:{
				type:Number,
				default:0
			}
		},
		computed:{
			popupCardTitle(){
				if(this.submitState === 1){
					if(this.payType === 6) return "您的订单已提交成功"
					else return "您已经购买成功";
				}
				if(this.submitState == 3){
					return "订单取消支付"
				}
				if(this.submitState == 2){
					return "订单支付失败"
				}
				
				return "支付未成功 请重新试下哦"
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			width: 560upx;
			height: 350upx;
			border-radius: 14upx;
			background: #fff;
			padding: 111upx 40upx 52upx 40upx;
			box-sizing: border-box;
			box-shadow: 5upx 10upx 26upx 0 rgba(0, 0, 0, 0.15);

			.content {
				
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.title {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #333333;
					font-size: 34upx;
					margin-bottom: 74upx;
					font-weight: bold;

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
					width: 480upx;
					height: 80upx;
				
					border-radius: 10upx;
					font-size: 30upx;
					background: #fa4650;
					color: #fff;
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



</style>
