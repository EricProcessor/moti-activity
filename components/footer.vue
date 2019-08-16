<template>
	<view class="footerBox">
		<view class="image"></view>
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

<style lang="scss">
	.footerBox {
		margin-bottom: 80upx;
		flex: 1 0 auto;
		width:100%;
		.image{
			width: 90%;
			height: 320upx;
			margin:0 auto;
			background-image: url('../static/yyy.png');
			background-repeat:no-repeat;
			background-position:center top;
			background-size: 100%;
		}
	}
</style>
