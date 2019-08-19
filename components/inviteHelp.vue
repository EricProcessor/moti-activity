<template>
	<view v-if='isShow' class="inviteHelp" @tap="close">
		<view v-if='yindao' class="zhiyin">
			<image src='/static/zhiyin.png'></image>
		</view>
		<view v-else class="inviteBox">
			<view class="topBox">
				<text>邀请助力</text>
				<text @tap="close">×</text>
			</view>
			<view class="content">
				<view class="cont" @tap.stop='wFenXiang'>
					<image src='/static/weixin.png'></image>
					<view class="text">微信分享</view>
				</view>
				<view class="cont" @tap.stop='generateImg'>
					<image src='/static/tupian.png'></image>
					<view class="text">生成图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		data() {
			return {
				isShow:false,
				yindao:true
			};
		},
		created() {
			let _this = this;
			Bus.$on('showHelp',(data) =>{
				this.isShow = true;
			})
		},
		methods:{
			close(){
				this.isShow = false;
			},
			generateImg(){
				uni.navigateTo({
					url:'/pages/generateImg/generateImg'
				})
			},
			wFenXiang(){
				this.yindao = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inviteHelp{
		position: fixed;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.7);
		box-sizing: border-box;
		.zhiyin{
			width: 80%;
			height:400upx;
			margin:0 auto;
			image{
				max-width:100%;
				height:100%;
			}
		}
		.inviteBox{
			height:340upx;
			background: #fff;
			position: fixed;
			width:100%;
			bottom:0;
			.content{
				display: flex;
				height:252upx;
				align-items: center;
				justify-content: space-around;
				.cont{
					height:110upx;
					text-align: center;
					image{
						max-width: 48upx;
						max-height: 41upx;
					}
					.text{
						color:#666;
						font-size:24upx;
						margin-top:27upx;
					}
				}
			}
			.topBox{
				background:rgba(247,247,247,1);
				color:#333333;
				padding:0 24upx;
				line-height:88upx;
				font-size:30upx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
