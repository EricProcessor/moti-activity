<template>
	<view class="userB">
		<header-box></header-box>
		<my-task :taskType="2"></my-task>
		<discounts-box></discounts-box>
		<code-box></code-box>
		<help-box></help-box>
		<upload-img></upload-img>
		<footer-box></footer-box>
		<button-box @popShow='popShow'></button-box>
		<pop-up @closePop='closePop' :popIsShow='popStatus'></pop-up>
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
	import uploadImg from '@/components/uploadImg.vue';
	export default {
		components:{
			headerBox,
			myTask,
			helpBox,
			footerBox,
			popUp,
			discountsBox,
			codeBox,
			buttonBox,
			uploadImg
		},
		data() {
			return {
				popStatus:false
			};
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
	.userB{
		
	}
</style>
