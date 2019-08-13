<template>
	<view class="m_popup_center" v-if="show" @tap="closeMask">
		<view class="m_popup_bottom_inner" @tap.stop>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		methods: {
			closeMask() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.m_popup_center {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10;
		
		.m_popup_bottom_inner {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
		}
	}
</style>
