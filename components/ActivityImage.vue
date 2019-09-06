<template>
	<view class="shop-qrcode-info" id="save-qrcode-iamge">
		<view id="save-qrcode-iamge-content">
			<view>
				<image class="moti-logo" src="../../static/moti-logo.png"></image>
			</view>
			<view class="ssqc-title">MOTI 魔笛电子烟夏日钜惠 </view>
			<view class="ssqc-discount">购149元烟弹送<text class="red">199</text>元套装</view>
			<view>
				<image class="qrcode-image" src="../../static/aaaa.png"></image>
			</view>
			<view class="tip-one">扫描二维码进店</view>
			<view class="tip-two">活动时间：9月1日-10月31日</view>
			<view id="ignore-btton">
				<button class="save-btn" @click="saveImage">保存图片</button>
			</view>
		</view>
		<view class="close-view" @click="showShopQrcode = false;scrollY = true" id="ignore-close">
			<image src="../../static/icon/close.png"></image>
		</view>
		<!-- <i class="close iconfont " ></i> -->
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
	.shop-qrcode-info {
		width: 578upx;
		height: 953upx;
		text-align: center;

		.moti-logo {
			width: 129.3upx;
			height: 156.7upx;
			margin: 40upx 0 40.3upx 0;
		}

		.ssqc-title {
			line-height: 50upx;
			height: 50upx;
			font-size: 36upx;
			margin-bottom: 18upx;
		}

		.ssqc-discount {
			font-size: 28upx;
			color: #333333;
			height: 48upx;
			line-height: 48upx;

			.red {
				color: #FB6947;
				font-size: 34upx;
			}
		}

		.qrcode-image {
			width: 271upx;
			height: 271upx;
			box-sizing: border-box;
			margin-top: 56upx;
			margin-bottom: 24upx;
			border: 1px solid #CCCCCC;
			//padding: 23upx 22upx;
			//text-align: center;
		}

		.tip-one {
			font-size: 24upx;
			color: #999999;
			height: 33upx;
			line-height: 33upx;
		}

		.tip-two {
			margin-top: 48upx;
			margin-bottom: 24upx;
			font-size: 24upx;
			color: #999999;
			height: 33upx;
			line-height: 33upx;
		}

		.save-btn {
			background-color: #FB6947;
			color: #FFFFFF;
			font-size: 36upx;
			height: 104upx;
			line-height: 104upx;
			position: relative;

			&.button-hover {
				background: #E55D3E;
				color: #FFC5B7;
			}

			//top:6upx;
		}

		.close-view {
			position: absolute;
			top: 33.2upx;
			right: 33.3upx;
			width: 30upx;
			height: 30upx;

			image {
				width: 25.5upx;
				height: 25.5upx;
			}
		}
	}
	button::after {
		border: none;
	}
</style>
