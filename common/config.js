const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"" // 开发环境
	: 
		'https://mall.motivape.cn/api'	// 生产环境
export default config