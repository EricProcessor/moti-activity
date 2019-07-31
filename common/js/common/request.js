import config from './config.js'
const token = uni.getStorageSync("token")

//封装request方法
async function request(params){
	return new Promise(function (resolve,reject){
		uni.showLoading({title: ''});
		uni.request({
			url: config.host + params.url,
			method: params.methods ? params.methods : 'get',
			header: {
				"content-type": params.contentType ? params.contentType : 'application/x-www-form-urlencoded',
				"token": '' + token,
			},
			data: params.data,
			success:function (data){
				uni.hideLoading();
				resolve(data)
			},
			fail: function (err){
				uni.hideLoading()
				reject(err)
			}
		})
	})
}


export default request
