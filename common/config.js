const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://gghd.gray.motivape.cn/api" // 开发环境 注册
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境
		
config.hostOrder  = process.env.NODE_ENV === 'development' 
	? 
		"http://www.lar54.com" // 开发环境 下单
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境		
export default config