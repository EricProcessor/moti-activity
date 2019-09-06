<template>
	<view class="content">
		<view class="panel-header">
			<view v-if="0" class="header-title">我的订单</view>
			<view class="search-input">
				<i class="search-icon iconfont"></i>
				<input placeholder="输入客户手机号" placeholder-style="font-size: 28upx;color:rgba(198,198,198,1)"></input>
			</view>
			<view class="occupying-height"></view>
			<view class="tab-page">
				<view class="item" :class="{active: tagStatus == 'all'}" @click="tagStatus = 'all'">全部</view>
				<view class="item" :class="{active: tagStatus == 'untake'}" @click="tagStatus = 'untake'">待取货</view>
				<view class="item" :class="{active: tagStatus == 'complate'}" @click="tagStatus = 'complate'">已完成</view>
				<view class="item" :class="{active: tagStatus == 'cancel'}" @click="tagStatus = 'cancel'">已取消</view>
			</view>
		</view>

		<scroll-view :scroll-y="scrollY" :style="{height: scrollViewHeight}" :lower-threshold="100" @scrolltolower="loadData">
			<view class="panel-body">
				<view class="goods-item">
					<view class="buyer-state">
						<view class="name-mobile">
							<text>刘亦菲</text><text>(18800865622)</text>
						</view>
						<view class="order-status-text">待买家取货</view>
					</view>
					<view class="goods">
						<view class="goods-image">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="order-info">
							<view class="price-title">
								<view class="title">
									MOTI D13 电子烟套装 雾化换弹小烟（1烟杆+3烟弹） …
								</view>
								<view class="price-qty">
									<view class="price">￥999.80</view>
									<view class="qty">x3</view>
								</view>
							</view>
							<view class="goods-sku">烟杆一只+经典原味【烟弹*1枚】深海蓝</view>
						</view>
					</view>
					<view class="goods-total">
						<text class="total-text">共计3件商品 合计：</text>
						<text class="total-price">￥<text class="price-font">998.</text>00</text>
					</view>
					<view class="op-button">
						<button class="cancel-order" hover-class="button-hover" @click="showCancelOrder = true">取消订单</button>
						<button class="check-code" hover-class="button-hover" @click="showTakeGoodsCode = true">验证取货码</button>
					</view>
				</view>
				<view class="goods-item">
					<view class="buyer-state">
						<view class="name-mobile">
							<text>刘亦菲</text><text>(18800865622)</text>
						</view>
						<view class="order-status-text void">订单已取消</view>
					</view>
					<view class="goods">
						<view class="goods-image">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="order-info">
							<view class="price-title">
								<view class="title">
									MOTI D13 电子烟套装 雾化换弹小烟（1烟杆+3烟弹） …
								</view>
								<view class="price-qty">
									<view class="price">￥999.80</view>
									<view class="qty">x3</view>
								</view>
							</view>
							<view class="goods-sku">烟杆一只+经典原味【烟弹*1枚】深海蓝</view>
						</view>
					</view>
					<view class="goods-total">
						<text class="total-text">共计3件商品 合计：</text>
						<text class="total-price">￥<text class="price-font">998.</text>00</text>
					</view>
					<view class="op-button">
						<button class="cancel-order" @click="showCancelOrder = true">取消订单</button>
						<button class="check-code" @click="showTakeGoodsCode = true">验证取货码</button>
					</view>
				</view>
				<view class="goods-item">
					<view class="buyer-state">
						<view class="name-mobile">
							<text>刘亦菲</text><text>(18800865622)</text>
						</view>
						<view class="order-status-text void">订单已取消</view>
					</view>
					<view class="goods">
						<view class="goods-image">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="order-info">
							<view class="price-title">
								<view class="title">
									MOTI D13 电子烟套装 雾化换弹小烟（1烟杆+3烟弹） …
								</view>
								<view class="price-qty">
									<view class="price">￥999.80</view>
									<view class="qty">x3</view>
								</view>
							</view>
							<view class="goods-sku">烟杆一只+经典原味【烟弹*1枚】深海蓝</view>
						</view>
					</view>
					<view class="goods-total">
						<text class="total-text">共计3件商品 合计：</text>
						<text class="total-price">￥<text class="price-font">998.</text>00</text>
					</view>
					<view class="op-button">
						<button class="cancel-order" @click="showCancelOrder = true">取消订单</button>
						<button class="check-code" @click="showTakeGoodsCode = true">验证取货码</button>
					</view>
				</view>
				<view class="goods-item">
					<view class="buyer-state">
						<view class="name-mobile">
							<text>刘亦菲</text><text>(18800865622)</text>
						</view>
						<view class="order-status-text void">订单已取消</view>
					</view>
					<view class="goods">
						<view class="goods-image">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="order-info">
							<view class="price-title">
								<view class="title">
									MOTI D13 电子烟套装 雾化换弹小烟（1烟杆+3烟弹） …
								</view>
								<view class="price-qty">
									<view class="price">￥999.80</view>
									<view class="qty">x3</view>
								</view>
							</view>
							<view class="goods-sku">烟杆一只+经典原味【烟弹*1枚】深海蓝</view>
						</view>
					</view>
					<view class="goods-total">
						<text class="total-text">共计3件商品 合计：</text>
						<text class="total-price">￥<text class="price-font">998.</text>00</text>
					</view>
					<view class="op-button">
						<button class="cancel-order" @click="showCancelOrder = true">取消订单</button>
						<button class="check-code" @click="showTakeGoodsCode = true">验证取货码</button>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="show-qrcode" @click="showShopQrcode = true;scrollY = false">
			<image src="../../static/icon/shop-qrcode.png" mode=""></image>
			<text>门店二维码</text>
		</view>
		<uniPopup :show="showCancelOrder" type="middle" mode="fixed" :h5Top="h5Top" @hidePopup="hidePopup">
			<view class="popup-cancle-order">
				<view class="pup-cancel-title">确认取消订单吗？</view>
				<view class="pco-user">
					<text class="pcoun-title">客户姓名：</text>
					<text class="pcoun-value">李小璐</text>
				</view>
				<view class="pco-user">
					<text class="pcoun-title">手机号码：</text>
					<text class="pcoun-value">1388899009</text>
				</view>
				<view class="confirm-btn">
					<button>确定</button>
				</view>
				<view class="close-view" @click="showCancelOrder = false">
					<image src="../../static/icon/close.png" mode=""></image>
				</view>
			</view>
		</uniPopup>

		<!-- 请用户提供取货码 -->
		<uniPopup :show="showTakeGoodsCode" type="middle" mode="fixed" :h5Top="h5Top" @hidePopup="hidePopup">
			<view class="popup-take-code">
				<view class="pup-title">请用户提供取货码</view>
				<view class="pup-input " :class="{error:takeGoodsCode.length>10}">
					<input v-model="takeGoodsCode"></input>
					<view class="error-tip" v-if=" takeGoodsCode.length>10 ">
						取货码错误，请重新输入
					</view>
				</view>
				<view class="confirm-btn">
					<button @click="checkCode">确定</button>
				</view>
				<view class="close-view" @click="closeShowTakeGoodsPop">
					<image src="../../static/icon/close.png" mode=""></image>
				</view>
			</view>
		</uniPopup>

		<uniPopup v-if="showShopQrcode" :show="showShopQrcode" type="middle" mode="fixed" :h5Top="h5Top">

			<view class="shop-qrcode-info" id="save-qrcode-iamge">
				<view id="save-qrcode-iamge-content">


					<view>
						<image class="moti-logo" src="../../static/moti-logo.png"></image>
					</view>
					<view class="ssqc-title">MOTI 魔笛电子烟夏日钜惠 </view>
					<view class="ssqc-discount">购149元烟弹送<text class="red">199</text>元套装</view>
					<view>
						<image class="qrcode-image" src="../../static/aaaa.png"></image>
					</view>
					<view class="tip-one">扫描二维码进店</view>
					<view class="tip-two">活动时间：9月1日-10月30日</view>
					<view id="ignore-btton">
						<button class="save-btn" @click="saveImage">保存图片</button>
					</view>
				</view>
				<view class="close-view" @click="showShopQrcode = false;scrollY = true" id="ignore-close">
					<image src="../../static/icon/close.png"></image>
				</view>
				<!-- <i class="close iconfont " ></i> -->
			</view>
		</uniPopup>
	</view>

