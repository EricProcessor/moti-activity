<template>
	<view class="pop-up" v-if='popShow'>
		<view class="content-box">
			<view class="close"><text @tap='closePop'>×</text></view>
			<view class="title">填写手机号即可获取优惠码哦</view>
			<view class="user-li">
				<text class="tit">手机号</text>
				<view class="middle-box">
					<view v-if='errMsg.mobile' class="errMsg">请填写正确的手机号</view>
					<text class="zhanwei"></text>
					<view class="input-box">
						<input v-model="userInfo.mobile" type="text" maxlength="11" placeholder="请输手机号">
					</view>
				</view>
			</view>
			<view class="user-li">
				<text class="tit">短信验证码</text>
				<view class="middle-box">
					<view v-if='errMsg.code' class="errMsg">请输入正确的验证码</view>
					<text class="zhanwei"></text>
					<view class="input-box">
						<input v-model='userInfo.code' type="text" placeholder="请输入短信验证码">
						<text class='code' @tap='getCode'>获取验证码</text>
					</view>
				</view>
			</view>
			<view class="btn" @tap='submitBtn'>提交</view>
		</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js';
	import {dynamicCode,checkMobileAndCode} from "@/common/request.js";
	export default {
		data() {
			return {
				popShow:false,
				errMsg:{
					mobile:false,
					code:false
				},
				userInfo:{
					mobile:'',
					code:''
				}
			};
		},
		mounted() {
			var _this = this;
			Bus.$on('showPop',(data) => {
				this.popShow = data;
			})
		},
		methods:{
			async submitBtn(){
				if(this.checkMobile() && this.checkCode()){
					let userId = uni.getStorageSync('userId');
					let params = {
						"activityId": userId.activityId,
						"code": this.userInfo.code,
						"phone": this.userInfo.mobile,
						"wechatId": userId.wechatId
					}
					let {code,msg,result} = await checkMobileAndCode(params);
					if(code == 0){
						this.popShow = false;
						Bus.$emit('discountsShow',true);
						Bus.$emit('codeShow',true);
					}else{
						uni.showToast({
							icon: 'none',
							title: msg
						})
					}
				}
			},
			async getCode(){
				if(this.checkMobile()){
					let userId = uni.getStorageSync('userId');
					let params = {
						activityId: userId.activityId,
						phone: this.userInfo.mobile,
						shopAttDetailId:0,
						shopId:'111'
					};
					console.log(params);
					let {code,msg,result} = await dynamicCode(params);
					if(code == 0){
						uni.showToast({
							icon: 'none',
							title: '验证码已发送'
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: msg
						})
					}
				}
			},
			checkMobile() {
				let reg = /^1[3456789]\d{9}$/;
				if (reg.test(this.userInfo.mobile)) {
					this.errMsg.mobile = false;
					return true;
				} else {
					this.errMsg.mobile = true;
					return false;
				}
			},
			checkCode() {
				let reg = /^\d{6}$/;
				if (reg.test(this.userInfo.code)) {
					this.errMsg.code = false;
					return true;
				} else {
					this.errMsg.code = true;
					return false;
				}
			},
			closePop(){
				this.popShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-up{
		position: fixed;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.7);
		z-index:50;
		.content-box{
			background: #fff;
			width:93%;
			margin:294upx auto 0;
			border-radius:8upx;
			padding:23upx 23upx 40upx 40upx;
			box-sizing: border-box;
			.title{
				color:#333;
				font-size:36upx;
				font-weight: 600;
				line-height: 50upx;
				text-align: center;
				margin-bottom:17upx;
			}
			.btn{
				line-height: 80upx;
				color:#fff;
				background: #F93822;
				text-align: center;
				margin-top:50upx;
				border-radius: 8upx;
				font-size:28upx;
			}
			.user-li{
				height:140upx;
				border-bottom:2upx solid #C2C2C2;
				padding-bottom:29upx;
				font-size:30upx;
				font-weight: 400;
				color:#333;
				display: flex;
				justify-content: flex-start;
				align-items:flex-end;
				box-sizing: border-box;
				.tit{
					flex-shrink:0;
				}
				.middle-box{
					margin-left:22upx;
					flex-grow: 1;
					height:100upx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					.errMsg{
						// font-size:20upx;
						font-size:24upx;
						color:#F93822;
						flex: 0 0 auto;
					}
					.zhanwei{
						flex:1 0 auto;
					}
					.input-box{
						flex:0 0 auto;
						display: flex;
						input{
							flex-grow: 1;
						}
						input::-webkit-input-placeholder{
							font-size:30upx;
							color:#999;
						}
						.code{
							color:#F93822;
							font-size:28upx;
							font-weight: 500;
							flex-shrink:0;
						}
					}
				}
			}
			.close{
				text-align: right;
				margin-bottom:8upx;
			}
		}
	}
</style>
