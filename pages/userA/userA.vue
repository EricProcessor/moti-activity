<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task :master="master" :masterInfo="masterInfo"></my-task>
		<help-box :master="master" :helperList="helperList"></help-box>
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
				noType: false
			};
		},
		mounted() {
			this.getInfo();
		},
		onLoad() {
			if (this.$wechat && this.$wechat.isWechat()) {
			     this.$wechat.share({
					 title: 'MOTI',
					 img: 'https://moti-dev.oss-cn-beijing.aliyuncs.com/image/activity/bluetoothzhuli/611694820796133376.png'
				}, location.href);  
			} 
		},
		methods:{
			getInfo: async function() {
				let userId = uni.getStorageSync('userId');
				let params = {
					activityId: userId.activityId,
					wechatId: userId.wechatId
				};
				let { code, msg, result } = await queryHelpSubByOpenId(params);
				if(code == 0){
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
