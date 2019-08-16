<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			console.log(window.location.href);
			// this.$wechat.initJssdk(window.location.href.split('#')[0])
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			if(isProdEnv){
				//友盟统计添加
				const script = document.createElement("script");
				script.src = "https://s5.cnzz.com/z_stat.php?id=1277794271&web_id=1277794271";
				script.language = "JavaScript";
				document.body.appendChild(script);
			}
			
		}
	}
</script>

<style>
	page{
		background:#121518;
		height:100%;
	}
	.uni-progress-bar{
		border-radius: 10upx;
	}
	.uni-progress-inner-bar{
		border-radius: 10upx;
	}
</style>
