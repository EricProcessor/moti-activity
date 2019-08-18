<template>
	<view class="help-box">
		<image class='helpImage' src='../../static/help.png'></image>
		<view class="textBox" v-if='taskContents.taskStatus==1'>恭喜您已完成助力活动</view>
		<view class="textBox">还差<text>{{taskContents.countCondition - taskContents.countData}}名</text>好友助力，即可成功哦</view>
		<view class="imagesBox">
			<template v-if='isDown'>
				<view class='image-li' v-if='index<10' v-for='(item,index) in helperList' :key='index'>
					<image v-if='item.wechatHeadeImgUrl' class='userImage' :src='item.wechatHeadeImgUrl'></image>
					<view v-else class="image-border">
						<view class='tx'></view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class='image-li' v-for='(item,index) in helperList' :key='index'>
					<image v-if='item.wechatHeadeImgUrl' class='userImage' :src='item.wechatHeadeImgUrl'></image>
					<view v-else class="image-border">
						<view class='tx'></view>
					</view>
				</view>
			</template>
		</view>
		<view class='showText' v-if="fillIn">
			<text>点击底部【填写表单】，并由工作人员最终审核通过后，将获得99元换购MOTIS套装资格</text>
		</view>
		<view class='more' @tap='showMore' v-if="helperList.length > 10">
			<text>{{isDown ? '查看更多' : '收起'}}</text>
			<view class="jiantou" :class='isDown ? "xia" : "shang"'></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			taskType:{
				type:Number,
				default:Number
			},
			master:{
				type: Object,
				default: Object
			},
			helperList:{
				type: Array,
				default: Array
			},
			fillIn: {
				type: Boolean,
				default: false
			},
			taskContents:{
				type: Object,
				default: Object
			}
		},
		data() {
			return {
				isDown:true
			};
		},
		methods:{
			showMore(){
				this.isDown=!this.isDown;
			}
		}
	}
</script>

<style lang="scss">
	.help-box{
		width:93%;
		margin:0 auto;
		background:rgba(237,232,228,1);
		border-radius:14upx;
		padding:80upx 61upx 26upx;
		box-sizing: border-box;
		position: relative;
		margin-bottom:60upx;
		.showText{
			font-size:26upx;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(83,65,43,1);
			text-align: center;
		}
		.more{
			color:#BAB1AC;
			font-size:22upx;
			font-weight: 400;
			line-height: 30upx;
			text-align: center;
			.jiantou{
				width:30upx;
				height:10upx;
				background-repeat:no-repeat;
				background-position:center top;
				background-size: 100%;
				margin:10upx auto 0;
			}
			.xia{
				background-image: url('../static/xia.png');
			}
			.shang{
				background-image: url('../static/shang.png');
			}
		}
		.imagesBox{
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.image-li:nth-child(5n){
				margin-right: 0;
			}
			.image-li{
				width:100upx;
				height:100upx;
				border-radius: 50%;
				margin-right:18upx;
				margin-bottom:30upx;
				.userImage{
					width:100upx;
					height:100upx;
					border-radius: 50%;
					border:3upx solid rgba(255,255,255,1);
					box-sizing: border-box;
				}
				.image-border{
					width:100upx;
					height:100upx;
					border-radius: 50%;
					box-sizing: border-box;
					border:3upx solid rgba(255,255,255,1);
					background:rgba(199,192,187,1);
					.tx{
						width:47upx;
						height:56upx;
						background-image: url('../static/userImg.png');
						background-repeat:no-repeat;
						background-position:center top;
						background-size: 100%;
						margin:22upx auto;
					}
				}
			}
		}
		.helpImage{
			width: 260upx;
			height:61upx;
			position: absolute;
			top:-6upx;
			left:50%;
			margin-left:-130upx;
		}
		.textBox{
			font-size:26upx;
			color:#53412B;
			font-weight: 400;
			line-height: 37upx;
			text-align: center;
			margin-bottom:20upx;
			text{
				color:#F93822;
			}
		}
	}
</style>
