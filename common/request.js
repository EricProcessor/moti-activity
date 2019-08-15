import config from './config.js'

//封装request方法
export async function request(params){
	return new Promise(function (resolve,reject){
		uni.showLoading({title: ''});
		const {...rest} = params.data;
		uni.request({
			url: config.host + params.url,
			method: params.methods ? params.methods : 'get',
			header: {
				"content-type": params.contentType ? params.contentType : 'application/x-www-form-urlencoded'
			},
			data: rest,
			success:function (data){
				uni.hideLoading();
				resolve(data)
			},
			fail: function (err){
				uni.hideLoading();
				reject(err)
			}
		})
	})
}

//封装upload方法
export async function upload(params){
	return new Promise(function (resolve,reject){
		const { file, ...rest} = params.data;
		uni.showLoading({title: ''});
		uni.uploadFile({
			url: config.host + params.url,
			filePath: file,
			name: 'file',
            formData: rest,
			success:function (data){
				uni.hideLoading();
				resolve(data)
			},
			fail: function (err){
				uni.hideLoading();
				reject(err)
			}
		})
	})
}

// 暂时不用
// export function getAccessToken(appId, secret, code) { // 参数： appId， 公众号的 appsecret， 以及 code值
// 	// 请求链接：
// 	let getAccessTokenUrl =
// 		`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`
// 	return get(getAccessTokenUrl)
// }
//储存用户信息
export function addWechatUser(params) { 
	return request({
		url:'/activity/activity/wechat/addWechatUser',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//查询用户是否参与活动数据
export function queryHelpMasterByUserId(params) { 
	return request({
		url:'/activity/activity/wechat/queryHelpMasterByUserId',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//根据活动id，查询活动任务主表数据
export function queryTaskMasterByActiId(params) { 
	return request({
		url:'/activity/activity/wechat/queryTaskMasterByActiId',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//保存用户选择的活动类型
export function saveHelpMaster(params) { 
	return request({
		url:'/activity/activity/wechat/saveHelpMaster',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//根据活动id和openId查询助力数据
export function queryHelpSubByOpenId(params) { 
	return request({
		url:'/activity/activity/wechat/queryHelpSubByUserId',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		// data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//上传moti照片
export function uploadMoti(params) { 
	return upload({
		url:'/activity/activity/wechat/upload',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		// data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//提交moti照片
export function motiPicCommit(params) { 
	return request({
		url:'/activity/activity/wechat/motiPicCommit',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		// data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//发送下单验证码
export function dynamicCode(params) { 
	return request({
		url:'/activity/activity/buyer/dynamicCode',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//保存助力用户的数据
export function saveHelpSub(params) { 
	return request({
		url:'/activity/activity/wechat/saveHelpSub',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//兑换优惠码
export function queryUserCouponCode(params) { 
	return request({
		url:'/activity/activity/wechat/queryUserCouponCode',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//校验手机号和验证码
export function checkMobileAndCode(params) { 
	return request({
		url:'/activity/activity/wechat/checkMobileAndCode',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//校验手机号和验证码
export function queryHelpSubByUserId(params) { 
	return request({
		url:'/activity/activity/wechat/queryHelpSubByUserId',
		methods: 'post',//默认值---不需要则不要填写
		contentType: 'application/json', //默认值---不需要则不要填写
		data: params
	}).then(function (res){
		let data = res.data;
		data.result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
		return data
	})
}
//获取用户所有信息
export function getUserAllInfo(code){
	return request({
		url:`/open/pub/wechat/jsapi/userInfo?code=${code}`,
		methods:'get'
	}).then(function(res){
		let data = res.data;
		console.log("请求得到的数据"+ JSON.stringify(data) )
		return data
	})


}