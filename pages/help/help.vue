<template>
	<view class="helpBox">
		<header-box :count="userCountNum"></header-box>
		<view style="margin-top: 40upx;"></view>
		<view class="help-box">
			<image class='touxiang' :src="taskContent.wechatHeadeImgUrl?taskContent.wechatHeadeImgUrl:'/static/userImg.png'"></image>
			<view class="name">{{taskContent.wechatNickname?decodeURIComponent(taskContent.wechatNickname):'未设置'}}</view>
			<view class="text">
				<view class="text1">Ta正在参加免费送烟杆活动</view>
				<view class="text2">请为Ta助力</view>
			</view>
			<!-- <view class="text">
				<view class="text1">已成功为他助力</view>
			</view> -->
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
		<view class="home_btn" @tap="toMaster">回我的活动首页</view>
		<view @tap='helpBtn' v-if='isHelp' class="btn">为他助力</view>
		<view v-else class="btn" @tap="toMaster">我也要领取</view>
		<view class="home_back_btn" @tap="toMaster">
			<image src="/static/home_back_2.png"></image>
		</view>
<!-- 		<view class="act-end">
			<image src="../../static/end.png" mode=""></image>
		</view> -->
		<!-- <act-end></act-end> 取消结束,如果想结束活动放开此注释即可-->
	</view>
</template>

<script>
	import headerBox from '@/components/header2.vue';
	import actEnd from '@/components/actEnd.vue'
	import {queryHelpSubByOpenId,saveHelpSub,getUserAllInfo,addWechatUser, userCount} from '@/common/request.js'
	export default {
		components:{
			headerBox,
			actEnd
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
				code: null,
				userCountNum: '-'
			};
		},
		async onLoad(option) {
			const url = location.href
			const helpShareParam = uni.getStorageSync('helpShareParam');
			console.log(helpShareParam);
			if (helpShareParam && helpShareParam.activityId) {
				this.option = helpShareParam
				for (let item in option) {
					this.option[item] = option[item]
				}
				let paramStr = ''
				for (let item in this.option) {
					const str = `${item}=${this.option[item]}`
					paramStr = `${paramStr}&${str}`
				}
				uni.removeStorageSync('helpShareParam')
				// 拿到参数以后重定向, 避免清除本地之后再次访问会没有数据
				return location.replace(`https://hnhd.motivape.cn/bluehd/#/pages/help/help?${paramStr}`)
			} else {
				this.option = option
			}
			// this.option = option
			// debugger
			this.option.activityId = parseInt(this.option.activityId)
			this.option.wechatId = parseInt(this.option.wechatId)
			this.option.helpMasterId = parseInt(this.option.helpMasterId)
			
			this.info.activityId = parseInt(this.option.activityId)
			this.info.oldWechatId = this.option.wechatId
			this.code = this.option.code
			this.helpMasterId = this.option.helpMasterId
			let params = {
				activityId: this.option.activityId,
				wechatId: this.option.wechatId
			}
			console.log(this.info)
			//this.init()
			await this.init();
			this.getHelpSub(params);
			this.userCount()
			// 获取到code之后重定向
			// 重定向之后获取code
		},
		methods:{
			async userCount() {
				const { result } = await userCount()
				this.userCountNum = result.count || '-'
			},
			getWxCode() {
				const url = `${location.origin}/bluehd/#/pages/help/help`
				// const url = location.href
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
				await this.getHelpedNum()
				if(this.taskContent.countData >= this.taskContent.countCondition){
					this.isHelp = false;
					return uni.showToast({
						icon:'none',
						title:'您的好友助力已完成'
					})
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
					this.isHelp = false;
					this.taskContent.countData += 1;//助力成功前端展示加1 假的
					this.taskContent.calcNum -=1;//剩余人数减1 假的
					this.taskContent.percent = this.taskContent.countData/(this.taskContent.countData+this.taskContent.calcNum)*100;//进度条更新
					
					uni.redirectTo({
						url: '/'
					})
				} else {
					this.isHelp = false;
					uni.showToast({
						icon: 'none',
						title: msg
					})
				}
				
			},
			async getHelpedNum() {
				let params = {
					activityId: this.option.activityId,
					wechatId: this.option.wechatId
				}
				const {code,msg,result} = await queryHelpSubByOpenId(params);
				let contentObj = JSON.parse(result.task.taskContents[0].content);
				this.taskContent.countData = contentObj.countData
				this.taskContent.countCondition = contentObj.countCondition
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
				uni.redirectTo({
					url: '/'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.helpBox{
		padding-bottom: 140upx;
		.home_btn {
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			color: #E5D4B7;
			font-size: 22upx;
		}
		.btn{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 90upx;
			line-height:90upx;
			background: #F93822;
			color:#fff;
			text-align: center;
		}
		.help-box{
			width:93%;
			background:rgba(237,232,228,1);
			border-radius:14upx;
			padding:37upx 60upx 40upx;
			box-sizing: border-box;
			text-align: center;
			margin:0 auto;
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
		
		.home_back_btn {
			position: fixed;
			top: 400upx;
			right: 0;
			image {
				width: 130upx;
				height: 130upx;
			}
		}
		.act-end{
			width: 100%;
			height: 100%;
			position: fixed;
			background: rgba($color: #000000, $alpha: .7);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
