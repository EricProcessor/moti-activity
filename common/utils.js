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
export function checkMobile(mobile) {
	let reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}