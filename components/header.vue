<template>
	<view class="header-box">
		<view class="banner">
			<view class="topBox">
				<view class='top-lf'>
					<text>10984</text>人正在参加
				</view >
				<view class='top-rg' @tap='aboutMe'>什么是MOTIS</view>
			</view>
			<view class="activityNum">活动时间&nbsp;即日起至2019年09月20日</view>
		</view>
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
		min-height:300upx;
		flex: 0 0 auto;
		.banner{
			width:100%;
			padding-top:1upx;
			font-weight:400;
			position: relative;
			height:700upx;
			background-image: url('../static/bgimg.jpg');
			background-repeat:no-repeat;
			background-position:center top;
			background-size: 100%;
			.activityNum{
				color:#777;
				font-size:22upx;
				margin:0 auto;
				position:absolute;
				bottom:49upx;
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
					padding-left:24upx;
					text{
						color:#F93822;
					}
				}
				.top-rg{
					background:rgba(38,41,45,1);
					padding:2upx 25upx;
					border-radius:20upx 0 0 20upx;
				}
			}
		}
	}
</style>
