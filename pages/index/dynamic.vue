<template>
	<view class="dynamic">
		<view class="uni-swiper-msg">
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<view>{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:[
					'上海严女士  75秒前 已成功发货',
					'哈尔滨郑女士 65秒前 已成功发货',
					'厦门张女士 61秒前 已成功发货',
					'深圳苗女士 59秒前 已成功发货',
					'青岛云先生 51秒前 已成功发货',
					'南京孙女士 47秒前 已成功发货',
					'烟台周先生 45秒前 已成功发货',
					'广东赵女士 41秒前 已成功发货',
					'南昌陶先生 39秒前 已成功发货',
					'宁波王女士 36秒前 已成功发货',
					'天津沈先生 32秒前 已成功发货',
					'武汉花女士 31秒前 已成功发货',
					'北京张先生 30秒前 已成功发货',
					'江苏马先生 29秒前 已成功发货',
					'长沙吴先生 26秒前 已成功发货',
					'重庆苏先生 25秒前 已成功发货',
					'贵阳唐先生 16秒前 已成功发货',
					'唐山金女士 13秒前 已成功发货'
				]
			};
		}
	}
</script>

<style lang="scss">
	.dynamic{
		position: fixed;
		top: 90upx;
		width: 50%;
		// left: 0;
		// right: 0;
		// bottom: 0;
		background: rgba(0, 0, 0, .5);
		border-radius: 20upx;
		height: 50upx;
		line-height: 50upx;
		padding: 0 30upx;
		font-size: 24upx;
		color: #fff;
		overflow: hidden;
		z-index: 100;
		swiper {
			// overflow: hidden;
			swiper-item {
				height: 50upx;
			}
		}
		.iconfont{
			margin-right: 40upx;
			color: #FA4650;
		}
	}
</style>
