<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			console.log(window.location.href);
			// this.$wechat.initJssdk(window.location.href.split('#')[0])
			
			this.$wechat.initJssdk2()
			
		},
		onHide: function() {
			console.log('App Hide')
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
