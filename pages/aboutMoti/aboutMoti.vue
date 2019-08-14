<template>
	<view class="aboutMoti">
		<view class="image1"></view>
		<view class="image2"></view>
		<view class="image3"></view>
		<view class="image4"></view>
		<view class="image5"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.aboutMoti{
		height:100%;
		width:100%;
		margin:0;
		padding:0;
		view{
			width:100%;
			background-repeat:no-repeat;
			background-position:center top;
			background-size: 100%;
		}
		.image1{
			background-image: url('../../static/aboutM/1.jpg');
			height:900upx;
		}
		.image2{
			background-image: url('../../static/aboutM/2.jpg');
			height:230upx;
		}
		.image3{
			background-image: url('../../static/aboutM/3.jpg');
			height:750upx;
		}
		.image4{
			background-image: url('../../static/aboutM/4.jpg');
			height:1150upx;
		}
		.image5{
			background-image: url('../../static/aboutM/5.jpg');
			height:550upx;
		}
	}
</style>
