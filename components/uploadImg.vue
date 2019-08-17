<template>
	<view class="uploadImg">
		<image class="img" src='/static/uploadImg.png'></image>
		<view class="contentBox">
			<view class="left-box">
				<image class='showImg' :src="taskImgInfo.imageUrl?taskImgInfo.imageUrl:imgSrc" ></image>
				<view class="show" v-if="isHavePic">照片示例</view>
			</view>
			<view class="rg-box">
				<view class="btn accomplish" @tap="uploadImg" v-if="!userImgProgress">去上传</view>
				<view class="btn achieve" v-if="userImgProgress">已完成</view>
				<view class="text">
					上传<text>MOTI烟杆</text>照片,<br><text>附带手机号提交</text>,即可完成活动
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uploadMoti,motiPicCommit } from '@/common/request.js';
	export default {
		props:{
			userImgProgress:{
				type: Boolean,
				default: false
			},
			taskImgInfo:{
				type: Object,
				default: Object
			}
		},
		data() {
			return {
				imgSrc:'/static/deafult.png',
				isHavePic: true
			};
		},
		methods:{
			uploadImg:async function (){
				let _this = this;
				await uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],//从相册选择
					success:async (res) => {
						// _this.imgSrc = res.tempFilePaths[0];
						uni.showToast({
							icon:'none',
							title:'上传成功'
						})
						this.uploadPic()
					}
				})
			},
			uploadPic:async function (){
				
				let params = {
					file: this.imgSrc 
				}
				let succ = await uploadMoti(params);
				succ = JSON.parse(succ)
				if(succ.code == 0){
					let ids = uni.getStorageSync('ids');
					let params = {
						"picUrl": this.imgSrc,
						"weChatHelpId": ids.helpMasterId
					}
					let {code,msg,result} = await motiPicCommit(params)
					if(code == 0){
						this.$emit('userImgProgress',true)
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: msg
					});
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.uploadImg{
		width: 93%;
		margin:0 auto 50upx;
		background:rgba(237,232,228,1);
		border-radius:14upx;
		padding:94upx 64upx 50upx 61upx;
		box-sizing: border-box;
		position: relative;
		.contentBox{
			box-sizing: border-box;
			height:250upx;
			display: flex;
			justify-content: flex-start;
			.rg-box{
				flex-grow: 1;
				.achieve{
					background: #333333;
				}
				.text{
					font-size:26upx;
					color: #53412B;
					margin-top:30upx;
					line-height:37upx;
					text{
						color:#F93822;
					}
				}
				.accomplish{
					background:#6EB17A;
				}
				.btn{
					display: inline-block;
					font-size:32upx;
					color:#fff;
					margin-top:34upx;
					border-radius: 8upx;
					padding:14upx 32upx;
				}
			}
			.left-box{
				width:250upx;
				height:250upx;
				border:3upx solid rgba(255,255,255,1);
				box-sizing: border-box;
				position: relative;
				margin-right:50upx;
				.showImg{
					max-width:250upx;
					max-height:250upx;
				}
				.show{
					position: absolute;
					z-index: 10;
					width:250upx;
					color:#fff;
					background:rgba(0,0,0,0.5);
					bottom:-4upx;
					text-align: center;
					font-size:22upx;
					line-height: 40upx;
				}
			}
		}
		.img{
			width:260upx;
			height:61upx;
			position: absolute;
			top:-6upx;
			left:50%;
			margin-left:-130upx;
		}
	}
</style>
