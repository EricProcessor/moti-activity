export function checkMobile(mobile) {
	let reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}

export const appType = 7

export const saveType = 'poke'

export const orderSource = "1000000" //我的订单列表