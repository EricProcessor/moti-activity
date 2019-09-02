<script>
	import {checkMobile} from "common/unils.js"
	export default {
		onLaunch: function() {
			
			this.MonitorPV()
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		watch:{
			$route(to,from){	
				window._mreferrer = from.fullPath
				this.MonitorPV()
			}
		},
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
