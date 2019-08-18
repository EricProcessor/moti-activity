<template>
	<view class="boutton-box">
		<block v-if="taskId == 1">
			<view v-if='!isCompleted' @tap='goHelp' class="btn">邀请好友助力</view>
			<view v-else-if="!isHasPhone" @tap='completeTask' class="btn">完成任务</view>
		</block>
		<block v-if="taskId == 2">
			<view v-if='!isCompleted' @tap='goHelp' class="btn">邀请好友助力</view>
			<view v-else-if="isCompleted && !isDoing && !isHasPhone" @tap='completeTask' class="btn">完成任务</view>
		</block>
		<block v-if="taskId == 3">
			<view v-if='!isCompleted' @tap='goHelp' class="btn">邀请好友助力</view>
			<view v-else class='btn' @tap="toForm">填写表单</view>
		</block>
		<!-- <view v-if='isHelp && isShowBtn' @tap='goHelp' class="btn">邀请好友助力</view>
		<view v-if="fillIn" class='btn' @tap="toForm">填写表单</view>
		<view v-if='!isHelp && isShowBtn' @tap='completeTask' class="btn">完成任务</view> -->
	</view>
</template>

<script>
	import Bus from '@/common/bus.js'
	export default {
		props:{
			taskId: {
				type: [Number, String],
				default() {
					return 0
				}
			},
			isCompleted: {
				type: Boolean,
				default: false
			},
			isDoing: {
				type: Boolean,
				default: false
			},
			isAllTaskCompleted: {
				type: Boolean,
				default: false
			},
			isHasPhone: {
				type: Boolean,
				default: false
			},
			fillIn:{
				type: Boolean,
				default: false
			},
			isHelp:{
				type: Boolean,
				default: true
			},
			noType:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				isShowBtn: true,
				taskBIsShowBtn: true
			}
		},
		mounted() {
			Bus.$on('changeShowBtn',(data) => {
				console.log('changeShowBtn', data);
				this.isShowBtn = data;
			})
			Bus.$on('taskBIsShowBtn',(data) => {
				this.taskBIsShowBtn = data;
			})
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
		position:fixed ;
		bottom: 0;
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
