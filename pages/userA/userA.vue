<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task></my-task>
		<help-box></help-box>
		<discounts-box></discounts-box>
		<footer-box></footer-box>
		<!-- <view class="btn">邀请好友助力</view> -->
		<view class="btn">完成任务</view>
		<pop-up></pop-up>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue';
	import footerBox from '@/components/footer.vue';
	import myTask from "@/components/myTask.vue";
	import helpBox from '@/components/help.vue';
	import popUp from '@/components/pop-up.vue';
	import discountsBox from "@/components/discounts.vue";
	import codeBox from '@/components/code.vue'
	export default {
		components:{
			headerBox,
			footerBox,
			myTask,
			helpBox,
			popUp,
			discountsBox
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.userA{
		display: flex;
		flex-direction: column;
		height: 100%;
		.btn{
			line-height:90upx;
			background:rgba(249,56,34,1);
			font-size:32upx;
			color:#fff;
			text-align: center;
		}
	}
</style>
