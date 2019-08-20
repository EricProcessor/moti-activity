<template>
	<view v-if='isShow' class="discounts">
		<image class='disImg' src='../../static/duihuan.png'></image>
		<view class="code">{{discountsNum}}</view>
		
		<view class="copy_btn"  @tap="copyCode" :data-clipboard-text="discountsNum">复制</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	import ClipboardJS from 'clipboard'
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
				this.discountsNum = data;
			});
		},
		methods:{
			copyCode() {
				var clipboard = new ClipboardJS('.copy_btn');
				
				clipboard.on('success', function(e) {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
					e.clearSelection();
				});
			}
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
			line-height: 84upx;
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
		.copy_btn {
			width: 160upx;
			height: 60upx;
			margin: 32upx auto auto auto;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-radius: 8upx;
			background: #333;
			color: #fff;
		}
	}
</style>
