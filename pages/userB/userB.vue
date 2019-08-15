<template>
	<view class="userB">
		<header-box></header-box>
		<my-task :taskType="2"></my-task>
		<discounts-box></discounts-box>
		<code-box></code-box>
		<help-box></help-box>
		<upload-img></upload-img>
		
		<footer-box></footer-box>
		<button-box></button-box>
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
			};
		},
		methods:{
			
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
