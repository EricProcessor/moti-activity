import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.mixin({
	methods: {
		_bxmPlatformFn(){//变现猫
			if(this.paramType && this.paramType == 24){
				if(typeof window._bxmPlatformFn === 'undefined') return 
				if(typeof window._bxmPlatformFn === 'function') window._bxmPlatformFn()
			}		
		}
	}
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
