<template>
	<view class="page-wrapper">
		<!-- style="height: cacl(100% - 120upx)" -->
		<view class="introduction-wrapper">
			<!-- 上半部图片 -->
			<view class="introductions">
				<view class="swiper_wrapper" v-if="imgs.swipers.length > 0">
					<swiper :class="{height750:isSwiper750,height980:!isSwiper750}" :indicator-dots="false" indicator-active-color="#fff" :autoplay="true" :interval="3000" @change="swiperChange">
						<swiper-item class="swiper-item" v-for="(item, index) in imgs.swipers" :key="index">
							<image :src="item" mode="widthFix"></image>
						</swiper-item>
					</swiper>
					<view class="dynamic_wrapper" :class="{fixed: isFixed}">
						<dynamic v-if="isShowDynamic"></dynamic>
					</view>
					<!-- <img> -->
					<view class="custom_dots">
						<view class="dot_wrapper" v-for="(dot, indexDot) in imgs.swipers" :key="indexDot">
							<view class="dot" :class="{active: currentSwiperIndex === indexDot}"></view>
						</view>
					</view>
				</view>
				<SpuDesc v-if="pageConfigure.isSpuDesc"  :paramType="paramType"></SpuDesc>
				<block v-if="paramType != 15">
					<view :key="index" class="img_wrapper" v-for="(item, index) in imgs.imgs" :style="{width: item.width + 'upx', height: item.height + 'upx'}">
						<img class="img" :src="item.url"></img>
					</view>
				</block>
				<!-- <img v-for="(item, index) in imgs" :key="index" :src="'../../activity/static/images/package/' + item"> -->
				<!--  -->
			</view>

			<!-- 商品信息 -->
			<view id="anchor" v-if="isPageReady"></view>

			<view v-if="isAB">

				<EditOrderForm ref="EditOrderForm" :orderScrollTop="scrollTop" :initData="pageState.editOrderForm" :isClear="isClearForm"
				 :paramType="paramType" ></EditOrderForm>

				<PayMethod @choicePay="choosePayWay" :ispolling="ispolling" :paramType="paramType" :payType="payType" @payCallBack="payCallBackFunc"
				 :urlParams="urlParams" :orderInfo="orderResult" :isOrderSuccess="isOrderSuccess"></PayMethod>
				<!-- 提交信息后弹出卡片 -->
				<view class="mask-card" v-if="isShowPopupCard">
					<view class="card-content">
						<image class="close-icon" @tap="closePopup" src="../../static/images/icons/close.png"></image>
						<view class="content">
							<view class="title">
								<image :src="submitState > 0 ? '../../static/images/icons/success_2.png' : '../../static/images/icons/failed.png'"></image>
								<text :class="{'red-text': submitState > 0}">{{popUpCardMsg}}</text>
							</view>
							<text class="text">{{popupCardText}}</text>
							<view class="btn" @click="closePopup">确定</view>
						</view>
					</view>
				</view>

			</view>

			<view v-if="isC">
				<view v-if="!isShowOrderDetail">
					<EditOrderFormC ref="EditOrderForm" :orderScrollTop="scrollTop" :paramType="paramType" :initData="pageState.editOrderForm"
					 :isClear="isClearForm" ></EditOrderFormC>
					<PayMethodC @choicePay="choosePayWay" :ispolling="ispolling" :paramType="paramType" :payType="payType"
					 @payCallBack="payCallBackFunc" :urlParams="urlParams" :orderInfo="orderResult" :isOrderSuccess="isOrderSuccess"></PayMethodC>
				</view>
				<OrderDetail @againBuy="buyAgain" v-if="isShowOrderDetail" :paramType="paramType" :initData="propsOrderDetail"></OrderDetail>
				<!-- 提交信息后弹出卡片 -->
				<popCard v-if="isShowPopupCard" @emitClose="closePopup" :submitState="submitState" :payType="payType"></popCard>
			</view>

			<view v-if="isMojo">
				<view v-if="!isShowOrderDetail">
					<EditOrderFormMojo ref="EditOrderForm" :orderScrollTop="scrollTop" :paramType="paramType" :initData="pageState.editOrderForm"
					 :isClear="isClearForm"></EditOrderFormMojo>
					<PayMethodC v-show="isShowPayMethod" @choicePay="choosePayWay" :ispolling="ispolling" :paramType="paramType"
					 :payType="payType" @payCallBack="payCallBackFunc" :urlParams="urlParams" :orderInfo="orderResult" :isOrderSuccess="isOrderSuccess"></PayMethodC>
				</view>
				<OrderDetail @againBuy="buyAgain" v-if="isShowOrderDetail" :paramType="paramType" :initData="propsOrderDetail"></OrderDetail>
				<!-- 提交信息后弹出卡片 -->
				<popCard v-if="isShowPopupCard" @emitClose="closePopup" :submitState="submitState" :payType="payType"></popCard>
			</view>

			<view v-if="paramType == 15" class="introductions">
				<block>
					<view :key="index" class="img_wrapper" v-for="(item, index) in imgs.imgs" :style="{width: item.width + 'upx', height: item.height + 'upx'}">
						<img class="img" :src="item.url"></img>
					</view>
				</block>
			</view>
			<!-- 最后一张图片 -->

			<!-- <img class="comments" :src="'../../activity/static/images/package/' + lastImg"> -->
			<img class="comments" :src="lastImg" v-show="!isShowOrderDetail">
		</view>
		<view class="submit-btn" @tap="submit" v-show="!isShowOrderDetail">
			<image v-if="isShowBuyNow && isAB" src="../../static/images/icons/buy.jpg"></image>
			<!-- <image v-if="isShowBuyNow && (isC || isMojo)" src="../../static/images/icons/red-buy.png"></image> -->
			<view v-if="isShowBuyNow && (isC || isMojo)" class="sub_order big active">{{buttonMsg}}</view>
			<view v-if="!isShowBuyNow" class="sub_order" :class="{active:(isC || isMojo)}">提交订单</view>
		</view>


	</view>

