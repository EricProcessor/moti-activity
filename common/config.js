const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"" // 开发环境
	: 
		'http://mall.api.motivape.cn'	// 生产环境
export default config