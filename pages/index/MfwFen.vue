<template>
	<view class="mfw-fen">
		<img style="width:750upx" @load ="imgFinish"  @tap="jumpTo" src="../../static/images/mfw/ad.jpg"  />
		<img style="width:750upx" @load ="imgFinish" id="acher" @tap="jumpTo" src="../../static/images/mfw/ad-btn.jpg"  />
	</view>
</template>

<script>
	export default{
		data(){
			return {
				count:0
			}
		},
		methods:{
			imgFinish(){
				this.count++
				if(this.count >= 2){
					this.scrollToBottom()
				}
			},
			jumpTo(){
				location.href = location.origin + "?type=65&orderSource=1002&channel=mafengwo&material=001"
			},
			scrollToBottom(){
				let d = document.getElementById("acher")
				
				uni.pageScrollTo({
					scrollTop:d.offsetTop,
					duration:300
				})
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
