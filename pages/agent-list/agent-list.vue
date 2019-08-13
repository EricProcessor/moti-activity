<template>
	<view class="agent-list-box">
		<view class="header">代理商列表</view>
		<view class="content-box">
			<view class="content" v-if="agents.length > 0">
				<view class="item">
					<view class="id">编号</view>
					<view class="name">代理商名称</view>
					<view class="link"></view>
				</view>
				<view class="item" v-for="(item, index) in agents" :key="index">
					<view class="id">{{index+1}}</view>
					<view class="name">{{item.operatorName}}</view>
					<view class="link" @tap="toShop(item.id,item.operatorName)">查看门店</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="add" @tap="add">新增代理商</view>
		</view>
	</view>
</template>

<script>
	import { getAgent } from "../../common/js/interface/register.js"
	export default {
		data() {
			return {
				agents: []
			};
		},
		methods: {
			toShop(id,name){
				uni.navigateTo({
					url: '/pages/shop-list/shop-list?agentId=' + id + '&agentName=' + name
				});
			},
			add(){
				uni.navigateTo({
					url: '/pages/add-agent/add-agent'
				});
			},
			async agentList() {
				let res = await getAgent()
				if (res.code === '0') {
					this.agents.push(...res.result.operator)
					return
				}
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		},
		onLoad() {
			this.agentList()
		}
	}
</script>

<style lang="scss" scoped>
.agent-list-box {
	position: relative;
	.header {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
		text-align: center;
	}
	.content-box {
		padding: 30upx 30upx 110upx 30upx;
		.content {
			border: 2upx solid #999999;
			border-bottom: 0;
			border-radius: 8upx;
			.item {
				font-size: 28upx;
				color: #333333;
				text-align: center;
				display: flex;
				.id {
					width: 68upx;
					padding: 10upx;
					border-right: 2upx solid #999999;
					border-bottom: 2upx solid #999999;
				}
				.name {
					flex: 1;
					padding: 10upx;
					text-align: left;
					border-right: 2upx solid #999999;
					border-bottom: 2upx solid #999999;
				}
				.link {
					color: #42b983;
					text-decoration: underline;
					width: 120upx;
					padding: 10upx;
					border-bottom: 2upx solid #999999;
				}
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
