<template>
	<view class="content">
		<view class="main-picture">
			
		</view>
		<view class="goods-picture">
			<view class="good-item" v-for="(item,index) in spuList"  :key="index" @click="linkTo(item)">
				<image :src="item.pictureUrlC" mode="widthFix"></image>
				<view class="buy-button">
					<image v-if="item.marketPrice > 198" src="../../static/image/buy-button-62.png" mode=""></image>
					<image v-else="" src="../../static/image/buy-button-52.png" mode=""></image>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import {post,get,postForm} from "../../common/request.js"
	import {saveType} from '../../common/unils.js'
	export default {
		data() {
			return {
				title: 'Hello',
				spuList:[]
			}
		},
		onLoad(options) {
			this.getSpuList()
			this.saveTypeAndCode(options.code ? options.code : '' )
			
		},
		methods: {
			linkTo(data){
				uni.navigateTo({
					url:"/pages/detail/detail?spuId=" + data.spuId
				})
			},
			async saveTypeAndCode(code){
				let res = await postForm("/mall/h5/ofo/saveTypeAndCode",{code:code,type:saveType})
				console.log(res)
			},
			async getSpuList(){
				let res = await post("/mall/h5/ofo/goodsSpuList")
				if(res.code == 0)    this.spuList = res.result 
				else return uni.showToast({
					title:"获取商品失败",
					icon:"none"
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #FFFFFF;
	}
	.content {
		
		.main-picture{
			height:1200upx;
			width: 750upx;
			background: no-repeat url("../../static/goods/bgimg.jpg");
			background-size: cover;
			position: absolute;
			
			
		}
		.goods-picture{
			
			padding: 0 24upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			position: relative;
			top: 950upx;
			.good-item{
				width: 346upx;
				height: 560upx;
				margin-bottom: 10upx;
				position: relative;
				image{
					width: 346upx;
					height: 560upx;
					
				}
				.buy-button{
					position: absolute;
					bottom: 34upx;;
					margin: 4upx 42upx;
					height: 47upx;
					image{
						width: 261upx;
						height: 47upx;
					}
				}
			}
			
		}
	}

	
</style>
