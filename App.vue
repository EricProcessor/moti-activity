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
		}
	}
</script>

<style>
	@import './common/iconfont.css';

	/*每个页面公共css */
	page {
		background-color: #FFFFFF;
		height: 100%;
		font-family: MicrosoftYaHei;
		font-weight: normal;
		font-stretch: normal;
		font-size: 28upx;
		letter-spacing: 0px;
		color: #000000;
	}
	
	.uni-picker .uni-picker-action.uni-picker-action-confirm{
		color: #333333 !important;
	}
	
</style>
