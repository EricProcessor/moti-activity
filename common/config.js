const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://192.168.10.41:8096" // 开发环境 注册
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境
		
config.hostOrder  = process.env.NODE_ENV === 'development' 
	? 
		"http://192.168.10.41:9191" // 开发环境 下单
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境		
export default config