<script>
	import {checkMobile} from "common/unils.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {

			const script = document.createElement("script");
			script.src =
				"http://mdemo.leiyankeji.com/moduleJs/wcore.js";
			script.language = "JavaScript";
			script.onload = () => {
				(function() {
					var _core = new WCore();
					var _user = new WCore.inputs.User();
					let mobile = uni.getStorageSync("mobile")
					_user.uid = checkMobile(mobile) ? mobile : '#';
					var _pv = new WCore.inputs.PV(_user);
					_core.send(_pv);
				})();				
			}
			document.body.appendChild(script);
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/iconfont.css';

	page {
		height: 100%;
		background: #f5f5f5;
	}
</style>
