const config = {

}

const origin = location.origin

config.host = process.env.NODE_ENV === 'development' 	? `${origin}/api` : 	`${origin}/api`		// 生产环境/线上环境
		
//config.host = "https://pokegray.motivape.cn/api"

export default config