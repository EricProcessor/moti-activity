import baseConfig from './config.js'

function isEmptyObj(obj = {}) {
	for (let i in obj) {
		return false
	}
	return true
}

export default {
	get(api, data, header = {}, config = {}) {
		const url = `${baseConfig.host}${api}`
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				method: 'GET',
				data,
				header,
				...config,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
				
			})
		})
	},
	post(api, data, header = {}, config = {}) {
		const url = `${baseConfig.host}${api}`
		return new Promise((resolve, reject) => {
			uni.request({
				url,
				method: 'POST',
				data,
				header,
				...config,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
				
			})
		})
	},
	postJSON(api, data, header = {}, config = {}) {
		const url = `${baseConfig.host}${api}`
		return new Promise((resolve, reject) => {
			if (isEmptyObj(header)) {
				header = {
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
			uni.request({
				url,
				method: 'POST',
				data,
				header,
				...config,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
				
			})
		})
	},
	postForm(api, data, header = {}, config = {}) {
		const url = `${baseConfig.host}${api}`
		return new Promise((resolve, reject) => {
			if (isEmptyObj(header)) {
				header = {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			uni.request({
				url,
				method: 'POST',
				data,
				header,
				...config,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
				
			})
		})
	},
	async upload(api, data, header = {}, config = {}) {
		const url = `${baseConfig.host}${url}`
		return new Promise((resolve, reject) => {
			if (isEmptyObj(header)) {
				header = {
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
			const url = api[0] === '/' ? `${baseHost.host}/api${api}` : `${baseHost.host}/api/${api}`
			uni.uploadFile({
			  url: url,
			  header: header,
			  formData: data,
			  ...config,
			  success(res) {
				  resolve(res.data)
			  },
			  fail(err) {
				  reject(err)
			  }
			})
		})
	  },
}