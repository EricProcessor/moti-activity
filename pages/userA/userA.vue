<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task :master="master"></my-task>
		<help-box></help-box>
		<discounts-box ></discounts-box>
		<code-box ></code-box>
		<footer-box></footer-box>
		<button-box></button-box>
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
	import inviteHelp from '@/components/inviteHelp.vue'
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
				}
			};
		},
		onLoad(option) {

			// this.saveUser()
		},
		methods:{
			
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
