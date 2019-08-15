<template>
	<view v-if='discountsShow' class="discounts">
		<image class='disImg' src='../../static/discounts.png'></image>
		<view class="code">6222ABCD</view>
	</view>
</template>

<script>
	export default {
		props:{
			discountsShow:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
	.discounts{
		width:93%;
		margin:0 auto 50upx;
		background:rgba(237,232,228,1);
		border-radius:14upx;
		padding:85upx 0 60upx;
		position: relative;
		.code{
			font-size:60upx;
			color:#53412B;
			line-height: 84upx;
			text-align: center;
		}
		.disImg{
			width:260upx;
			height:61upx;
			position: absolute;
			top:-6upx;
			left:50%;
			margin-left: -130upx;
		}
	}
</style>
