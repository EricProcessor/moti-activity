<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task></my-task>
		<help-box></help-box>
		<discounts-box ></discounts-box>
		<code-box ></code-box>
		<footer-box></footer-box>
		<button-box @popShow='popShow'></button-box>
		<pop-up @closePop='closePop' :popShow='popStatus'></pop-up>
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
	export default {

		components: {
			headerBox,
			footerBox,
			myTask,
			helpBox,
			popUp,
			discountsBox,
			codeBox,
			buttonBox
		},
		data() {
			return {
				popStatus:false
			};
		},
		onLoad(option) {

			// this.saveUser()
		},
		methods:{
			popShow(){
				this.popStatus = true;
			},
			closePop(status){
				this.popStatus = status;
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
