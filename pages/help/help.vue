<template>
	<view class="helpBox">
		<header-box></header-box>
		<view class="help-box">
			<image class='touxiang' :src="taskContent.wechatHeadeImgUrl?taskContent.wechatHeadeImgUrl:'/static/mine.png'"></image>
			<view class="name">{{taskContent.wechatNickname?decodeURIComponent(taskContent.wechatNickname):'未设置'}}</view>
			<view class="text">
				<view class="text1">已成功为Ta助力</view>
				<!-- <view class="text2">请为Ta助力</view> -->
			</view>
			<view class="tishi">已经有
				<text class="color">{{taskContent.countData}}名</text>好友为Ta助力，还差
				<text class="color">{{taskContent.calcNum}}个</text>助力
			</view>
			<view class="progress-box">
                <progress :percent="taskContent.percent" activeColor="#FF6B2A" active stroke-width="8" backgroundColor="#fff;"/>
            </view>
			<view class="helpNum">
				<text>0个助力</text>
				<text>{{parseInt(taskContent.countCondition/2)}}个助力</text>
				<text>{{taskContent.countCondition}}个助力</text>
			</view>
		</view>
		<view @tap='helpBtn' v-if='isHelp' class="btn">为他助力</view>
		<view v-else class="btn" @tap="toMaster">我也要参加</view>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import {queryHelpSubByOpenId,saveHelpSub,getUserAllInfo,addWechatUser} from '@/common/request.js'
	export default {
		components:{
			headerBox
		},
		data() {
			return {
				isHelp:true,
				option: {},
				oldUser:{
					wechatHeadeImgUrl:'',
					wechatNickname:''
				},
				taskId: '',
				taskContent:{},
				info:{
					oldWechatId:'',
					activityId:'',
					newWechatId:''
				},
				helpMasterId: '',
				taskList:{
					1:[],
					2:[],
					3:[]
				},
				code: null
			};
		},
		async onLoad(option) {
			const helpShareParam = uni.getStorageSync('helpShareParam');
			console.log(helpShareParam);
			if (helpShareParam && helpShareParam.activityId) {
				this.option = helpShareParam
				for (let item in option) {
					this.option[item] = option[item]
				}
			} else {
				this.option = option
			}
			this.option.activityId = parseInt(this.option.activityId)
			this.option.wechatId = parseInt(this.option.wechatId)
			this.option.helpMasterId = parseInt(this.option.helpMasterId)
			
			this.info.activityId = parseInt(this.option.activityId)
			this.info.oldWechatId = this.option.wechatId
			this.code = this.option.code;
			this.helpMasterId = this.option.helpMasterId
			let params = {
				activityId: this.option.activityId,
				wechatId: this.option.wechatId
			}
			console.log(this.info)
			//this.init()
			await this.init();
			this.getHelpSub(params);
		},
		methods:{
			getWxCode() {
				const url = `${location.origin}/bluehd/#/pages/help/help`
				uni.setStorageSync('helpShareParam', {
					activityId: this.option.activityId,
					wechatId: this.option.wechatId,
					helpMasterId: this.option.helpMasterId
				})
				// let testUrl = `{window.location.host}/bluehd/#/pages/help/help?activityId={this.info.activityId}&wechatId={this.info.oldWechatId}`;
				location.replace(
					`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=gfhd`
				);
			},
			async init(){
				let wxUserInfo = uni.getStorageSync('wxUserInfo')
				if (wxUserInfo) {
					
				} else if (this.code) {
					let infoData = await getUserAllInfo(this.code);
					let jsonData = JSON.parse(infoData.result);
					wxUserInfo = jsonData
					uni.setStorageSync('wxUserInfo', jsonData)
				} else {
					this.getWxCode();
				}
				this.wxUserInfo = wxUserInfo
			},
			async helpBtn(){
				if(this.taskContent.countCondition <= this.taskContent.countData ){
					uni.showToast({
						icon:'none',
						title:'您的好友助力已完成'
					})
					this.isHelp = false;
					return false;
				}
				// debugger
				let wxUserInfo = uni.getStorageSync('wxUserInfo')
				let params = {
					"activityId": this.info.activityId,
					"masterId": this.helpMasterId,
					"openId": wxUserInfo.openId,
					"wechatId": this.info.newWechatId
				}
				let {code,msg,result} = await saveHelpSub(params);
				if(code == 0){
					uni.removeStorageSync('helpShareParam')
					this.isHelp = false;
					this.taskContent.countData += 1;//助力成功前端展示加1 假的
					this.taskContent.calcNum -=1;//剩余人数减1 假的
					this.taskContent.percent = this.taskContent.countData/(this.taskContent.countData+this.taskContent.calcNum)*100;//进度条更新
					//助力成功
				}else{
					this.isHelp = false;
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
				
			},
			async getHelpSub(data){
				let {code,msg,result} = await queryHelpSubByOpenId(data);
				
				if(code == 0){
					let wxUserInfo = uni.getStorageSync('wxUserInfo')
					let params = {
						headImgUrl: wxUserInfo.headImgUrl,
						nickname: wxUserInfo.nickname,
						openId: wxUserInfo.openId,
						sexDesc: wxUserInfo.sexDesc
					};
					console.log('result', result);
					this.oldUser.wechatHeadeImgUrl = result.userMsg.wechatHeadeImgUrl;
					this.oldUser.wechatNickname = result.userMsg.wechatNickname;
					let contentObj = JSON.parse(result.task.taskContents[0].content); 
					console.log('contentObj', contentObj);
					this.taskContent = contentObj
					this.taskContent.wechatHeadeImgUrl = result.userMsg.wechatHeadeImgUrl
					this.taskContent.wechatNickname = result.userMsg.wechatNickname
					// this.taskContent.calcNum = contentObj.countCondition - contentObj.countData
					contentObj.countCondition>contentObj.countData ? this.taskContent.calcNum = contentObj.countCondition - contentObj.countData :  this.taskContent.calcNum=0
					this.taskContent.percent = (contentObj.countData)/contentObj.countCondition * 100
					this.taskId = result.task.taskContents.taskId
					this.addWechatUser(params)
				}else{
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
			},
			async addWechatUser(params) {
				let { code, msg, result } = await addWechatUser(params);
				if(code == 0){
					this.info.newWechatId = result.id
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
		
	}
</script>

<style lang="scss" scoped>
	.helpBox{
		height:100%;
		padding-bottom: 90upx;
		.btn{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 90upx;
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
