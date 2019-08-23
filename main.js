import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.mixin({
	methods: {
		_bxmPlatformFn(){//变现猫
			if(this.paramType && this.pageConfigure.bianXianMao){
				//if(typeof window._bxmPlatformFn === 'undefined') return 
				if(typeof window._bxmPlatformFn === 'function') window._bxmPlatformFn()
			}	
			if(this.paramType && this.pageConfigure.isTuiAMonitor){
				//if(typeof window._bxmPlatformFn === 'undefined') return 
				if(typeof window.countLog === 'object') window.countLog.init()
			}	
		}
	}
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
