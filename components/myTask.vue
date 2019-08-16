<template>
	<view class="myTask">
		<image class='taskImage' src="/static/myTask.png"></image>
		<view class="userInfoBox">
			<image class='userImage' :src="masterInfo.wechatHeadeImgUrl?masterInfo.wechatHeadeImgUrl:'/static/userImg.png'" mode="scaleToFill"></image>
			<!-- <view class="imageBox">
				<view class='tx'>
					<image :src="masterInfo.wechatHeadeImgUrl?masterInfo.wechatHeadeImgUrl:'/static/userImg.png'" mode="scaleToFill"></image>
				</view>
			</view> -->
			<view class="userInfo">
				<view class="userName">{{masterInfo.wechatNickname?decodeURIComponent(masterInfo.wechatNickname):'未设置'}}</view>
				<view class="state">我从没使用过电子烟产品</view>
			</view>
		</view>
		<view class="taskBox">
			<view class='task'>任务1:<text class="font-color">{{master.helpNum}}名</text>好友助力</view>
			<view v-if='masterInfo.taskStatus == 0 || !userProgress' @tap='progress' class="proceed btn">进行中</view>
			<view v-if='masterInfo.taskStatus == 1 || userProgress' class="accomplish btn">已完成</view>
		</view>
		<view class="taskBox" v-if='taskType==2'>
			<view class='task'>任务2:上传<text class="font-color">MOTI照片</text></view>
			<view class="proceed btn" v-if="!userImgProgress">进行中</view>
			<view v-else class="accomplish btn">已完成</view>
		</view>
		<view class="taskProceed">{{master.helpText}}<text class="color">{{master.reward}}</text></view>
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
			masterInfo:{
				type: Object,
				default: Object
			},
			userProgress:{
				type: Boolean,
				default: false
			},
			userImgProgress:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				task1:true
			};
		},
		created() {
			console.log(this.master);
		},
		methods:{
			progress(){
				this.task1 = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myTask{
		width:93%;
		margin:0 auto;
		background:rgba(237,232,228,1);
		border-radius:14upx;
		padding:71upx 58upx 40upx;
		box-sizing: border-box;
		position: relative;
		margin-bottom:57upx;
		.taskProceed{
			font-size:24upx;
			color:#53412B;
			font-weight: 500;
			.color{
				color:#F93822;
			}
		}
		.taskBox{
			margin:32upx 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.task{
				font-size: 30upx;
				color:#53412B;
				font-weight: 500;
				.font-color{
					color:#F93822;
					padding-left:10upx;
				}
			}
			.btn{
				font-size:32upx;
				font-weight: 400;
				line-height: 32upx;
				padding:14upx 32upx;
				border-radius:8upx;
				color:#fff;
			}
			.proceed{
				background:#6EB17A;
			}
			.accomplish{
				background:#333;
			}
		}
		.taskImage{
			width:260upx;
			height:61upx;
			position: absolute;
			top:-6upx;
			left:50%;
			margin-left:-130upx;
		}
		.userInfoBox{
			display: flex;
			justify-content: flex-start;
			.userImage{
				flex-shrink: 0;
				width:120upx;
				height:120upx;
				border-radius: 50%;
				border:3upx solid rgba(255,255,255,1);
				box-sizing: border-box;
			}
			.imageBox{
				width:120upx;
				height:120upx;
				border-radius: 50%;
				border:3upx solid rgba(255,255,255,1);
				box-sizing: border-box;
				background:rgba(199,192,187,1);
				.tx{
					width:60upx;
					height:60upx;
					margin:32upx auto;
					image{
						width:100%;
						height:100%;
					}
				}
			}
			.userInfo{
				margin-left:21upx;
				color:#53412B;
				max-width: 400upx;

				.userName{
					font-size: 30upx;
					font-weight: 500;
					line-height: 42upx;
					margin:21upx 0 10upx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.state{
					font-size:24upx;
					font-weight: 400;
					line-height: 33upx;
				}
			}
		}
	}
</style>
