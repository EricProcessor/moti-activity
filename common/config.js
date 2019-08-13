const config = {}
let origin = location.origin
config.host = process.env.NODE_ENV === 'development' 
	? 
		"http://192.168.0.135:8085/api" // 开发环境 注册
	: 
		origin+'/api'	// 生产环境
		
config.hostOrder  = process.env.NODE_ENV === 'development' 
	? 
		"http://192.168.0.135:8085/api" // 开发环境 下单
	: 
		origin+'/api'	// 生产环境		
export default config
//"http://192.168.1.198:8085/api"  中转 
//http://test.motiactivity.motimall.cn/api 测试环境
//192.168.10.48:8096 北京本地服务注册
//192.168.10.48:9191 北京本地服务下单 
//http://motiactivity.motimall.cn/api 正式
//http://motimall.infor8.com/api