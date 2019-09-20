<template>
	<view >
		<poke :urlParams="urlParams" v-if="urlParams.type == 56"></poke>
		<Fens :urlParams="urlParams" v-if="urlParams.type == 58"></Fens>
		<MfwFen :urlParams="urlParams" v-if="urlParams.type == 66"></MfwFen>
	</view>
</template>

<script>
	import poke from "./poke.vue"
	import Fens from "./Fens.vue"
	import MfwFen from "./MfwFen.vue"
	export default {
		data(){
			return {
			
			}
		},
		props:{
			urlParams:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		components:{
			poke,
			Fens,
			MfwFen
		}
	}
</script>

<style>
</style>
