<template>
	<view class="helpBox">
		<header-box></header-box>
		<view class="help-box">
			<image class='touxiang' src='/static/mine.png'></image>
			<view class="name">阿牛Design</view>
			<view class="text">
				<view class="text1">Ta正在参加免费送烟杆活动</view>
				<view class="text2">请为Ta助力</view>
			</view>
			<view class="tishi">已经有<text class="color">30名</text>好友为Ta助力，还差<text class="color">6个</text>助力</view>
			<view class="progress-box">
                <progress percent="80" activeColor="#FF6B2A" active stroke-width="8" backgroundColor="#fff;"/>
            </view>
			<view class="helpNum">
				<text>1个助力</text>
				<text>5个助力</text>
				<text>36个助力</text>
			</view>
		</view>
		<view @tap='helpBtn' v-if='isHelp' class="btn">为他助力</view>
		<view v-else class="btn" @tap="toMaster">我也要参加</view>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import {queryHelpSubByOpenId,saveHelpSub,getUserAllInfo} from '@/common/request.js'
	export default {
		components:{
			headerBox
		},
		data() {
			return {
				isHelp:true,
				info:{
					oldWechatId:'',
					activityId:'',
					newWechatId:''
				}
			};
		},
		methods:{
			async init(){
				let infoData = await getUserAllInfo(_self.code);
				let jsonData = JSON.parse(infoData.result);
				console.log("个人信息"+ jsonData.nickname);
				uni.setStorage({
					key:'wxUserInfo',
					data:jsonData,
					success:function(){
						console.log("储存成功"+JSON.stringify(jsonData));
					}
				});
			},
			async helpBtn(){
				let wxUserInfo = uni.getStorageSync('wxUserInfo')
				let params = {
					"activityId": this.info.activityId,
					"masterId": this.helpMasterId,
					"openId": wxUserInfo.openId,
					"wechatId": this.info.newWechatId
				}
				let {code,msg,result} = await this.saveHelpSub(params);
				if(code == 0){
					this.isHelp = false;
				}else{
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
				
			},
			getWxCode() {
				return new Promise(function(resolve, reject) {
					let testUrl = `http://${window.location.host}/bluehd/#/`;
					location.replace(
						`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(testUrl)}&response_type=code&scope=snsapi_userinfo&state=gfhd`
					);
				});
			},
			async getHelpSub(params){
				let {code,msg,result} = await queryHelpSubByOpenId(params);
				if(code == 0){
					let wxUserInfo = uni.getStorageSync('wxUserInfo')
					let params = {
						headImgUrl: wxUserInfo.headImgUrl,
						nickname: wxUserInfo.nickname,
						openId: wxUserInfo.openId,
						sexDesc: wxUserInfo.sexDesc
					};
					let { code, msg, result } = await addWechatUser(params);
					if(code == 0){
						this.info.newWechatId = result.id
					}else{
						uni.showToast({
							icon: 'none',
							title: msg
						})
					}
				}else{
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
			},
			toMaster: function (){
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		},
		onLoad(option) {
			this.info.activityId = option.activityId
			this.info.oldWechatId = option.wechatId
			let params = {
				activityId: parseInt(option.activityId),
				wechatId: option.wechatId
			}
			console.log(this.info)
			this.getHelpSub(params);
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.helpBox{
		height:100%;
		.btn{
			line-height:90upx;
			background:rgba(249,56,34,1);
			color:#fff;
			text-align: center;
		}
		.help-box{
			width:93%;
			background:rgba(237,232,228,1);
			border-radius:14upx;
			padding:37upx 83upx 40upx;
			box-sizing: border-box;
			text-align: center;
			margin:0 auto 133upx;
			.helpNum{
				color:#53412B;
				font-size:22upx;
				display: flex;
				justify-content: space-between;
				font-weight: 500;
			}
			.progress-box{
				margin:20upx 0;
				border-radius: 24upx;
			}
			.tishi{
				font-size:24upx;
				color:#53412B;
				font-weight: 500;
				.color{
					color:#F93822;
				}
			}
			.touxiang{
				width:120upx;
				height:120upx;
				border-radius: 50%;
				border:3upx solid rgba(255,255,255,1);
				box-sizing: border-box;
			}
			.name{
				color:#53412B;
				font-size:30upx;
				font-weight: 500;
				margin:16upx 0 40upx;
			}
			.text{
				color:#F93822;
				font-size:44upx;
				.text1{
					font-weight: 400;
				}
				.text2{
					font-weight: 500;
					margin:18upx 0 40upx;
				}
			}
		}
	}
</style>
