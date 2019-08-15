<template>
	<view id="save-qrcode-iamge">
	
		<view  id="save-qrcode-iamge-content">
			<view class="b">
				
			</view>
			<view id="qrcode-image" >
			
			</view>
			<view class="a">
			<view id="ignore-btton">
				.......................
				<button class="save-btn" @click="saveImage">保存图片</button>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script>
	import QRCode from "../../common/qrcode.js"
	import html2canvan from "../../common/html2canvas.js"
	import helper from "../../common/helper.js"
	export default {
		data() {
			return {

			}
		},
		onLoad(){
			
		},
		mounted() {
			this.$nextTick(()=>{
				this.makeQrCode()
			})
		},
		methods: {
			replaceImage(canvans) {
				const img = new Image();
				img.src = canvans.toDataURL()
			
				img.setAttribute('crossOrigin', 'anonymous');
				img.setAttribute('width', '100%'); //578 953
				img.setAttribute('height', '100%'); //578 953
				document.getElementById("save-qrcode-iamge-content").innerHTML = img.outerHTML
			},
			saveImage() {
				html2canvan(document.getElementById("save-qrcode-iamge"), {
					useCORS: true,
					scale: helper.DPR(),
					ignoreElements(element) {
						let id = element.id
						if (id.indexOf("ignore-") === 0) {
							return true;
						}
					}

				}).then((canvans) => {
					// if (helper.useAgent() == 'wechat') {
					uni.showModal({
						title: '',
						showCancel: false,
						content: '请长按图片保存',
					})
					this.replaceImage(canvans)
					
				});
			},
			makeQrCode(){
				var qrcodeObj = new QRCode('qrcode-image', {
					text: "www.baidu.com",
					width: uni.upx2px(259),
					height: uni.upx2px(259),
					colorDark: '#000000', //前景色
					colorLight: '#ffffff', //背景色
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.a {
		background-color: #007AFF;
		height: 100%;
		width: 100%;
	}
	.b{
		//background: #4CD964;
		height: 50%;
		width: 100%;
	}
	
	#qrcode-image {
		display: inline-block;
		width: 259upx;
		height: 259upx;
		padding: 6upx;
		//box-sizing: border-box;
		margin-top: 56upx;
		margin-bottom: 24upx;
		border: 1px solid #CCCCCC;
		text-align: center;
	}
</style>
