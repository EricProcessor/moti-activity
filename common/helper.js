const useAgent = () => {
	let ua = navigator.userAgent
	 if (ua.match(/MicroMessenger/i) == "MicroMessenger") {
                return "wechat"
        }
		return ''
}

const DPR = () => {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}
export default {
	useAgent,
	DPR
}