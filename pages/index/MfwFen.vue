<template>
	<view class="mfw-fen">
		<img style="width:750upx" src="../../static/images/mfw/ad.jpg"  />
		<img style="width:750upx" @tap="jumpTo" src="../../static/images/mfw/ad-btn.jpg"  />
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			jumpTo(){
				location.href = location.origin + "?type=65&orderSource=1002&channel=mafengwo&material=001"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mfw-fen{
		
		img{
			display: block;
			
		}
	}
</style>
