<template>
	<view class="content">
		<view class="header-none">
			<view class="panel-header">
				<view v-if="0" class="header-title">我的订单</view>
				<view class="search-input">
					<i class="search-icon iconfont search"></i>
					<input @confirm="phoneLoadData()" v-model="phone" placeholder="输入客户手机号" placeholder-style="font-size: 28upx;color:rgba(198,198,198,1)"></input>
					<view class="close-v" v-if="phone.length>0">
						<image @click="phone='';phoneLoadData()" src="../../static/icon/input-close.png"></image>
					</view>
				</view>
				<view class="occupying-height"></view>
				<view class="tab-page">
					<view class="item" :class="{active: tagStatus == 'all'}" @click="tagStatus = 'all';currentSwiper=0;">全部</view>
					<view class="item" :class="{active: tagStatus == 'OKPAY'}" @click="tagStatus = 'OKPAY';currentSwiper=1;">待取货</view>
					<view class="item" :class="{active: tagStatus == 'FINISH'}" @click="tagStatus = 'FINISH';currentSwiper=2;">已完成</view>
					<view class="item" :class="{active: tagStatus == 'CANCEL'}" @click="tagStatus = 'CANCEL';currentSwiper=3;">已取消</view>
				</view>

			</view>
			<view class="height-occupy-32">

			</view>
		</view>

		<swiper class="panel-body" :current="currentSwiper" @change="tabPage" :style="{height: scrollViewHeight}" :duration="500">
			<swiper-item>
				<view class="swiper-item">
					<scroll-view :scroll-y="scrollY" :style="{height: scrollViewHeight}" :lower-threshold="threshold" @scrolltolower="loadData('all')">
					<view class="no-order-tip" v-if="orderList.AllOrder.data.length === 0">
						<view class="">
							您还没有订单，请给用户出示门店二维
						</view>
						<view class="">
							码，引导用户扫码参加活动哦~
						</view>
					</view>
					<view class="" v-else>
						<order-item :key="key" v-for="(order,key) in orderList.AllOrder.data" :data="changePrice(order)" @cancelorder="cancelOrder"
						 @confirmorder="confirmorder"></order-item>
					</view>
					
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<scroll-view :scroll-y="scrollY" :style="{height: scrollViewHeight}" :lower-threshold="threshold" @scrolltolower="loadData('OKPAY')">
						<order-item :key="key" v-for="(order,key) in orderList.untakeOrder.data" :data="changePrice(order)" @cancelorder="cancelOrder"
						 @confirmorder="confirmorder"></order-item>

					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<scroll-view :scroll-y="scrollY" :style="{height: scrollViewHeight}" :lower-threshold="threshold" @scrolltolower="loadData('FINISH')">
						<order-item :key="key" v-for="(order,key) in orderList.complateOrder.data" :data="changePrice(order)" @cancelorder="cancelOrder"
						 @confirmorder="confirmorder"></order-item>

					</scroll-view>
				</view>
			</swiper-item>

			<swiper-item>
				<view class="swiper-item">
					<scroll-view :scroll-y="scrollY" :style="{height: scrollViewHeight}" :lower-threshold="threshold" @scrolltolower="loadData('CANCEL')">
						<order-item :key="key" v-for="(order,key) in orderList.cancelOrder.data" :data="changePrice(order)" @cancelorder="cancelOrder"
						 @confirmorder="confirmorder"></order-item>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>



		<view class="show-qrcode" @click="showQrPupp">
			<image src="../../static/icon/shop-qrcode.png" mode=""></image>
			<text>门店二维码</text>
		</view>
		<uniPopup :show="showCancelOrder" type="middle" mode="fixed" :h5Top="h5Top" @hidePopup="hidePopup">
			<view class="popup-cancle-order">
				<view class="pup-cancel-title">确认取消订单吗？</view>
				<!-- <view class="pco-user">
					<text class="pcoun-title">客户姓名：</text>
					<text class="pcoun-value">李小璐</text>
				</view> -->
				<view class="pco-user">
					<text class="pcoun-title">手机号码：</text>
					<text class="pcoun-value">{{operationOrder.buyerPhone}}</text>
				</view>
				<view class="confirm-btn">
					<button @click="cancelOperatorOrder">确定</button>
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
				<view class="pup-input " :class="{error:takeQrCodeErr}">
					<input v-model="takeGoodsCode"></input>
					<view class="error-tip" v-if="takeQrCodeErr">
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
					<view class="ssqc-discount">任意商品满99元送装<text class="red">199</text>元套装</view>
					<view id="qrcode-image" :style="{}">

					</view>
					<!-- <view id="">
						<image class="qrcode-image" :src="qrUrl"></image>
					</view> -->
					<view class="tip-one">扫描二维码进店</view>
					<view class="tip-two">活动时间：8月1日-9月30日</view>
					<view id="ignore-btton">
						<button class="save-btn" @click="saveImage">保存图片</button>
					</view>
				</view>
				<view class="close-view" @click="showShopQrcode = false;scrollY = true;" id="ignore-close">
					<image src="../../static/icon/close.png"></image>
				</view>
				<!-- <i class="close iconfont " ></i> -->
			</view>
		</uniPopup>
	</view>

