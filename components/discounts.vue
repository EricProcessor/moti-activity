<template>
	<view v-if='isShow' class="discounts">
		<image class='disImg' src='../../static/discounts.png'></image>
		<view class="code">{{discountsNum}}</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		data() {
			return {
				isShow:false,
				discountsNum:''
			};
		},
		mounted(){
			let _this = this;
			Bus.$on('discountsShow',(data) => {
				this.isShow = true;
			});
			Bus.$on('couponCode',(data) => {
				this.discountsNum = data;f
			});
		},
		methods:{
			
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
