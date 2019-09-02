import Vue from 'vue'
import App from './App'
import {checkMobile} from "./common/utils.js"

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
		},
		MonitorEvent(ec) {
			//f(isDevEnv) return ;
			//if(process.env.NODE_ENV === 'development') return ;
			if(typeof WCore === 'undefined') return ;	
			var _core = new WCore();
			 _core.options.cid = 'poke';
			var _user = new WCore.inputs.User();
			let mobile = uni.getStorageSync("mobile")
			_user.uid = checkMobile(mobile) ? mobile :  '#';
			var _pv = new WCore.inputs.PV(_user);
			var _event = new WCore.inputs.Event(_pv);
			_event.ec = ec;
			_event.ea = event.type;
			_core.send(_event); 
		
		},
		MonitorPV(){
			//if(isDevEnv) return ;
			//if(process.env.NODE_ENV === 'development') return ;
			
			if(typeof WCore === 'undefined') return ;
			var _core = new WCore();
			 _core.options.cid = 'poke';
			var _user = new WCore.inputs.User();
			let mobile = uni.getStorageSync("mobile")
			_user.uid = checkMobile(mobile) ? mobile : '#';
			var _pv = new WCore.inputs.PV(_user);
			_core.send(_pv);
		}
	}
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
