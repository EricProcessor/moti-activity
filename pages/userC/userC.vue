<template>
	<view class="userC">
		<header-box></header-box>
		<my-task></my-task>
		<help-box></help-box>
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
	export default {
		components:{
			headerBox,
			myTask,
			helpBox,
			footerBox,
			buttonBox,
			inviteHelp
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.userC{
		height:100%;
		width:100%;
	}
</style>
