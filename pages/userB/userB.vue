<template>
	<view class="userB">
		<header-box></header-box>
		<my-task></my-task>
		<discounts-box></discounts-box>
		<code-box></code-box>
		<help-box></help-box>
		<footer-box></footer-box>
		<button-box></button-box>
		<pop-up></pop-up>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import myTask from '@/components/myTask.vue';
	import helpBox from '@/components/help.vue';
	import footerBox from '@/components/footer.vue';
	import popUp from '@/components/pop-up.vue';
	import discountsBox from '@/components/discounts.vue';
	import codeBox from "@/components/code.vue";
	import buttonBox from "@/components/button.vue";
	export default {
		components:{
			headerBox,
			myTask,
			helpBox,
			footerBox,
			popUp,
			discountsBox,
			codeBox,
			buttonBox
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.userB{
		
	}
</style>
