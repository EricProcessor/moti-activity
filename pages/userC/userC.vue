<template>
	<view class="userC">
		<header-box></header-box>
		<my-task :master="master" :taskType="3"></my-task>
		<help-box :master="master"></help-box>
		<footer-box></footer-box>
		<button-box></button-box>
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
			}
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
			console.log(result)
		}
	}
};
</script>

<style lang="scss">
.userC {
	height: 100%;
	width: 100%;
}
</style>
