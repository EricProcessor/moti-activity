import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		shopDetail: {},
	},
	mutations: {
		updateShopDetail(state, data) {
			state.shopDetail = data
		}
	}
})

export default store
