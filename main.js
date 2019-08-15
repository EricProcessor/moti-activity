import Vue from 'vue'
import App from './App'
import wechat from './common/wechat.js'
 
if (wechat.isWechat()) {
	Vue.prototype.$wechat = wechat;
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
