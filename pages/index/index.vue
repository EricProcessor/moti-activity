<template>
	<view class="index-content">
		<header-box></header-box>
		<footer-box></footer-box>
		<view class='joinBtn btn' @tap='joinBtn'>我要参与活动</view>
		<view class="pop-up" v-if='isJoin'>
			<view class="pop"></view>
			<view class="pop-content">
				<view class="title">我要参与活动</view>
				<view class="tit">请选择参与方式，点击后不可进行修改哦</view>
				<view @tap='selected(item.id)' :class='{active:selectedIndex==item.id}' class="content-li" v-for='(item,index) in activityInfo' :key='index'>
					<view class="content-top">{{item.title}}</view>
					 <view class="content">{{item.content}}</view>
				</view>
				<view class="btn confirm" @tap='confirm'>确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerBox from '@/components/header.vue'
	import footerBox from '@/components/footer.vue'
	export default {
		components: {
			headerBox,
			footerBox
		},
		data() {
			return {
				isJoin:false,
				selectedIndex:0,
				activityInfo:[
					{
						title:'我从没使用过电子烟产品',
						content:'(从未使用过电子烟)',
						id:1
					},
					{
						title:'我是MOTI（MT产品）',
						content:'(有在使用MOTI（MT）换弹式电子烟）',
						url:'/pages/userB/userB',
						id:2
					},
					{
						title:'我有其他品牌的换弹式电子烟',
						content:'(使用过其他品牌电子烟）',
						url:'/pages/userC/userC',
						id:3
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			selected(index){
				this.selectedIndex=index;
			},
			joinBtn(){
				this.isJoin = !this.isJoin;
			},
			confirm(){
				let type = this.selectedIndex;
				if(type==0){
					uni.showToast({
						icon:'none',
						title:'请选择'
					})
				}else{
					this.isJoin = false;
					switch(type){
						case 1:
							uni.navigateTo({
								url:'/pages/userA/userA'
							});
							break;
						case 2:
							uni.navigateTo({
								url:'/pages/userB/userB'
							});
							break;
						case 3:
							uni.navigateTo({
								url:'/pages/userC/userC'
							});
							break;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.index-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		.btn{
			background: #F93822;
			color: #fff;
			text-align: center;
		}

		.joinBtn {
			line-height: 90upx;
			flex: 0 0 auto;
		}
		.pop-up{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.7);
			position:fixed;
			top:0;
			z-index:10;
			display: flex;
			flex-direction: column;
			.pop{
				flex: 1 0 auto;
			}
			.pop-content{
				background: #fff;
				padding:40upx 24upx 30upx;
				text-align: center;
				font-weight: 400;
				.title{
					font-size:44upx;
					color:#333;
					font-weight: 600;
					line-height: 62upx;
				}
				.tit{
					font-size:30upx;
					line-height: 42upx;
					margin:10upx 0 40upx;
				}
				.confirm{
					line-height:72upx;
					border-radius: 8upx;
				}
				.content-li{
					border-radius: 10upx;
					margin-bottom:30upx;
					border:1px solid rgba(51,51,51,.5);
					text-align: left;
					padding:29upx 40upx;
					color:#333;
					.content-top{
						font-size:32upx;
						font-weight: 500;
						line-height:45upx;
					}
					.content{
						font-size:26upx;
						line-height:37px;
					}
				}
				.active{
					background:rgba(249,56,34,1);
					border:none;
					color:#fff;
				}
			}
		}
	}
</style>
