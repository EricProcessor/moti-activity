import Vue from 'vue'
import App from './App'
import jweixin from 'jweixin-module'

const jweixin = require('jweixin-module')
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
