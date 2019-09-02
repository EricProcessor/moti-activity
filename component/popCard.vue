<template>
	<view class="mask-card">
		<view class="card-content">
			<image class="close-icon" @click="$emit('closePop')"  src="../../static/images/icons/close.png"></image>
			
			<slot></slot>
			
		</view>
	</view>

</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
	
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
		 background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	
		.card-content {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		
			border-radius: 14upx;
			background: #fff;
			
			box-sizing: border-box;
			box-shadow: 5upx 10upx 26upx 0 rgba(0, 0, 0, 0.15);

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
