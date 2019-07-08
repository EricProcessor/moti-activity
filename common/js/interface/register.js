import request from '../common/request.js'
//注册相关接口
export function Login(params) {
	return request({
		url: '/activity/shop/login',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}
//获取登录验证码
export function loginVerify(params) {
	return request({
		url: '/activity/shop/send/login/dynamicCode',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}

//商家注册验证码
export function registVerify(params) {
	return request({
		url: '/activity/shop/shop/attRegist/dynamicCode',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}
//门店申请
export function shopApply(params) {
	return request({
		url: '/activity/shop/activity/regist',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}

// 订单列表
export function orders(params) {
	return request({
		url: '/hdOrder/shopOrders',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}
//门店列表
export function shops(params) {
	return request({
		url: '/activity/shop/operator/'+params.operatorId,
		methods: 'GET',
		contentType: 'application/json',
		data: {}
	}).then(res => res.data)
}

export function updateOrderStatus(params){
	return request({
		url: '/hdOrder/shop/oder/status',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then(res => res.data)
}
//获取门店商品信息
export function goodsInfo(params){
	return request({
		url:'/activity/shop/products',
		methods: 'GET',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}
//下单接口
export function downOrder(params){
	return request({
		url:'/activity/buyer/downOrder',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}
//买家验证码
export function buyDynamicCode(params){
	return request({
		url:'/activity/buyer/dynamicCode',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}

//获取门店地址
export function getAttDetail(params){
	return request({
		url:'/activity/shop/getAttDetailId',
		methods: 'GET',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}
//订单详情
export function orderDetail(params){ ///hdOrder/buyer/order
	return request({
		url:'/hdOrder/buyer/order',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}

//获取qrcode
export function qrcode(params){///activity/shop/attDetail
	return request({
		url:'/activity/shop/attDetail',
		methods: 'POST',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}
//用户信息
export function userInfo(params){
	return request({
		url:'/activity/buyer/attUser/msg',
		methods: 'GET',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}
//代理商
export function getAgent(params){
		return request({
		url:'/activity/shop/operators',
		methods: 'GET',
		contentType: 'application/json',
		data: params
	}).then( res => res.data)
}