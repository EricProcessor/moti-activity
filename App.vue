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
