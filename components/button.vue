<template>
	<view class="boutton-box">
		<view v-if='isHelp' @tap='goHelp' class="btn">邀请好友助力</view>
		<view v-if="fillIn" class='btn' @tap="toForm">填写表单</view>
		<view v-if='!isHelp' @tap='completeTask' class="btn">完成任务</view>
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		props:{
			fillIn:{
				type: Boolean,
				default: false
			},
			isHelp:{
				type: Boolean,
				default: true
			}
		},
		methods:{
			goHelp(){
				Bus.$emit('showHelp',true);
				//this.buryPoint('inviteFirend')
			},
			completeTask(){
				Bus.$emit('showPop',true);
				//this.buryPoint('completeTask')
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
			},
			toForm: function (){
				location.href = 'https://jinshuju.net/f/GlhAAt'
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
