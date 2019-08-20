<template>
	<view class="header-box">
		<view class="banner">
			<view class="topBox">
				<view class='top-lf'>
					<text>{{count}}</text>人正在参加
				</view >
				<view class='top-rg' @tap='aboutMe'>什么是<text>MOTIS</text></view>
			</view>
			<view class="activityNum">活动时间&nbsp;即日起至2019年08月25日</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			count: {
				type: [Number, String],
				default() {
					return '-'
				}
			}
		},
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
		min-height:300upx;
		flex: 0 0 auto;
		.banner{
			width:100%;
			padding-top:1upx;
			font-weight:400;
			position: relative;
			height:720upx;
			background-image: url('../static/bgm2.jpg');
			background-repeat:no-repeat;
			background-position:center top;
			background-size: 100%;
			.activityNum{
				color:#777;
				font-size:22upx;
				// margin:60upx auto;
				position:absolute;
				bottom:0;
				width:100%;
				text-align: center;
				
			}
			.topBox{
				display: flex;
				justify-content: space-between;
				font-size:28upx;
				color:#fff;
				margin-top:27upx;
				.top-lf{
					font-size: 20upx;
					padding-left:24upx;
					text{
						color:#F93822;
					}
				}
				.top-rg{
					background:rgba(38,41,45,1);
					padding:2upx 25upx;
					border-radius:20upx 0 0 20upx;
					font-size: 20upx;
					text {
						margin-left: 10upx;
						color: #F93822;
					}
				}
			}
		}
	}
</style>
