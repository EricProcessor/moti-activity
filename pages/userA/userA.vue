<template>
	<view class='userA'>
		<header-box></header-box>
		<my-task></my-task>
		<help-box></help-box>
		<discounts-box></discounts-box>
		<code-box></code-box>
		<footer-box></footer-box>
		<button-box></button-box>
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
	import codeBox from '@/components/code.vue';
	import buttonBox from '@/components/button.vue';
	import {getToken} from "@/common/request.js";
	export default {
		components:{
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
				taskInfo:{
					
				}
			};
		},
		onLoad(option) {
			let code = option.code;
			get_Token(code);
			
		},
		methods:{
			get_Token (code){
				uni.request({
					url:'https://api.weixin.qq.com/sns/oauth2/access_token?',
					data:{
						appid:'wx80a7401a02e0f8ec',
						secret:'f2db2177474c44575f6522932db0a1f3',
						code:code,
						grant_type:'authorization_code'
					},
					// header:{
					// 	Content-Type:'application/json'
					// }
					success:function(data){
						console.log(data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userA{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