</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import html2canvan from "../../common/js/html2canvas.js"
	import saveAs from "../../common/js/FileSaver.js"
	import helper from "../../common/js/helper.js"
	export default {
		data() {
			return {
				showCancelOrder: false,
				showTakeGoodsCode: false,
				h5Top: true,
				showShopQrcode: false,
				IsSaving: false,
				tagStatus: 'all',
				takeGoodsCode: '',
				scrollViewHeight: "100%",
				scrollY: true
			}
		},
		methods: {
			exportCanvasAsPNG(canvans, fileName) {
				let MIME_TYPE = "image/png";
				let imgURL = canvans.toDataURL(MIME_TYPE);
				let dlLink = document.createElement('a');
				dlLink.download = fileName;
				dlLink.href = imgURL;
				dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
				document.body.appendChild(dlLink);
				dlLink.click();
				document.body.removeChild(dlLink);
			},
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
					useCORS: false,
					scale: helper.DPR(),
					ignoreElements(element) {
						let id = element.id
						if (id.indexOf("ignore-") === 0) {
							return true;
						}
					}

				}).then((canvans) => {
					if (helper.useAgent() == 'wechat') {
						uni.showModal({
							title: '',
							showCancel:false,
							content: '请长按图片保存',
						})
						this.replaceImage(canvans)
						return
					}

					canvans.toBlob(blob => {
						saveAs(blob, "MOTI魔笛9 - 10月限时福利活动.png")
					})
				});
			},
			checkCode() {
				console.log(this.takeGoodsCode)
			},
			closeShowTakeGoodsPop() {
				this.showTakeGoodsCode = false
				this.takeGoodsCode = ""
			},
			loadData() {
				console.log("触发 load more ...")
			},

		},
		components: {
			uniPopup
		},
		onReady() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					let view = uni.createSelectorQuery().select(".panel-header");
					view.boundingClientRect(data => {
						_this.scrollViewHeight = (res.windowHeight - data.height) + 'px'
					}).exec();
				}
			})
		}
	}
