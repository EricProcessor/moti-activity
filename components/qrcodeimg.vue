<template>
	<view class="header-box">
		<view class="banner">
		</view>
		<view class="txt">扫码即可参加活动</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			aboutMe(){
				uni.navigateTo({
					url:'/pages/aboutMoti/aboutMoti'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box{
		width:100%;
		// border: 20upx solid #ffffff;
		// min-height:300upx;
		flex: 0 0 auto;
		.txt{
			color: #F93822;
			text-align: center;
			font-size: 20upx;
			padding: 10upx;
		}
		.banner{
			margin: 0 auto;
			border: 8upx solid #ffffff;
			width:186upx;
			padding-top:1upx;
			font-weight:400;
			position: relative;
			height:186upx;
			background-image: url('../static/qrcode.png');
			background-repeat:no-repeat;
			background-position:center top;
			background-size: 100%;
		}
	}
</style>
