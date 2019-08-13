import HTTP from './HTTP.js'
import baseConfig from './config.js'

/*
	get请求
*/
export const get = async (api, data, header = {}, config = {}) => {
    const res = await HTTP.get(api, data, header, config)
    if (res.code === '0') {
        res.result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result
        return res
    } else {
        return res
    }
}



/*
	post请求
*/
export const post = async (api, data, header = {}, config = {}) => {
    const res = await HTTP.post(api, data, header, config)
    if (!res.result) res.result = []
    if (res.code === '0') {
        res.code = Number(res.code)
        try {
            res.result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result
            return res
        } catch (e) {
            return res
            //TODO handle the exception
        }
    } else {
        return res
    }
}

export const postForm = async (api, data, header = {}, config = {}) => {
    const res = await HTTP.postForm(api, data, header, config)
    console.log(`%c ${api}`, 'background-color:#0f0;', res)
    if (!res.result) res.result = []
    if (res.code === '0') {
        res.code = Number(res.code)
        try {
            res.result = typeof res.result === 'string' ? JSON.parse(res.result) : res.result
            return res
        } catch (e) {
            return res
            //TODO handle the exception
        }
    } else if (res.code === '3' && /未登录/.test(res.msg)) {
		// const url = location.href
  //       const isIndexGetCar = (/\/index\/index/.test(url) || !/pages/.test(url)) && /getCar/.test(api)
  //       if (!isIndexGetCar) {
		// 	uni.navigateTo({
		// 		url: '/pages/login/login'
		// 	})
  //       }
		return res
    } else {
		// uni.showToast({
		// 	title: `${res.msg}`,
		// 	icon: 'none'
		// })
        return res
    }
}
// 
// wxPay

export function aliWapPay(returnUrl, orderNo,spuName) {
	return postForm('/mall/h5/pay/al', {
		returnUrl,
		orderNo,
		spuName
	})
}

export function wxPay(orderNo,spuName ) {
	return postForm('/mall/h5/pay/wx', {
		orderNo,
		spuName
	})
}

// 查询支付接口
export function queryPayStatus(orderNo, paymentType) { // 参数：  订单编号		支付类型：1——阿里	2——微信
	if(paymentType == 1){
		return postForm('/mall/h5/pay/alPayStatus', {
			orderNo
		})
	}
	if(paymentType == 2){
		return postForm('/mall/h5/pay/wxPayStatus', {
			orderNo			
		})
	}
	
}


export const wechatPay = async (orderNo, spuName) => {
    return await postForm('/mall/h5/pay/wxJsPay', {
        orderNo,
        spuName
    })
}

// 获取支付参数
export const getJsApiParam = async (prepayId) => {
	return await postForm('/mall/h5/pay/getJsApiParam', {
		prepayId
	})
}
export const authWechat = async (code) => {
    return await postForm('/mall/h5/pay/confirmAuthorization', {
        code,
    })
}


