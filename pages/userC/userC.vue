<template>
	<view class="userC">
		<header-box></header-box>
		<my-task :master="master" :taskType="3" :masterInfo="masterInfo"></my-task>
		<help-box :master="master" :helperList="helperList" :fillIn="fillIn" :taskContents="taskContents"></help-box>
		<footer-box></footer-box>
		<button-box :fillIn="fillIn" :isHelp="isHelp" :noType="noType"></button-box>
		<invite-help></invite-help>
	</view>
</template>

<script>
import headerBox from '@/components/header.vue';
import myTask from '@/components/myTask.vue';
import helpBox from '@/components/help.vue';
import footerBox from '@/components/footer.vue';
import buttonBox from '@/components/button.vue';
import inviteHelp from '@/components/inviteHelp.vue'
import { queryHelpSubByOpenId } from '@/common/request.js';
export default {
	components: {
		headerBox,
		myTask,
		helpBox,
		footerBox,
		buttonBox,
		inviteHelp
	},
	data() {
		return {
			master: {
				helpNum: 5,
				helpText: '完成1个任务，即可获得',
				reward: '99元换购资格'
			},
			helperList: [],
			fillIn: false,
			isHelp: true,
			masterInfo:{},
			noType: false,
			taskContents:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		getInfo: async function() {
			let userId = uni.getStorageSync('userId');
			let params = {
				activityId: userId.activityId,
				wechatId: userId.wechatId
			};
			let { code, msg, result } = await queryHelpSubByOpenId(params);
			if(code == 0){
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
				let taskStatus = result.userMsg.taskStatus;
				if(taskStatus == 1){
					this.fillIn = true
					this.isHelp = false
					this.noType = true
				}
				
			}
		}
	}
};
</script>

<style lang="scss">
.userC {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
</style>
