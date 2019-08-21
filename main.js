import Vue from 'vue'
import App from './App'
import {checkMobile} from "common/unils.js"

Vue.config.productionTip = false

App.mpType = 'app'
Vue.mixin({
	methods: {
		MonitorEvent(ec,ea) {

			/* console.log("触发监控....")
			var _core = new WCore();
			var _user = new WCore.inputs.User();
			let mobile = uni.getStorageSync("mobile")
			_user.uid = checkMobile(mobile) ? mobile :  '#';
			var _pv = new WCore.inputs.PV(_user);
			var _event = new WCore.inputs.Event(_pv);
			_event.ec = ec;
			_event.ea = ea;
			_core.send(_event); */

		}
	}
})

const app = new Vue({
	...App
})
app.$mount()
