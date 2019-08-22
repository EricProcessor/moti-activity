import {
	post
} from "./utils.js"
import md5 from "md5"

export default {
	orderPay:{},
	callBack:null,
	failBack:null,
	cancelBack:null,
	apiParams:{},
	async wxJsPay(code) {
		let res = await post("/activity1/pay/confirmAuthorization", {
			code: code
		})
		console.log("-", res)
		if (res.data.code !== "0") return
		let orderInfo = uni.getStorageSync("orderInfo")
		let preRes = await post("/activity1/pay/wxJsPay", {
			orderNo: orderInfo.orderNo,
			spuName: orderInfo.spuName,
			ip: orderInfo.ip
		})
		console.log("--", preRes)
		let jsParams = await post("/activity1/pay/getJsApiParam", {
			prepayId: preRes.data.result
		})
		console.log("---", jsParams)
		if (jsParams.data.code !== "0") return
		console.log(jsParams.data.result)
		return JSON.parse(jsParams.data.result)
		console.log("openid", jsParams)
	},
	onBridgeReady() {
		let apiParams = this.apiParams
		let signStr =
			`appId=${apiParams.appid}&nonceStr=${apiParams.nonce_str}&package=${apiParams.package}&signType=MD5&timeStamp=${apiParams.timeStamp}&key=58Lei2Yan95kE42jI17mo87TI5312640`
		let sign = md5(signStr).toUpperCase()
		let self = this
		WeixinJSBridge.invoke('getBrandWCPayRequest', {
			"appId": apiParams.appid, //公众号名称，由商户传入     
			"timeStamp": apiParams.timeStamp, //时间戳，自1970年以来的秒数     
			"nonceStr": apiParams.nonce_str, //随机串     
			"package": apiParams.package,
			"signType": apiParams.signType, //微信签名方式：     
			//"paySign": apiParams.paySign ,//微信签名 
			"paySign": sign //微信签名 
		}, function(res) {
			if (res.err_msg == "get_brand_wcpay_request:ok") {
				self.callBack()
				
				// 使用以上方式判断前端返回,微信团队郑重提示：
				//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
			} else if(res.err_msg == "get_brand_wcpay_request:cancel"){
				self.cancelBack()
			}
			else {
				self.failBack()
			}
		});
	},

	async onLoad(code) {
		
		let apiParams = await this.wxJsPay(code)
		if(!apiParams) {
			uni.showModal({
				title:"缺少code值"
			})
			this.failBack()
			return ;
		}
		this.apiParams = apiParams
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
			}
		} else {
			this.onBridgeReady();
		}
		
	}
}
