<script>
	import {isProdEnv} from "common/js/common/const.js"
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

	.uni-picker .uni-picker-action.uni-picker-action-confirm {
		color: #333333 !important;
	}
</style>
