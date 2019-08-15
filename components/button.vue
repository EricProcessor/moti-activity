<template>
	<view class="boutton-box">
		<view v-if='isHelp' @tap='goHelp' class="btn">邀请好友助力</view>
		<view v-else @tap='completeTask' class="btn">完成任务</view>
		<view class='btn' v-if='fillIn'>填写表单</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		props:{
			
		},
		data() {
			return {
				isHelp:true,
				fillIn:false
			};
		},
		methods:{
			goHelp(){
				console.log('fggg');
				Bus.$emit('showHelp',true);
				buryPoint('inviteFirend')
			},
			completeTask(){
				console.log(1111111);				Bus.$emit('showPop',true);
				
				buryPoint('completeTask')
			},
			buryPoint(des) {
				var _core = new WCore();
				var _user = new WCore.inputs.User();
				_user.uid = '#';
				var _pv = new WCore.inputs.PV(_user);
				var _event = new WCore.inputs.Event(_pv);
				_event.ec = des;
				_event.ea = 'click';
				_core.send(_event);
			}
		}
	}
</script>

<style lang="scss">
	.boutton-box{
		width:100%;
		.btn{
			line-height:90upx;
			background:rgba(249,56,34,1);
			font-size:32upx;
			color:#fff;
			text-align: center;
		}
	}
</style>
