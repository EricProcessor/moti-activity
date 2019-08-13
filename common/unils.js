export function checkMobile(mobile) {
	let reg = /^1[3456789]\d{9}$/
	return reg.test(mobile)
}

export const appType = 7

export const saveType = 'poke'