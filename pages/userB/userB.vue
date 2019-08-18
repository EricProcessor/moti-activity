<template>
	<view class="userB">
		<header-box></header-box>
		<my-task :taskType="2" 
			:masterInfo="masterInfo"
			:master="master"
			:userProgress="userProgress"
			:userImgProgress="userImgProgress"
			 typeText="我是MOTI（MT产品）"
			></my-task>
		<help-box :master="master" :helperList="helperList" :taskContents="taskContents"></help-box>
		<discounts-box></discounts-box>
		<code-box :imgUrl="imgUrl"></code-box>
		<upload-img :userImgProgress="userImgProgress" 
			@userImgProgress="getUserImgProgress" :taskImgInfo="taskImgInfo"></upload-img>
		<footer-box></footer-box>
		<button-box :isDoing="isDoing" :isHasPhone="isHasPhone" :isCompleted="isCompleted" :taskId="taskId"></button-box>
		<pop-up></pop-up>
		<invite-help></invite-help>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import myTask from '@/components/myTask.vue';
	import helpBox from '@/components/help.vue';
	import footerBox from '@/components/footer.vue';
	import discountsBox from '@/components/discounts.vue';
	import codeBox from "@/components/code.vue";
	import buttonBox from "@/components/button.vue";
	import uploadImg from '@/components/uploadImg.vue';
	import popUp from "@/components/pop-up.vue";
	import inviteHelp from '@/components/inviteHelp.vue'
	import { queryHelpSubByOpenId, queryHelpMasterByUserId } from '@/common/request.js';
	import Bus from '@/common/bus.js';
	export default {
		components:{
			headerBox,
			myTask,
			helpBox,
			footerBox,
			discountsBox,
			codeBox,
			buttonBox,
			uploadImg,
			popUp,
			inviteHelp
		},
		data() {
			return {
				master: {
					helpNum: 10,
					helpText: '完成2个任务，即可获得',
					reward: '99元换购资格'
				},
				helperList: [],
				isHelp: true,
				userProgress: false,
				userImgProgress: false,
				imgUrl: '/static/b.png',
				noType: false,
				taskContents:{},
				masterInfo:{},
				taskImgInfo:{},
				taskId: 0,
				isCompleted: false,
				isHasPhone: false,
				isDoing: false,
				isAllTaskCompleted: false
			};
		},
		mounted() {
			this.getInfo();
			this.queryHelpMasterByUserId()
			Bus.$on('taskBIsDoing', () => {
				this.isDoing = false
			})
			Bus.$on('isInputedPhone', () => {
				this.isHasPhone = true
			})
		},
		onLoad() {
			if (this.$wechat && this.$wechat.isWechat()) {
				const host = location.href.split('#')[0]
				const ids = uni.getStorageSync('ids')
				 this.$wechat.share({
					 title: 'MOTIS 只送不卖',
					 img: 'https://moti-dev.oss-cn-beijing.aliyuncs.com/image/bluetooth/avatar/share.png'
				}, location.href, `https://hnhd.motivape.cn/bluehd/#/pages/help/help?activityId=${ids.activityId}&wechatId=${ids.wechatId}&helpMasterId=${ids.helpMasterId}`);
			} 
		},
		methods:{
			getInfo: async function() {
				let ids = uni.getStorageSync('ids');
				let wxUserInfo = uni.getStorageSync('wxUserInfo');
				if (!(ids || wxUserInfo)) {
					return uni.redirectTo({
						url: '/'
					})
				}
				let params = {
					activityId: ids.activityId,
					wechatId: ids.wechatId
				};
				let { code, msg, result } = await queryHelpSubByOpenId(params);
				if(code == 0){
					this.taskId = result.task.taskId
					if (result.task.taskId != 2) {
						if (result.task.taskId == 1) {
							return uni.redirectTo({ url: '/pages/userA/userA' })
						} else if (result.task.taskId == 3) {
							return uni.redirectTo({ url: '/pages/userC/userC' })
						}
					}
					this.taskContents = JSON.parse(result.task.taskContents[0].content)
					uni.setStorageSync('taskContents',this.taskContents)
					let helperNum = JSON.parse(result.task.taskContents[0].content).countCondition;
					for(let i = 0; i < helperNum; i++){
						let obj = {
							wechatHeadeImgUrl: '',
							wechatNickname: ''
						}
						this.helperList.push(obj)
					}
					if(result.wechatSubs.length > 0){
						for(let i = 0; i < result.wechatSubs.length; i++){
							if(result.wechatSubs[i] != null){
								this.helperList[i].wechatHeadeImgUrl = result.wechatSubs[i].wechatHeadeImgUrl
							}
						}
					}
					this.masterInfo = result.userMsg;
					console.log(result.task.taskContents[0], result.task.taskContents[0].status);
					if (result.task.taskContents[0] && result.task.taskContents[0].status == 1 && result.task.taskId == 2) {
						// userB任务, 完成第一步即助力任务了, 但还没有完成上传图片
						this.isCompleted = true
						// 是否正在进行, 即上传图片还未完成
						this.isDoing = true
					}
					
					let userBStatus = false
					if(result.task.taskContents[0].status == 1 && result.task.taskContents[1].status == 1){
						userBStatus = true
						// Bus.$emit('changeShowBtn',true);
					}
					if(result.task.taskContents[0].status == 1){
						this.userProgress = true
					}
					if(result.task.taskContents[1].status == 1){
						this.taskImgInfo = JSON.parse(result.task.taskContents[1].content)
						this.userImgProgress = true
					}
					console.log('userBStatus', userBStatus);
					if(userBStatus){
						// 两个任务都完成了
						this.isDoing = false
						this.isCompleted = true
						// this.isHelp = false
						// this.noType = true
					}
					
				}
			},
			async queryHelpMasterByUserId() {
				let ids = uni.getStorageSync('ids');
				console.log('ids', ids);
				let data = {
					activityId : ids.activityId,
					wechatId : ids.wechatId // 名称是wechatId, id是helpMasterId, 这是对的
				}
				let { code, msg, result } = await queryHelpMasterByUserId(data);
				if (code == 0 && result && result.phone) {
					this.isHasPhone = true
				}
			},
			getUserImgProgress: function (options){
				this.userImgProgress = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userB{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
