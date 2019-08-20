<template>
	<view class='userA'>
		<header-box :count="userCountNum"></header-box>
		<view style="margin-top: 40upx;"></view>
		<my-task 
			:taskType="1"
			:taskStatus="taskStatus"
			:master="master" 
			:masterInfo="masterInfo" 
			typeText="我没有电子烟产品"></my-task>
		<discounts-box ></discounts-box>
		<code-box :imgUrl="imgUrl"></code-box>
		<help-box :master="master" :helperList="helperList" :taskContents="taskContents"></help-box>
		<footer-box></footer-box>
		<button-box @showPop="handleShowPop" :isHasPhone="isHasPhone" :taskId="taskId" :isCompleted="isCompleted"></button-box>
		<pop-up></pop-up>
		<invite-help></invite-help>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import footerBox from '@/components/footer.vue';
	import myTask from "@/components/myTask.vue";
	import helpBox from '@/components/help.vue';
	import popUp from '@/components/pop-up.vue';
	import discountsBox from "@/components/discounts.vue";
	import codeBox from '@/components/code.vue';
	import buttonBox from '@/components/button.vue';
	import inviteHelp from '@/components/inviteHelp.vue';
	import { queryHelpSubByOpenId, queryHelpMasterByUserId,userCount } from '@/common/request.js';
	import Bus from '@/common/bus.js';
	export default {
		components: {
			headerBox,
			footerBox,
			myTask,
			helpBox,
			popUp,
			discountsBox,
			codeBox,
			buttonBox,
			inviteHelp
		},
		data() {
			return {
				userCountNum: 0,
				master: {
					helpNum: 36,
					helpText: '完成1个任务，即可获得',
					reward: '99元换购资格'
				},
				helperList: [],
				isHelp: true,
				masterInfo:{},
				imgUrl: '/static/a.png',
				noType: false,
				taskContents:{},
				taskId: 0,
				isCompleted: false,
				isHasPhone: false,
				taskStatus: 0
			};
		},
		mounted() {
			this.getInfo();
			this.queryHelpMasterByUserId()
			this.userCount();
			Bus.$on('changeIsCompleted', (data) => {
				this.isCompleted = true
				this.isHasPhone = true
			})
			
			if (this.$wechat && this.$wechat.isWechat()) {
				const UA = window.navigator.userAgent.toLowerCase()
				const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA))
				const host = location.href.split('#')[0]
				const ids = uni.getStorageSync('ids')
				if (isIOS) {
					this.$wechat.share2({
						 title: 'MOTI S 限时免费领取',
						 desc: '我不要你觉得，我就要宇宙无敌魔笛智能电子烟',
						 link: `https://hnhd.motivape.cn/bluehd/#/pages/help/help?activityId=${ids.activityId}&wechatId=${ids.wechatId}&helpMasterId=${ids.helpMasterId}`,
						 imgUrl: 'https://moti-dev.oss-cn-beijing.aliyuncs.com/image/bluetooth/avatar/share.png'
					});
				} else {
					this.$wechat.share({
						 title: 'MOTI S 限时免费领取',
						 img: 'https://moti-dev.oss-cn-beijing.aliyuncs.com/image/bluetooth/avatar/share.png'
					}, location.href, `https://hnhd.motivape.cn/bluehd/#/pages/help/help?activityId=${ids.activityId}&wechatId=${ids.wechatId}&helpMasterId=${ids.helpMasterId}`);
				}
			}
		},
		methods:{
			handleShowPop() {
				Bus.$emit('showPop', true)
			},
			async userCount() {
				const { result } = await userCount()
				this.userCountNum = result.count
			},
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
					if (result.task.taskId != 1) {
						if (result.task.taskId == 2) {
							return uni.redirectTo({ url: '/pages/userB/userB' })
						} else if (result.task.taskId == 3) {
							return uni.redirectTo({ url: '/pages/userC/userC' })
						}
					}
					this.taskContents = JSON.parse(result.task.taskContents[0].content)
					uni.setStorageSync('taskContents',this.taskContents)
					let helperNum = this.taskContents.countCondition;
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
					let taskStatus = result.userMsg.taskStatus;
					
					const taskContents = result.task.taskContents
					if (taskContents.every((cur) => { return cur.status == 1})) {
						// 已完成任务, 改变状态
						this.isCompleted = true
						this.taskStatus = 1
					}
					
					// if(taskStatus == 1){
					// 	// 已完成任务, 改变状态
					// 	this.isCompleted = true
					// }
				}
			},
			async queryHelpMasterByUserId() {
				// 查询是否填写过手机号
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userA {
		padding-bottom: 100upx;
		display: flex;
		flex-direction: column;
	}
</style>