</template>

<script>
	import {
		post,
		checkMobile,
		newOrder,
		encryXOR
	} from "@/common/utils.js";
	import typeConfig from "../../common/typeConfig.js"

	import dynamic from "./dynamic.vue";
	import imgsData from "./imgs.js";
	import PayMethod from "./PayMethod.vue"
	import PayMethodC from "./PayMethodC.vue"
	import EditOrderForm from "./EditOrderForm.vue"
	import EditOrderFormC from "./EditOrderFormC.vue"
	import EditOrderFormMojo from "./EditOrderFormMojo.vue"
	import SpuDesc from "./SpuDesc.vue"
	import OrderDetail from "./OrderDetail.vue"
	import popCard from "./popCard.vue"
	/* import Goods from "./goods.js"
	import Goods99 from "./goods99.js"
	import Goods14 from "./goods14.js"
	import GoodsMojo from "./goodsMojo.js"
	import GoodsMojoTwo from "./goodsMojo2.js"
	import GoodsMojoFree from "./goodsMojoFree.js" */

	export default {
		config: {
			disableScroll: true
		},
		components: {
			dynamic,
			PayMethod,
			EditOrderForm,
			EditOrderFormC,
			PayMethodC,
			OrderDetail,
			popCard,
			EditOrderFormMojo,
			SpuDesc
		},
		computed: {

			isShowBuyNow() {
				if (this.paramType !== 15) return !this.scrollTop || (this.currentScrollY < (this.scrollTop))
				return !this.scrollTop || (this.currentScrollY < (this.scrollTop)) || (this.currentScrollY >= uni.upx2px(2480))
			},
			isC() {
				return this.pageConfigure.module ===  "EditOrderFormC"
				/* if (this.paramType === 16 || this.paramType === 17 || this.paramType === 28 || this.paramType === 31) return true;
				return false */
			},
			isAB() {
				return this.pageConfigure.module ===  "EditOrderForm"
				/* if (this.paramType <= 15 || (this.paramType >= 18 && this.paramType <= 22) || this.paramType === 32) return true;
				return false */
			},
			isMojo() {
				return this.pageConfigure.module ===  "EditOrderFormMojo"
				/* if (this.paramType === 23 || this.paramType === 24 || this.paramType === 25 || this.paramType === 26 || this.paramType ===
					27 || this.paramType === 29 || this.paramType === 30) return true
				return false */
			},
			isOnShowOrderDetail() {
				return this.isC || this.isMojo
			},
			isShowDynamic() {
				if (this.isC) return false
				return true
			},
			isShowPayMethod() {
				return this.pageConfigure.isShowPayMethod 
				/* if (this.paramType === 27 || this.paramType === 30) return false;
				return true */
			},
			pageUniqueID() {

				return this.urlParams.type + "-" + this.urlParams.orderSource + "-" + this.urlParams.channel + "-" + this.urlParams
					.material
			},
			goodsInfo() {
				return this.$refs.EditOrderForm.goodsInfo;
				/* if(this.paramType == 32) return Goods14
				if (this.paramType == 23 || this.paramType == 24 || this.paramType == 29) return GoodsMojo
				if (this.paramType == 25 || this.paramType == 26) return GoodsMojoTwo
				if (this.paramType == 27 || this.paramType == 30) return GoodsMojoFree
				if (this.paramType == 28) return Goods99
				return Goods */
			},
			buttonMsg() {
				return this.pageConfigure.buttonMsg
				/* if (this.paramType === 27) return "0元抢购"
				return "立即抢购" */
			}
		},
		data() {
			return {
				pageConfigure:{},
				isSwiper750:false,
				propsOrderDetail: {},
				isShowOrderDetail: false,
				pageState: {},
				urlParams: {},
				orderResult: {},
				isOrderSuccess: 0,
				ispolling: 0,
				payType: 0,
				currentScrollY: 0,
				isPageReady: false,
				isFixed: false,
				isGetAnchor: false,
				paramType: 0,
				currentSwiperIndex: 0,

				scrollTop: 0,

				deleBack: [

					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/1.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/2.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/3.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/4.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/5.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/6.jpg",
					"https://moti-dev.oss-cn-beijing.aliyuncs.com/moti-activity/goods_imgs/7.jpg"

				],
				imgLoadedNum: 0,


				imgs: [],
				lastImg: "",

				// 				typeAndNums: [{
				// 						radioText: '星辰银',
				// 						checked: true,
				//
				// 						number: 1,
				// 						skuId: 112492577675
				// 					},
				// 					{
				// 						radioText: '燕尾黑',
				// 						checked: false,
				//
				// 						number: 1,
				// 						skuId: 112492575139
				// 					}
				// 				],
				isShowPopupCard: false,
				popUpCardMsg: "订单提交成功",
				submitState: -1, // -1不显示, 0提交失败, 1货到付款提交成功, 2在线支付提交成功
				popupCardText: "网络暂时离线, 请重新提交~~",
				intoViewid: "",

				payWay: "offline",
				isClearForm: false

			};
		},
		onLoad(options) {

			let bool = this.nextLocation(options)
			/* if (options.type == 14 || (options.type >= 18 && options.type <= 22)) this.payType = 3
			else this.payType = 6 */
			this.restoreScene()
			const params = options;
			let index = params.type ? Number(params.type) : 7;


			this.paramType = index;
			this.pageConfigure = typeConfig[this.paramType]
			
			this.bianXianMao()
			this.setIsSwiper750()
			this.imgs = imgsData[this.pageConfigure.imgs];
			this.lastImg = imgsData.lastImgs[this.pageConfigure.lastImg];
			this.imgsNum = this.imgs.imgs.length
			this.urlParams = {
				orderSource: options.orderSource,
				material: options.material,
				channel: options.channel,
				type: this.paramType,
			}

			this.$nextTick(() => {
				this.isPageReady = true
				this.setIspolling()

			})

			let i = 0;
			let timer = setInterval(() => {
				i += 1
				const anchor = document.getElementById('anchor')
				if (anchor || i === 30) {
					this.imgs.imgs.forEach((cur) => {
						cur.isLoaded = true
					})
					this.isGetAnchor = true
					clearInterval(timer)
					timer = null
					this.scrollTop = anchor.offsetTop
				}
			}, 100)

		},
		onPageScroll(e) {
			this.isFixed = e.scrollTop > 400
			this.currentScrollY = e.scrollTop
		},

		methods: {
			setIsSwiper750(){
				this.isSwiper750 = this.pageConfigure.swiper750
				//if (this.paramType === 31) this.isSwiper750 = true
			},
			bianXianMao() {
				if(!this.pageConfigure.bianXianMao) return 
				
				const script_bxm = document.createElement("script");
				script_bxm.src =
					"https://m.fawulu.com/dist/welfareAT02/private/E/js/effectListen_fawulu.js";
				script_bxm.language = "JavaScript";
				document.body.appendChild(script_bxm);
				//if (this.paramType === 24 || this.paramType === 30 || this.paramType === 32 || this.paramType === 31) {}
			},
			buyAgain() {
				let userInfo = this.pageState.editOrderForm.userInfo
				if (userInfo[4]) userInfo[4].value = ""
				this.pageState.editOrderForm = {
					isShowTastes: false,
					buyNumbersColor: 1,
					buyNumbersTaste: 0,
					currentSpecIndex: 0,
					currentTasteIndex: "",
					userInfo: userInfo,
					areaObj: this.pageState.editOrderForm.areaObj
				}
				this.isShowOrderDetail = false
				this.pageSrollTo()

			},
			setIspolling() { //触发查询支付结果
				let orderPay = uni.getStorageSync("orderPay")
				if (!orderPay) return;
				if (orderPay.pageUniqueID !== this.pageUniqueID) {
					uni.clearStorageSync()
					return;
				}
				this.ispolling = 1;

			},
			payCallBackFunc(data) { //支付回调
				if (typeof data.submitState !== "undefined") {
					this.submitState = data.submitState;
					if (this.submitState === 1) {
						if (this.payType === 6) this.popUpCardMsg = "订单提交成功"
						else this.popUpCardMsg = "订单支付成功"
						this.popupCardText = ""
						this.$nextTick(() => {
							this._bxmPlatformFn()
						})
					} else if (this.submitState === -2) {
						this.popUpCardMsg = "订单取消支付"
						this.popupCardText = "您已手动取消订单，请重新提交支付"
					} else if (this.submitState === -3) {

					} else {
						if (this.payType === 6) this.popUpCardMsg = "订单提交失败"
						else this.popUpCardMsg = "订单支付失败"
						this.popupCardText = "网络暂时离线, 请重新提交~~"
					}

					this.isOrderSuccess = 0

					this.pageState = (!this.pageState || JSON.stringify(this.pageState) == "{}") ? uni.getStorageSync("pageState") :
						this.pageState;

					this.ispolling = 0;
					uni.hideLoading();
					if (this.submitState != -3) { //重新支付
						this.isShowPopupCard = true
						uni.removeStorageSync("pageState")
						uni.removeStorageSync("orderPay")
						uni.removeStorageSync("payOrderParam")
					}

					this.pageSrollTo()
				}
				if (typeof data.ispolling !== "undefined") {
					this.ispolling = 1
				}

			},
			nextLocation(options) {
				let pageParams = uni.getStorageSync("pageParams")
				//console.log(pageParams)
				if (!pageParams) return false
				uni.removeStorageSync("pageParams")
				if (options.code) uni.setStorageSync("wxcode", options.code)
				if (options.out_trade_no) uni.setStorageSync("alOptions", options)
				options = Object.assign(options, pageParams)

				return true
			},
			imgLoad(e) {
				this.imgs.imgs[e].isLoaded = true
			},
			keyborderConfim() {
				this.intoViewid = 'anchor'
			},
			swiperChange(e) {
				this.currentSwiperIndex = e.detail.current;
			},
			jamp() {
				this.intoViewid = "anchor";
			},
			async submit() {

				if (!this.isGetAnchor) return
				if (this.isShowBuyNow) this.pageSrollTo()
				if (this.ispolling === 1) {
					this.ispolling = 0
					return
				}
				if (this.isShowBuyNow) return;

				let vadation = this.$refs.EditOrderForm.checkSubmit()
				if (vadation.code === 1) {
					return uni.showToast({
						title: vadation.message,
						icon: "none"
					})
				}
				// this.intoViewid = "anchor";
				if (!this.payType) {
					return uni.showToast({
						title: "请选择支付方式",
						icon: "none"
					});
				}
				// let checkRegRes = await post('/user/user/checkUserMobile', {
				// 	mobile: this.userInfo[1].value
				// })

				let userInfo = this.$refs.EditOrderForm.getRegisterParams()
				// 未注册
				//getRegisterParams
				uni.showLoading({
					title: "加载中"
				});
				let regRes = await post("/activity1/user/activityH5Regist", userInfo);

				if (regRes.data.code == 0) {
					// 注册登录成功
					// let status = this.submitOrder();
					let orderInfo = this.$refs.EditOrderForm.getOrderParams()
					const data = {
						pageOrder: {

						}
					};

					if (this.orderSource === "qutoutiao") {
						data.pageOrder.orderSource = 40;
					} else if (this.orderSource === "jinritoutiao") {
						data.pageOrder.orderSource = 41;
					} else {
						data.pageOrder.orderSource = 43;
					}
					data.pageOrder = Object.assign(data.pageOrder, orderInfo)
					data.pageOrder.paymentType = this.payType // 3支付宝  6其他

					data.pageOrder.source = this.urlParams.orderSource
					data.pageOrder.type = this.urlParams.type
					data.pageOrder.material = this.urlParams.material
					data.pageOrder.channel = this.urlParams.channel


					this.orderResult.ip = regRes.data.result
					const orderRes = await this.submitOrder(data);
				} else {
					uni.showToast({
						title: "身份信息提交失败",
						icon: "none"
					});
				}
				uni.hideLoading();
				// const checkRegRes = await this.checkIsReg(this.userInfo[1].value)
				// console.log(checkRegRes)
				// if (checkRegRes === 0) {
				// 	console.log(2)
				// 	// 未注册
				// 	const regRes = await this.regUser()
				// 	console.log(regRes)
				// 	if (regRes === 0) {
				// 		// 注册失败
				// 		this.submitState = 0
				// 		return
				// 	}
				// }
			},
			chooseType(e) {
				const index = Number(e.currentTarget.dataset.index);
				this.typeAndNums[0].checked ?
					(this.typeAndNums[0].checked = false) :
					(this.typeAndNums[0].checked = true);
				this.typeAndNums[1].checked ?
					(this.typeAndNums[1].checked = false) :
					(this.typeAndNums[1].checked = true);
			},

			closePopup(data) {

				if (this.submitState === 1) {

					(this.isShowPopupCard = false),
					(this.submitState = -1);
					if (this.isOnShowOrderDetail && data && data.showDetail) return this.getOrderDetail();
					(this.isClearForm = !this.isClearForm);

				} else {
					(this.isShowPopupCard = false), (this.submitState = -1);
				}
			},
			async getOrderDetail() {
				let orderInfo = uni.getStorageSync("OrderDetail")
				this.propsOrderDetail = orderInfo
				this.isShowOrderDetail = true
			},
			// async checkIsReg(phone) {
			// 	// 检查是否注册
			// 	const res = await post('/user/user/checkUserMobile', {
			// 		mobile: phone
			// 	})
			// 	return res.code
			// },
			// async regUser() {
			// 	// 注册
			// 	const res = await post('/user/user/registName', {
			// 		userName: this.userInfo[0].value,
			// 		mobile: this.userInfo[1].value,
			// 		userAddress: this.userInfo[2].value,
			// 		quickType: 4 // 活动页注册来源
			// 	})
			// 	return res.code
			// },
			storeOrderDetail(data, result) {
				let cartridgesSkuName = ""
				let tobaccoSkuName = ""
				let tobaccoSkuSrc = ""
				let totalPrice = 0
				let cartridgesSkuSrc = ""
				let curGoods = this.goodsInfo

				for (let item of curGoods.goods.taste) {

					if (item.sku == data.pageOrder.cartridgesSku) {
						cartridgesSkuName = item.text
						totalPrice += data.pageOrder.cartridgesSkuNum * curGoods.goods.tastePrice
						cartridgesSkuSrc = item.src
						break;
					}
				}

				for (let key in curGoods.spec) {

					if (curGoods.spec[key].sku === data.pageOrder.tobaccoSku) {
						tobaccoSkuSrc = curGoods.backgrounds[key]
						totalPrice += data.pageOrder.tobaccoSkuNum * curGoods.goods.price
						tobaccoSkuName = curGoods.spec[key].text
						break;
					}
				}

				let OrderDetail = {
					receiveAddress: data.pageOrder.provinceName + data.pageOrder.cityName + data.pageOrder.districtName + data.pageOrder
						.address,
					userName: data.pageOrder.userName,
					mobile: data.pageOrder.mobile,
					id: this.orderResult.id,
					result: result,
					totalPrice: totalPrice,
					list: [{
						src: tobaccoSkuSrc,
						title: curGoods.goods.title,
						desc: curGoods.goods.desc + ":" + tobaccoSkuName,
						price: curGoods.goods.price,
						qty: data.pageOrder.tobaccoSkuNum,
						id: data.pageOrder.tobaccoSku
					}, ],
				}

				if (data.pageOrder.cartridgesSku) {
					OrderDetail.list.push({
						src: cartridgesSkuSrc,
						title: "电子烟雾化烟弹 ",
						desc: "口味:" + cartridgesSkuName,
						price: curGoods.goods.tastePrice + ".00",
						qty: data.pageOrder.cartridgesSkuNum,
						id: data.pageOrder.cartridgesSku
					})
				}
				uni.setStorageSync("OrderDetail", OrderDetail)
			},
			async submitOrder(data) {
				// 提交订单
				let apiUrl = this.pageConfigure.submitApi;
				let params = data
				if(this.pageConfigure.isEncrypted){
					params = {
						pageOrder: encryXOR(JSON.stringify(data.pageOrder))
					}
				}
				/* if (this.isC) {
					apiUrl = "/activity1/ad/order/bookingGghdOrder2c";
				}
				if (this.isMojo || this.paramType === 28  || this.paramType === 32 || this.paramType === 31) {
					apiUrl = "/activity1/ad/order/bookingGghdOrderLittleSmoke"
					params = {
						pageOrder: encryXOR(JSON.stringify(data.pageOrder))
					}
				} */
			
				const res = await newOrder(
					apiUrl,
					params,
					"application/json;charset=utf-8"
				);
				if (res.data.code == 0) {
					console.log(res.data)
					if (res.data.result.indexOf("已购买") > -1) return uni.showModal({
						content: "您已经参与过一次活动了!",

					})
					this.preserveScene()
					this.orderResult = Object.assign(this.orderResult, JSON.parse(res.data.result))
					uni.setStorageSync("payOrderParam", this.orderResult)
					this.storeOrderDetail(data, this.orderResult)
					this.isOrderSuccess = 1
					//this.popupCardText = "24小时内人工客服会与您联络请保持手机通畅";
					this.popupCardText = "";

				} else {
					this.submitState = 0;
					this.isShowPopupCard = true;
				}

				//this.totalPrice = 0
			},
			preserveScene() {
				let pageState = {
					editOrderForm: {
						isShowTastes: this.$refs.EditOrderForm.isShowTastes,
						userInfo: this.$refs.EditOrderForm.userInfo,
						buyNumbersColor: this.$refs.EditOrderForm.buyNumbersColor,
						buyNumbersTaste: this.$refs.EditOrderForm.buyNumbersTaste,
						currentSpecIndex: this.$refs.EditOrderForm.currentSpecIndex,
						currentTasteIndex: this.$refs.EditOrderForm.currentTasteIndex,
						areaObj: this.$refs.EditOrderForm.areaObj
					},
					payType: this.payType,
					currentScrollY: this.currentScrollY,
					isInitIndex: true,
					isInitForm: true,
				}
				//console.log(pageState, "------------------------")
				uni.setStorageSync("pageState", pageState)
			},
			restoreScene() {
				let pageState = uni.getStorageSync("pageState")
				if (!pageState) return
				if (pageState.isInitIndex) {
					this.payType = pageState.payType
					//this.currentScrollY = pageState.currentScrollY
				}
				this.pageState = pageState
				//uni.removeStorageSync("pageState")

			},
			reload() {
				// uni.navigateTo({
				// 	url: 'http://mall.motivape.cn'
				// })
				uni.reload();
				// location.href = 'http://mall.motivape.cn'
			},

			provinceChnage(e) {
				this.provinceIndex = e.detail.value;
				this.provinceName = this.provinceData[this.provinceIndex].label;
			},
			cityChange(e) {
				console.log(e);
				console.log(this.provinceIndex);
				console.log(this.cityData[this.cityIndex]);
				this.cityIndex = e.detail.value;
				this.cityName = this.cityData[this.provinceIndex][this.cityIndex].label;
			},
			areaChange(e) {
				console.log(e);
				this.areaIndex = e.detail.value;
				this.areaName = this.areaData[this.provinceIndex][this.cityIndex][
					this.areaIndex
				].label;
			},
			choosePayWay(payType) {
				//this.payWay = e;
				this.payType = payType

			},


			pageSrollTo() {
				uni.pageScrollTo({
					scrollTop: this.scrollTop,
					duration: 200
				})
			}
		}
	};
