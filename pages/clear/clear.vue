<template>
	<view>
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '清楚数据'
			};
		},
		onShow() {
			uni.clearStorageSync()
			setTimeout(() => {
				this.text = '清楚成功'
			}, 1500)
		}
	}
</script>

<style lang="scss">

</style>
