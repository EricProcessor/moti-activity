<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task></my-task>
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
