const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://mall.gray.motivape.cn/api" // 开发环境
	: 
		'http://mall.motivape.cn/api'	// 生产环境
export default config