</script>

<style lang="scss">
	.introduction-wrapper {

		.introductions {
			position: relative;

			.swiper_wrapper {
				position: relative;

				.custom_dots {
					position: absolute;
					right: 28upx;
					bottom: 16upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.dot_wrapper {
						flex-shrink: 0;
						width: 40upx;
						height: 20upx;
						display: flex;
						justify-content: center;
						align-items: center;

						.dot {
							flex-shrink: 0;
							width: 20upx;
							height: 20upx;
							border-radius: 50%;
							background-color: rgba(0, 0, 0, 0.5);

							&.active {
								width: 35upx;
								height: 20upx;
								border-radius: 20upx;
								width: 40upx;
								background-color: #fff;
							}
						}
					}
				}

				.dynamic_wrapper {
					position: absolute;
					left: 20upx;
					right: 0;
					bottom: 40upx;
					height: 50upx;
					z-index: 1000;

					&.fixed {
						position: fixed;
						top: 20upx;
					}
				}
			}

			swiper {
				position: relative;
				width: 100%;
				
				
				.swiper-item {
					width: 100%;
					height: 100%;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			.height750{
				height: 750upx;
			}
			.height980{
				height: 980upx;
			}
			.img_wrapper {
				box-sizing: border-box;

				.img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}

		.comments {
			width: 100%;
			margin-bottom: 90upx;
		}

		.mask-card {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			// background-color: rgba(0, 0, 0, 0.5);
			z-index: 100;

			.card-content {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				width: 523.61upx;
				height: 455upx;
				border-radius: 3upx;
				background: #fff;
				box-shadow: 5upx 10upx 26upx 0 rgba(0, 0, 0, 0.15);

				.content {
					height: 271upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.title {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #333333;
						font-size: 33upx;

						image {
							margin-right: 10upx;
							width: 40upx;
							height: 40upx;
						}

						.red-text {
							color: #fb8c00;
						}
					}

					.text {
						font-size: 26upx;
						color: #999;
						width: 370upx;
						text-align: center;
					}

					.btn {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 346upx;
						height: 68upx;
						border: 1upx solid #040000;
						border-radius: 10upx;
						font-size: 25upx;
						background: rgba(250, 70, 80, 0.05);
					}
				}

				.close-icon {
					position: absolute;
					top: 20upx;
					right: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}
		}
	}

	.submit-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 105upx;
		background-color: #ff4d3d;
		font-size: 33upx;
		color: #ffffff;

		image {
			width: 100%;
			height: 100%;
		}

		.sub_order {
			width: 100%;
			height: 100%;
			background-color: #fb8c00;
			color: #fff;
			font-size: 36upx;
			display: flex;
			justify-content: center;
			align-items: center;

			&.big {
				font-weight: bold;
				letter-spacing: 4upx;
			}

			&.active {
				background-color: #ff4d3d;
			}
		}
	}
</style>
