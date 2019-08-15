import config from './config.js'

async function post(url, data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			method: 'POST',
			data: data,
			success: function(data) {
				resolve(data)
			},
			fail: function(err) {
				console.log(err)
			}
		})

	})
}

async function get(url, data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			method: 'GET',
			data,
			success: function(data) {
				resolve(data)
			},
			fail: function(err) {
				// 回调失败时
				console.log(err)
				if (typeof reject == 'function') {
					reject(data);
				} else {
					console.log(data);
				}
			}
		})
	})
}
