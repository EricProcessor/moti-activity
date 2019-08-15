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
export function getToken(code) {
	get('https://api.weixin.qq.com/sns/oauth2/access_token?','f2db2177474c44575f6522932db0a1f3',code)
}
export function getAccessToken(appId, secret, code) { // 参数： appId， 公众号的 appsecret， 以及 code值
	// 请求链接：
	let getAccessTokenUrl =
		`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`
	return get(getAccessTokenUrl)
}