</template>

<script>
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	import orderItem from "../../components/orderItem/orderItem.vue"
	import html2canvan from "../../common/js/html2canvas.js"
	import saveAs from "../../common/js/FileSaver.js"
	import helper from "../../common/js/helper.js"
	import * as CommData from "../../common/js/common/const.js"
	import QRCode from "../../common/js/qrcode.js"
	import {
		GoodsUrl,
		ActivityId
	} from "../../common/js/common/const.js"
	import {
		orders,
		updateOrderStatus,
		qrcode
	} from "../../common/js/interface/register.js"

	export default {
		data() {
			return {
				showCancelOrder: false, //取消订单弹框判断
				showTakeGoodsCode: false, // 取货码字段
				h5Top: true,
				showShopQrcode: false, // 二维码弹窗    
				tagStatus: 'all', //tagPage 状态
				scrollViewHeight: "100%",
				threshold: 100,
				scrollY: true, // 是否垂直滚动
				currentSwiper: 0,
				phone: "",
				operationOrder: {},
				takeGoodsCode: '', // 取货码
				qrUrl: '',
				tmpShowQrBool: false,
				takeQrCodeErr: false,
				orderList: {
					AllOrder: {
						conditions: {
							pageNum: 1
						},
						data: []
					},
					untakeOrder: {
						conditions: {
							pageNum: 1
						},
						data: []
					},
					complateOrder: {
						conditions: {
							pageNum: 1
						},
						data: []
					},
					cancelOrder: {
						conditions: {
							pageNum: 1
						},
						data: []
					}
				},
			}
		},
		methods: {
			changePrice(order){
			  order.totalPrice = 129
			  for(let item of order.details){
				  if(parseInt(item.goodsPrice)) item.goodsPrice = 129
			  }
			  return order
			},
			showQrPupp() {
				this.showShopQrcode = true;
				this.scrollY = false;
				let qrurl = GoodsUrl + "?activityid=" + ActivityId + "&shopid=" + uni.getStorageSync("shopId")
				this.$nextTick(() => {
					var qrcodeObj = new QRCode('qrcode-image', {
						text: qrurl,
						width: uni.upx2px(259),
						height: uni.upx2px(259),
						colorDark: '#000000', //前景色
						colorLight: '#ffffff', //背景色
					})
				})

			},
			tabPage(event) {
				let tab = ['all', 'OKPAY', 'FINISH', 'CANCEL']
				this.currentSwiper = event.detail.current
				this.tagStatus = tab[event.detail.current]
				let condition = {}
				if (this.tagStatus === 'all') condition = this.orderList.AllOrder.conditions
				if (this.tagStatus === 'OKPAY') condition = this.orderList.untakeOrder.conditions
				if (this.tagStatus === 'FINISH') condition = this.orderList.complateOrder.conditions
				if (this.tagStatus === 'CANCEL') condition = this.orderList.cancelOrder.conditions
				if (condition.pageNum === 1) this.getOrders(this.tagStatus)
			},
			cancelOrder(data) {
				this.showCancelOrder = true
				this.operationOrder = data
			},
			confirmorder(obj) {
				this.showTakeGoodsCode = true
				this.operationOrder = obj
			},
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
					useCORS: true,
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
							showCancel: false,
							content: '请长按图片保存',
						})
						this.replaceImage(canvans)
						return
					}

					canvans.toBlob(blob => {
						saveAs(blob, "MOTI魔笛8 - 9月限时福利活动.png")
					})
				});
			},
			checkCode() {
				//console.log(this.takeGoodsCode)
				this.takeOrder()
			},
			async cancelOperatorOrder() {
				let res = await updateOrderStatus({
					orderId: this.operationOrder.orderId,
					getProductCode: "",
					orderStatus: "CANCEL"
				})
				if (res.code === '0') {
					uni.showToast({
						title: "取消成功",
						icon: 'none'
					})
					this.showCancelOrder = false
					this.operationOrder.orderStatus = "CANCEL"
					this.operationOrder = {}
					this.clearOrderList(["AllOrder","cancelOrder", "untakeOrder"])

				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			},
			closeShowTakeGoodsPop() {
				this.showTakeGoodsCode = false
				this.takeGoodsCode = ""
				this.operationOrder = {}
			},
			loadData(orderStatus) {
				console.log('-----search----');
				this.getOrders(orderStatus)
			},
			phoneLoadData() {
				this.orderList.AllOrder = {
					conditions: {
						pageNum: 1
					},
					data: []
				}
				this.currentSwiper = 0
				this.loadData('all')
			},
			async getOrders(orderStatus) {
				let orderListObj = {}
				if (orderStatus === 'all') orderListObj = this.orderList.AllOrder
				if (orderStatus === 'OKPAY') orderListObj = this.orderList.untakeOrder
				if (orderStatus === 'FINISH') orderListObj = this.orderList.complateOrder
				if (orderStatus === 'CANCEL') orderListObj = this.orderList.cancelOrder
				let _orderStatus = orderStatus;
				if (orderStatus === 'all') _orderStatus = ""
				if (orderStatus === 'OKPAY') _orderStatus = "SEND"
				let res = await orders({
					shopId: uni.getStorageSync("shopId"),
					activityId: CommData.ActivityId,
					conditions: {
						conditions: {
							orderStatus: _orderStatus,
							phone: this.phone
						},
						pageNum: orderListObj.conditions.pageNum,
						pagesize: 10
					},
				});
				uni.stopPullDownRefresh();
				if (res.code !== '0' && res.code !== "112") {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					if (res.code === '3') {
						uni.removeStorageSync('token');
						uni.removeStorageSync('shopId');
						uni.removeStorageSync('managerShopAttId');
						uni.removeStorageSync('manageQrCodeImg');
						uni.redirectTo({
							url: '/pages/login/login'
						});
					}
					return
				}

				if (res.code === '0') {
					orderListObj.data.push(...res.result.list)
					orderListObj.conditions.pageNum++
				}

				//	console.log(this.orderList)
				/* if(orderStatus === 'all') this.orderList.AllOrder.data.push(... res.result.list)
				if(orderStatus === 'OKPAY') this.orderList.untakeOrder.data.push(... res.result.list)
				if(orderStatus === 'FINISH')  this.orderList.complateOrder.data.push(... res.result.list)
				if(orderStatus === 'CANCEL')  this.orderList.cancelOrder.data.push(... res.result.list) */


			},
			clearOrderList(arr) {
				if (Array.isArray((arr))) {
					for (let key in arr) {
						let v = arr[key]
						this.orderList[v].conditions.pageNum = 1
						this.orderList[v].data = []
					}
				} else {
					let v = arr
					this.orderList[v].conditions.pageNum = 1
					this.orderList[v].data = []
				}

			},
			async takeOrder(status) {
				if (!this.takeGoodsCode) return
				let res = await updateOrderStatus({
					orderId: this.operationOrder.orderId,
					getProductCode: this.takeGoodsCode,
					orderStatus: "FINISH"
				})
				if (res.code === '0') {
					this.operationOrder.orderStatus = "FINISH"
					this.closeShowTakeGoodsPop()
					if (this.tagStatus === 'all') this.clearOrderList(["untakeOrder", "complateOrder"])
					else this.clearOrderList(["AllOrder", "untakeOrder", "complateOrder"])
					uni.showToast({
						title: "验证成功",
						icon: 'none'
					})
					return
				}
				this.takeQrCodeErr = true
				setTimeout(() => {
					this.takeQrCodeErr = false
				}, 3000)


			},
			async getQrUrl() {
				this.qrUrl = uni.getStorageSync("manageQrCode")
				let res = await qrcode({
					shopAttDetailId: uni.getStorageSync("managerShopAttId")
				})
				if (res.code === '0') {
					//	console.log(res)
				}
			}
		},
		components: {
			uniPopup,
			orderItem
		},
		onLoad(option) { //showQrCode
			if (option.showQrCode) this.tmpShowQrBool = true
			this.getOrders("all")
		},
		mounted() {
			if (this.tmpShowQrBool) this.showQrPupp()
		},
		onReady() {
			let token = uni.getStorageSync("token")
			if (!token) {
				uni.redirectTo({
					url: "/pages/login/login"
				})
			}
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					let view = uni.createSelectorQuery().select(".header-none");
					view.boundingClientRect(data => {
						_this.scrollViewHeight = (res.windowHeight - data.height) + 'px'
					}).exec();

					let goodItem = uni.createSelectorQuery().select(".goods-item");
					goodItem.boundingClientRect(data => {
						//console.log(data)
						//	_this.scrollViewHeight = (data.height * 3 + 60) + 'px'
						//_this.scrollViewHeight = (res.windowHeight - data.height) + 'px'
					}).exec();
				}
			})
			//this.getQrUrl()
		},
		onPullDownRefresh(){
			this.clearOrderList(["AllOrder", "untakeOrder", "complateOrder","cancelOrder"])
			this.getOrders(this.tagStatus)
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
				justify-content: baseline;
				box-sizing: border-box;
				padding: 8upx 0;
				position: relative;

				.search {
					font-size: 32upx;
					margin-right: 17upx;
					margin-left: 24upx;
					color: rgba(198, 198, 198, 1);
				}

				.close-v {

					height: 56upx;
					line-height: 60upx;
					position: absolute;
					right: 16upx;

					z-index: 8;

					image {
						width: 28upx;
						height: 28upx;
						display: inline-block;
					}
				}


			}
		}

		.height-occupy-32 {
			height: 32upx;
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

			.swiper-item {
				padding: 0 24upx 32upx 24upx;
				.no-order-tip{
					margin-top: 200upx ;
					font-size: 32upx;
					text-align: center;
					color: #999999;
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

			.qrcode-image {
				width: 271upx;
				height: 271upx;
				display: inline-block;
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
