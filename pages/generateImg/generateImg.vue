<template>
	<view id="save-qrcode-iamge">
		<view id="save-qrcode-iamge-content">
			<view class="content">
				<view class="cont">
					<view class="infoBox">
						<image src='/static/mine.png'></image>
						<view class="rgBox">
							<view class="name">阿牛</view>
							<view class="action"></view>
							<view class="bottom">亲，我正在参加MOTI S 免费送活动， 还差24个好友助力，快来帮我顶一下！</view>
						</view>
					</view>
					<view class="codeImg" id="qrcode-image">
						
					</view>
					<view class="tishi">微信扫码即可为我助力</view>
					<view class="text">非个人原因 烟杆终身免费换新</view>
					<view class="text">活动时间 即日起至2019年09月20日</view>
				</view>
			</view>
			<view id="ignore-btton">
				<button class="save-btn" @click="saveImage">保存图片</button>
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

<style lang="scss">
	#save-qrcode-iamge {
		height: 100%;
		background: #F5F5F5;
		padding-top: 1upx;

		.save-btn {
			width: 500upx;
			line-height: 72upx;
			background: rgba(249, 56, 34, 1);
			border-radius: 8upx;
			color:#FFFFFF;
			font-size:28upx;
		}

		.content {
			background: #121518;
			height: 889upx;
			width: 500upx;
			margin: 100upx auto 40upx;
			background-image: url('../../static/bgimg.jpg');
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 100%;
			padding-top: 1upx;
			position: relative;

			.cont {
				top: 50%;
				position: absolute;
				left: 5%;

				.text {
					font-size: 22upx;
					color: #fff;
					text-align: center;
					line-height: 35upx;
				}

				.tishi {
					font-size: 22upx;
					color: #F93822;
					text-align: center;
					margin-bottom: 20upx;
				}

				.codeImg {
					width: 120upx;
					height: 120upx;
					background: #fff;
					margin: 25upx auto 15upx;
				}

				.infoBox {
					border: 1upx solid #EDE8E4;
					width: 80%;
					padding: 15upx 30upx;
					border-radius: 8upx;

					display: flex;
					justify-content: flex-start;
					align-items: center;

					image {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						margin-right: 15upx;
						flex-shrink: 0;
					}

					.rgBox {
						flex-grow: 1;
						display: flex;
						font-size: 18upx;
						color: #EDE8E4;
						flex-direction: column;
						height: 120upx;

						.bottom {
							line-height: 28upx;
							font-size: 20upx;
							text-align: justify;
						}

						.action {
							flex: 1 0 auto;
						}
					}
				}
			}
		}
	}
</style>
