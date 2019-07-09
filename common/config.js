const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://test.zuul.motivape.cn" // 开发环境
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境
export default config