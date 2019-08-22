import {
	aliWapPay,
	wxPay,
	queryPayStatus,
	wechatPay,
	getJsApiParam,
	authWechat
} from "./request.js"
import Vue from 'vue'
import md5 from "js-md5"
const PayObject = {

	AliPay: {

		async createOrder(returnUrl, orderNo, spuName) {

			let res = await aliWapPay(returnUrl, orderNo, spuName)
			console.log(res)
			if (res.code != 0) return uni.showToast({
				title: res.msg,
				icon: "none"
			})
			Vue.nextTick(() => {
				const div = document.createElement('div');
				div.innerHTML = res.result;
				document.body.appendChild(div);
				document.forms[0].submit();
			})

		},

	},
	Wechat: {

		isWxBrowser() {
			let ua = navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true
			} else {
				return false
			}
		},
		async h5Pay(orderNo, spuName) {
			
			let res = await wxPay(orderNo, spuName)
			
			if (res.code == 0) {
				uni.hideLoading()
				
				window.location.href = res.result // 跳转到微信支付页面
			}
		},
		JsPay() {
			const href = location.href.split('?')
			const url = href[0]
			location.replace(
				`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=homec`
			)
		},
		apiParams:{},
		onBridgeReady() {
			let apiParams = this.apiParams
			let signStr =
				`appId=${apiParams.appid}&nonceStr=${apiParams.nonce_str}&package=${apiParams.package}&signType=MD5&timeStamp=${apiParams.timeStamp}&key=58Lei2Yan95kE42jI17mo87TI5312640`
			let sign = md5(signStr).toUpperCase()
			let self = this
			if(!apiParams.appid){
				PayObject.missApiCallBack("miss apiParams appid: "+JSON.stringify(apiParams))
				console.log(typeof apiParams)
				console.log(JSON.stringify(apiParams))
			}
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
				"appId": apiParams.appid, //公众号名称，由商户传入     
				"timeStamp": apiParams.timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr": apiParams.nonce_str, //随机串     
				"package": apiParams.package,
				"signType": apiParams.signType, //微信签名方式：     
				//"paySign": apiParams.paySign ,//微信签名 
				"paySign": sign //微信签名 
			}, function(res) {
				uni.hideLoading()
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					PayObject.successCallBack()
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
					PayObject.cancelCallBack()
					console.log("pay --- cancel");
				} else {
					PayObject.failCallBack()
					console.log("fail --- cancel");
				}
			});
		},
		async onStart(code) {

			let authRes = await authWechat(code)

			if (authRes.code != 0) return uni.showToast({
				title: 'fail',
				icon: "none"
			})

			let queryPayParams = uni.getStorageSync("forQueryPayParams")
			uni.removeStorageSync("forQueryPayParams")
			const wxJsRes = await wechatPay(queryPayParams.orderNo, queryPayParams.spuName)
			console.log(wxJsRes)
			if (wxJsRes.code != 0) return uni.showToast({
				title: 'fail',
				icon: "none"
			})
			const apiParams = await getJsApiParam(wxJsRes.result)
			if (apiParams.code != 0) return uni.showToast({
				title: 'fail',
				icon: "none"
			})
			this.apiParams = apiParams.result
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
				}
			} else {
				console.log("apiParams:" + JSON.stringify(apiParams))
				console.log(typeof apiParams.result)
				this.onBridgeReady();
			}
		}
	},
	async queryPayStatus(orderNo, payType) {
		if (payType == 2 && PayObject.Wechat.isWxBrowser()) return;
		uni.showLoading({
			title:"支付中.."
		})
		let res = await queryPayStatus(orderNo, payType)
		uni.hideLoading()
		if (res.code == 0) {

			if (res.result.tradeStatus == 30) return this.successCallBack()
			if (res.result.tradeStatus == 20) return this.failCallBack()
			
		} else {

			this.systemCallBack()
		}


	},
	arrivedPay() {
		this.successCallBack()
	},
	successCallBack: null,
	failCallBack: null,
	cancelCallBack: null,
	systemCallBack: null,
	missApiCallBack:null

}
export default PayObject
