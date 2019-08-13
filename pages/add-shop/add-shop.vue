<template>
	<view class="add-box">
		<view class="content-box">
			<view class="content">
				<view class="name">代理商:</view>
				<view class="detail">
					<picker mode="selector" range-key="operatorName"  :value="agentIndex" :range="agents" ref="agent" @change="selectAgent"
					 style="width: 73%;height: 45upx;">
						<view class="detail">
							{{agents[agentIndex].operatorName}}
						</view>
					</picker>
				</view>
			</view>
			<view class="content">
				<view class="name">门店名称:</view>
				<view class="detail">
					<input type="text" v-model="shopName" placeholder="请输入门店名称"/>
				</view>
			</view>
			<view class="content">
				<view class="name">门店地址:</view>
				<view class="detail">
					<textarea type="text" auto-height="true" v-model="shopAddress" placeholder="请输入门店地址"/>
				</view>
			</view>
			<view class="content">
				<view class="name">门店电话:</view>
				<view class="detail">
					<input type="text" v-model="mobile" placeholder="请输入门店电话"/>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="add" @tap="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import { getAgent, addShops } from "../../common/js/interface/register.js"
	export default {
		data() {
			return {
				agentIndex: 0,
				agents: [
					{
						id: 0,
						operatorName: "请选择代理商"
					}
				],
				mobile: '',
				operatorId: '',
				shopAddress: '',
				shopName: '',
				agentId: '',
				agentName: ''
			};
		},
		methods: {
			matchPhone() {
				let partten = /^(\d{3,4}\-)?\d{7,8}$/i
				let partten2 = /^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/;
				let mobile = /^1[1-9][0-9]\d{8}$/;
				let zj = partten.test(this.mobile);
				let zj2 = partten2.test(this.mobile);
				let sj = mobile.test(this.mobile)
				if(zj || zj2 || sj){
					return true
				}else {
					return false
				}
			},
			selectAgent(e) {
				this.agentIndex = e.target.value;
				this.operatorId = this.agents[this.agentIndex].id;
			},
			async agentList() {
				let res = await getAgent()
				if (res.code === '0') {
					this.agents.push(...res.result.operator)
					this.agents.forEach((item, index)=>{
						if(item.id == this.agentId){
							this.agentIndex = index;
						}
					})
					return
				}
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			},
			async submit(){
				let msg = ""
				if (!this.matchPhone()) {
					msg = "请输入正确的门店电话"
				}
				if (!this.shopAddress) {
					msg = "请填写门店地址"
				}
				if (!this.shopName) {
					msg = "请填写门店名称"
				}
				if (!this.operatorId) {
					msg = "请选择代理商"
				}
				if (msg) {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return
				}
				let res = await addShops({
					mobile: this.mobile,
					shopAddress: this.shopAddress,
					shopName: this.shopName,
					operatorId: Number(this.operatorId),
				})
				
				if(res.code === '0'){
					uni.showToast({
						title: '添加成功!',
						icon: 'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/shop-list/shop-list?agentId=' + this.agentId + '&agentName=' + this.agentName
						});
					}, 2000)
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			},
		},
		onLoad(option) {
			this.agentId = option.agentId;
			this.operatorId = option.agentId;
			this.agentName = option.agentName;
			this.agentList()
		},
	}
</script>

<style lang="scss" scoped>
.add-box {
	position: relative;
	.content-box {
		.content {
			display: flex;
			padding: 0 10upx 30upx 10upx;
			.name {
				width: 130upx;
				height: 80upx;
				margin-right: 10upx;
				font-size: 28upx;
				line-height: 80upx;
				color: #333333;
				text-align: right;
			}
			.detail {
				flex: 1;
				border-bottom: 2upx solid #F5F5F5;
				height: auto;
				line-height: 80upx;
				input {
					height: 80upx;
					font-size: 28upx;
					line-height: 80upx;
				}
				textarea {
					height: 160upx;
					font-size: 28upx;
					line-height: 80upx;
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
