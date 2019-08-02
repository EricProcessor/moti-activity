const config = {}
const host = window.location.host
let api = ""
switch (host) {
	case "testszhd.motivape.cn":
		api = "http://zuul.gray.motivape.cn/activity"
		break;
	case "szhdgray.motivape.cn":
		api = "http://hnhd.gray.motivape.cn/api"
		break
	case "szhdprod.motivape.cn":
		api = "http://hnhd.prod.motivape.cn/api"
		break
	case "szhd.motivape.cn":
		api = "//hnhd.prod.motivape.cn/activity"
		break
	default:
		// api = "//test.zuul.motivape.cn/activity"
		api = "//192.168.10.159:8197/activity"
		break
}
config.host = process.env.NODE_ENV === 'development' ? api : api // 生产环境/线上环境

export default config
//"//192.168.10.129:8197/activity"
//"http://bolg.test/api/activity"
