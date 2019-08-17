const config = {
	preventRepeatLocation: true // 预防一个页面，并发多个请求，多次跳往登录页。记录状态用
}

const origin = location.origin

config.host = process.env.NODE_ENV === 'development' ?
	'https://hnhd.motivape.cn/api':
	// '':

	`${origin}/api` // 生产环境/线上环境
	//'http://192.168.10.96:8197'

export default config
