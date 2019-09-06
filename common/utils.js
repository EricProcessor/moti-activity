import config from './config.js'

export function post(url, data, contentType) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: config.host + url,
			method: 'POST',
			header: {
				"content-type": contentType ? contentType : 'application/x-www-form-urlencoded'
			},
			data,
			success: function(data) {
				resolve(data)
			},
			fail: function(err) {
				// 回调失败时
				if (typeof reject == 'function') {
					reject(data);
				} else {
					console.log(data);
				}
			}
		})
	})
}

//下单新街口
export function newOrder(url, data, contentType) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: config.hostOrder + url,
			method: 'POST',
			header: {
				"content-type": contentType ? contentType : 'application/x-www-form-urlencoded'
			},
			data,
			success: function(data) {
				resolve(data)
			},
			fail: function(err) {
				// 回调失败时
				if (typeof reject == 'function') {
					reject(data);
				} else {
					console.log(data);
				}
			}
		})
	})
}
//send mobile message
export function sendMsg(orderNo, mobile) {
	return post("/activity1/ad/order/sendSms", {
		orderNo: orderNo,
		mobile: mobile
	})
}

export function checkMobile(mobile) {
	let reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}

//异或加密 "a".charCodeAt() ^ "*".charCodeAt() >>> 1
export function encryXOR(string) {
	let arr = string.split("")
	let newArr = []
	for (let key in arr) {
		newArr.push(String.fromCharCode(arr[key].charCodeAt() ^ "*".charCodeAt() >>> 1))
	}
	return newArr.join("")
}
