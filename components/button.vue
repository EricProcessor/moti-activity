<template>
	<view class="boutton-box">
		<view v-if='isHelp' @tap='goHelp' class="btn">邀请好友助力</view>
		<view v-else @tap='completeTask' class="btn">完成任务</view>
		<view class='btn' v-if='fillIn'>填写表单</view>
	</view>
</template>

<script>
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
				this.isHelp = false;
			},
			completeTask(){
				console.log(1111111);
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
