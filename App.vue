<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			console.log(window.location.href);
			// this.$wechat.initJssdk(window.location.href.split('#')[0])
			
			// this.$wechat.initJssdk2()
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			const UA = window.navigator.userAgent.toLowerCase()
			const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA))
			if (isIOS) {
				this.$wechat.initJssdk2()
			}
			const isDev = process.env.NODE_ENV === 'development'
			if(!isDev){
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
	body {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	page{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
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
