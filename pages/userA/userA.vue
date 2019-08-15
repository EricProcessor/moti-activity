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
	import {
		postUserinfo,
		getAccessToken
	} from "@/common/request.js";
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
				taskInfo: {

				},
				appId:'',
				secret:'',
				code:null,
				headImgUrl : "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjiahzIqspyAzFbsrHRXQd7WszmXqk0WSf1w16JBrbHBGIgJx3l129lHEicic5jsAm5oTISicWicLPJ3w/132",
				nickname : "Eric",
				openId: "oOYP80ZJ9GL-0h94WuZyEm-4EVbk",
				sexDesc : "1",
			};
		},
		onLoad(option) {
			this.code = option.code;
			let headImgUrl = "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjiahzIqspyAzFbsrHRXQd7WszmXqk0WSf1w16JBrbHBGIgJx3l129lHEicic5jsAm5oTISicWicLPJ3w/132"
			let nickname = "Eric"
			let openId=  "oOYP80ZJ9GL-0h94WuZyEm-4EVbk"
			let sexDesc = "1"
			// this.saveUser()
			postUserinfo(headImgUrl,nickname,openId,sexDesc);
		},
		methods: {
			
			get_Token(code) {
				console.log("调用....")
				uni.request({
					url: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
					method: 'POST',
					data: {
						appid: 'wx80a7401a02e0f8ec',
						secret: 'f2db2177474c44575f6522932db0a1f3',
						code: code,
						grant_type: 'authorization_code'
					},
					// header:{
					// 	Content-Type:'application/json'
					// }
					success: function(data) {
						console.log(data)
					}
				})
			}
			
			// saveUser(){
			// 	uni.request({
			// 		url:'http://192.168.10.96:8197/activity/activity/wechat/addWechatUser',
			// 		method:'POST',
			// 		data:{headImgUrl:this.headImgUrl,nickname:this.nickname,openId:this.openId,sexDesc:this.sexDesc},
			// 		success(res) {
			// 			console.log(res)
			// 		},
			// 		fail(err) {
			// 			console.log(err)
			// 		}
			// 	})
			// }
			
			
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
