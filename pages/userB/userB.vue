<template>
	<view class="userB">
		<header-box></header-box>
		<my-task :taskType="2"  :masterInfo="masterInfo" :master="master" :userProgress="userProgress" :userImgProgress="userImgProgress"></my-task>
		<discounts-box></discounts-box>
		<code-box :imgUrl="imgUrl"></code-box>
		<help-box :master="master" :helperList="helperList"></help-box>
		<upload-img :userImgProgress="userImgProgress"></upload-img>
		<footer-box></footer-box>
		<button-box :isHelp="isHelp" :noType="noType"></button-box>
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
	import { queryHelpSubByOpenId } from '@/common/request.js';
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
				noType: false
			};
		},
		mounted() {
			this.getInfo();
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
					let userBStatus = false
					if(result.task.taskContents[0].status == 1 && result.task.taskContents[1].status == 1){
						userBStatus = true
					}
					if(result.task.taskContents[0].status == 1){
						this.userProgress = true
					}
					if(result.task.taskContents[1].status == 1){
						this.userImgProgress = true
					}
					if(userBStatus){
						this.isHelp = false
						this.noType = true
					}
					
				}
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
