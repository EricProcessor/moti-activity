<template>
	<view class="code-box" v-if='codeShow'>
		<view class="text">复制优惠码并添加官方小 MO 账号，发送兑换码即可获得领取链接，并可加入免单福利群。</view>
		<view class="code-border">
			<image :src="imgUrl?imgUrl:'/static/a.png'" mode=""></image>
		</view>
		<view class="footerText">MOTI官方账号</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		props:{
			imgUrl:{
				type: String,
				default: String
			}
		},
		data() {
			return {
				codeShow:false
			};
		},
		mounted() {
			let _this = this;
			Bus.$on('codeShow',(data) => {
				this.codeShow = data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.code-box{
		width:93%;
		margin:0 auto 50upx;
		border-radius: 14upx;
		background:rgba(237,232,228,1);
		padding:40upx 0 30upx;
		.footerText{
			text-align: center;
			font-size:22upx;
			font-weight: 400;
		}
		.text{
			font-size:26upx;
			color:#53412B;
			font-weight: 400;
			line-height: 37upx;
			width:63%;
			margin:0 auto;
			text-align: center;
		}
		.code-border{
			background: #fff;
			width:220upx;
			height:220upx;
			margin:30upx auto 10upx;
			image{
				width:100%;
				height:100%;
			}
		}
	}
</style>
