import Vue from 'vue'
import App from './App'
import store from "./common/js/store.js"
Vue.config.productionTip = false
Vue.prototype.$store = store  
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
