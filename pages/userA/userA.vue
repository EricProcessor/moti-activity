<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task 
			:taskType="1"
			:master="master" 
			:masterInfo="masterInfo" 
			typeText="我从没使用过电子烟产品"></my-task>
		<help-box :master="master" :helperList="helperList" :taskContents="taskContents"></help-box>
		<discounts-box ></discounts-box>
		<code-box :imgUrl="imgUrl"></code-box>
		<footer-box></footer-box>
		<button-box :isHelp="isHelp" :noType="noType"></button-box>
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
	import { queryHelpSubByOpenId } from '@/common/request.js';
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
				taskContents:{}
			};
		},
		mounted() {
			this.getInfo();
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
					if(taskStatus == 1){
						this.isHelp = false
						this.noType = true
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userA {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
