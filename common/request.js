export function post(url, data) {
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