</script>

<style>
	body {
		background-color: #8F8F94;
	}
</style>
<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}

	.content {

		.panel-header {
			background-color: #FFFFFF;
			padding: 16upx 24upx 0upx 24upx;

			.occupying-height {
				height: 16upx;
			}

			.header-title {
				font-size: 37upx;
				line-height: 52upx;
				vertical-align: middle;
				height: 88upx;
				color: #000000;
				text-align: center;
				padding: 18upx 0;
				box-sizing: border-box;

			}

			.search-input {
				width: 100%;
				height: 56upx;
				background-color: #f7f7f7;
				border-radius: 28.5upx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 8upx 0;

				i {
					font-size: 32upx;
					margin-right: 17upx;
					margin-left: 24upx;
					color: rgba(198, 198, 198, 1);
				}

			}
		}

		.tab-page {

			display: flex;
			height: 72upx;
			box-sizing: border-box;
			padding: 16upx 55upx;
			justify-content: space-between;

			.item {
				font-size: 28upx;
				line-height: 40upx;
				position: relative;

				&.active {
					font-weight: bold;
					color: rgba(251, 105, 71, 1);

					&::after {
						position: absolute;
						left: 0;
						bottom: -16upx;
						content: ' ';
						display: block;
						width: 100%;
						height: 4upx;
						background: rgba(251, 105, 71, 1);
					}
				}
			}
		}

		.panel-body {
			background-color: #f7f7f7;
			padding: 32upx 24upx;

			.goods-item {
				background-color: #FFFFFF;
				border-radius: 12upx;
				padding: 29upx 24upx 32upx 24upx;
				margin-bottom: 32upx;

				.buyer-state {
					display: flex;
					justify-content: space-between;
					height: 37upx;
					margin-bottom: 34upx;

					.name-mobile {
						font-size: 26upx;
						color: #333333;
						line-height: 37upx;

						:first-child {
							margin-right: 16upx;
						}
					}

					.order-status-text {
						color: #FB6947;
						font-size: 26upx;
						line-height: 37upx;

						&.void {
							color: #999999;
						}
					}
				}

				.goods {
					display: flex;
					justify-content: space-between;
					height: 148upx;

					.goods-image image {
						width: 148upx;
						height: 148upx;
						border-radius: 4upx;
						padding: 0;
						margin: 0;
					}

					.order-info {
						padding: 14upx 0;

						.price-title {

							.title {
								font-size: 24upx;
								line-height: 33upx;
								height: 66upx;
								width: 374upx;
								display: inline-block
							}

							.price-qty {
								display: inline-block;
								text-align: right;
								width: 107upx;

								.price {
									height: 33upx;
									font-size: 24upx;
								}

								.qty {
									height: 33upx;
									font-size: 22upx;
									color: #999999;
								}
							}
						}

						.goods-sku {
							color: #999999;
							font-size: 22upx;
							margin-top: 19upx;
						}

					}

				}

				.goods-total {
					margin-top: 32upx;
					text-align: right;
					height: 50upx;
					line-height: 50upx;
					margin-bottom: 34upx;
					vertical-align: middle;

					.total-text {
						font-size: 24upx;

					}

					.total-price {
						font-size: 24upx;
						color: #151515;

						.price-font {
							font-size: 36upx;

						}
					}
				}

				.op-button {
					display: flex;
					justify-content: space-between;

					.cancel-order {
						width: 314upx;
						background-color: #CCCCCC;
						color: #FFFFFF;
						font-size: 28upx;

					}

					.check-code {
						width: 314upx;
						background-color: #FB6947;
						color: #FFFFFF;
						font-size: 28upx;

						&.button-hover {
							background: #E55D3E;
							color: #FFC5B7;
						}
					}
				}
			}
		}

		.show-qrcode {
			position: absolute;
			bottom: 40upx;
			right: 0upx;
			background-color: #333333;
			border-radius: 35upx 0 0 35upx;
			color: #FFFFFF;
			height: 68.3upx;
			line-height: 68.3upx;
			vertical-align: middle;
			width: 231upx;
			font-size: 28upx;
			box-sizing: border-box;
			padding-left: 25upx;

			image {
				margin-right: 16upx;
				position: relative;
				top: 1upx;
				font-size: 28upx;
				width: 24upx;
				height: 24upx;
			}
		}

		.popup-cancle-order {
			width: 578upx;
			height: 380upx;
			box-sizing: border-box;

			.pup-cancel-title {
				font-size: 32upx;
				line-height: 45upx;
				text-align: center;
				margin-top: 34upx;
				margin-bottom: 51upx;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: #333333;
			}

			.pco-user {
				line-height: 40upx;
				font-size: 28upx;
				margin-left: 2upx;
				margin-bottom: 13upx;

				.pcoun-title {
					color: #999999;
				}

				.pcoun-value {
					color: #333333;
				}
			}

			.confirm-btn {
				margin-top: 48upx;
				width: 100%;

				button {
					height: 104upx;
					line-height: 104upx;
					width: 590ux;
					text-align: center;
					font-size: 36upx;
					background-color: #FB6947;
					color: #FFFFFF;

					&.button-hover {
						background: #E55D3E;
						color: #FFC5B7;
					}

				}
			}

			.close-view {
				position: absolute;
				top: 33.2upx;
				right: 33.3upx;
				width: 30upx;
				height: 30upx;

				image {
					width: 25.5upx;
					height: 25.5upx;
				}

			}

		}

		.popup-take-code {
			width: 578upx;
			height: 380upx;
			box-sizing: border-box;
			text-align: center;

			.pup-title {
				font-size: 32upx;
				line-height: 45upx;
				text-align: center;
				margin-top: 34upx;
				margin-bottom: 59upx;
				font-weight: bold;
			}

			.pup-input {

				box-sizing: border-box;
				border: 2upx solid #DADADA;
				border-radius: 12upx;
				margin: 0 69upx;
				line-height: 80upx;
				position: relative;

				&.error {
					border: 2px solid #FF1836;
				}

				.error-tip {
					position: absolute;
					font-family: PingFang-SC-Medium;
					font-size: 24upx;
					color: #FF1836;
					letter-spacing: 0;
					width: 440upx;
					text-align: center;
					height: 33upx;
					//line-height: 33upx;
					bottom: -20upx;
				}

				input {
					width: 440upx;
					height: 80upx;
				}
			}

			.confirm-btn {
				margin-top: 64upx;

				button {
					background-color: #FB6947;
					//	width: 590upx;
					height: 104upx;
					line-height: 104upx;
					font-size: 36upx;
					color: #FFFFFF;

					&.button-hover {
						background: #E55D3E;
						color: #FFC5B7;
					}
				}
			}

			.close-view {
				position: absolute;
				top: 33.2upx;
				right: 33.3upx;
				width: 30upx;
				height: 30upx;

				image {
					width: 25.5upx;
					height: 25.5upx;
				}
			}

		}

		.shop-qrcode-info {
			width: 578upx;
			height: 953upx;
			text-align: center;

			.moti-logo {
				width: 129.3upx;
				height: 156.7upx;
				margin: 40upx 0 40.3upx 0;
			}

			.ssqc-title {
				line-height: 50upx;
				height: 50upx;
				font-size: 36upx;
				margin-bottom: 18upx;
			}

			.ssqc-discount {
				font-size: 28upx;
				color: #333333;
				height: 48upx;
				line-height: 48upx;

				.red {
					color: #FB6947;
					font-size: 34upx;
				}
			}

			.qrcode-image {
				width: 271upx;
				height: 271upx;
				box-sizing: border-box;
				margin-top: 56upx;
				margin-bottom: 24upx;
				border: 1px solid #CCCCCC;
				//padding: 23upx 22upx;
				//text-align: center;
			}

			.tip-one {
				font-size: 24upx;
				color: #999999;
				height: 33upx;
				line-height: 33upx;
			}

			.tip-two {
				margin-top: 48upx;
				margin-bottom: 24upx;
				font-size: 24upx;
				color: #999999;
				height: 33upx;
				line-height: 33upx;
			}

			.save-btn {
				background-color: #FB6947;
				color: #FFFFFF;
				font-size: 36upx;
				height: 104upx;
				line-height: 104upx;
				position: relative;

				&.button-hover {
					background: #E55D3E;
					color: #FFC5B7;
				}

				//top:6upx;
			}

			.close-view {
				position: absolute;
				top: 33.2upx;
				right: 33.3upx;
				width: 30upx;
				height: 30upx;

				image {
					width: 25.5upx;
					height: 25.5upx;
				}
			}
		}
	}

	button::after {
		border: none;
	}

	input {
		font-weight: 600;
	}
</style>
