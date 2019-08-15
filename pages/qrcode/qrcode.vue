<template>
	<view id="save-qrcode-iamge">
		<view  id="save-qrcode-iamge-content">
			<view class="b">
				
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
			}
		}
	}
</script>

<style>
	.a {
		background-color: #007AFF;
		height: 100%;
		width: 100%;
	}
	.b{
		background: #4CD964;
		height: 50%;
		width: 100%;
	}
</style>
