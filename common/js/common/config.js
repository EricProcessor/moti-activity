const config = {}
const host = window.location.host
let api = ""
switch (host) {
	case "test.hnhd.motivape.cn":
		api = "http://test.zuul.motivape.cn/activity"
		break;
	case "hnhd.gray.motivape.cn":
		api = "http://zuul.gray.motivape.cn/activity"
		break
	case "hnhd.prod.motivape.cn":
		api = "http://zuul.prod.motivape.cn/activity"
		break
	case "hnhd.motivape.cn":
		api = "//zuul.prod.motivape.cn/activity"
		break
	default:
		api = "//test.zuul.motivape.cn/activity"
		break
}
config.host = process.env.NODE_ENV === 'development' ? api : api         // 生产环境/线上环境

export default config
//"//192.168.10.129:8197/activity"
//"http://bolg.test/api/activity"
