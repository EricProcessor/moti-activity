<script>
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
			// 友盟统计添加
			const script = document.createElement("script");
			script.src =
				"https://s96.cnzz.com/z_stat.php?id=1277686800&web_id=1277686800";
			script.language = "JavaScript";
			document.body.appendChild(script);
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
