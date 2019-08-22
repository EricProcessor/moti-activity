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
				"//mdemo.leiyankeji.com/moduleJs/wcore.js";
			script.language = "JavaScript";
			
			//document.body.appendChild(script);
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
