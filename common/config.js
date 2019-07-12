const config = {}
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://gghd.gray.motivape.cn/api" // 开发环境 注册
	: 
		'http://zuul.prod.motivape.cn'	// 生产环境
		
config.hostOrder  = process.env.NODE_ENV === 'development' 
	? 
		"http://test.motiactivity.motimall.cn/api" // 开发环境 下单
	: 
		'//motiactivity.motimall.cn/api'	// 生产环境		
export default config