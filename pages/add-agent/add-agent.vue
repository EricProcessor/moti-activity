<template>
	<view class="add-box">
		<view class="content">
			<view class="name">代理商:</view>
			<view class="detail">
				<input type="text" v-model="operatorName" placeholder="请输入代理商名称"/>
			</view>
		</view>
		<view class="footer">
			<view class="add" @tap="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import { addAgent } from "../../common/js/interface/register.js"
	export default {
		data() {
			return {
				operatorName: ''
			};
		},
		methods: {
			async submit(){
				if(this.operatorName !== ""){
					let res = await addAgent({
						operatorName: this.operatorName
					})
					
					if(res.code === '0'){
						uni.showToast({
							title: '添加成功!',
							icon: 'none'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/agent-list/agent-list'
							});
						}, 2000)
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}else {
					uni.showToast({
						title: '请输入代理商名称',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.add-box {
	position: relative;
	.content {
		display: flex;
		padding: 30upx;
		.name {
			width: 100upx;
			height: 80upx;
			margin-right: 10upx;
			font-size: 28upx;
			line-height: 80upx;
			color: #333333;
		}
		.detail {
			flex: 1;
			border-bottom: 2upx solid #F5F5F5;
			height: 80upx;
			input {
				height: 80upx;
				font-size: 28upx;
				line-height: 80upx;
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 710upx;
		height: 68upx;
		border-top: 2upx solid #F5F5F5;
		padding: 16upx 20upx;
		background: #FFFFFF;
		.add {
			width: 710upx;
			height: 68upx;
			line-height: 68upx;
			text-align: center;
			font-size: 24upx;
			font-weight: 400;
			border-radius: 6upx;
			background: #409eff;
			color: #FFFFFF;
		}
	}
}
</style>
