<template>
	<view class="fens-content">
		<block v-for="(item,index) in imgs" :key="index">
			<img :src="item" style="width:750upx"></img>
		</block>
		<view class="bottom-image">
			<img src="../../static/type/58/photo8.jpg" style="width:750upx" class="cover-img"></img>
			<view class="warp-content">
				<view class="fill-form" @tap="link">
					填写报名表
				</view>
				<view class="bottom-line"></view>
			</view>

		</view>
		<view class="play-music" v-if="playState">
			<view class="play-images">
				<view class="music-title">
					<image src="../../static/type/58/stop.png" @click="pause" v-if="playState === 1"></image>
					<image src="../../static/type/58/play.png" @click="play" v-if="playState === 2"></image>
				</view>
				<div class="wrap" @tap="toggle">
					<div class="cont">
						<text class="txt">MOTI - 澄海伯伯&emsp;  </text><text class="txt">MOTI - 澄海伯伯&emsp;  </text>
					</div>
				</div>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [
					'../../static/type/58/photo1.jpg',
					'../../static/type/58/photo2.jpg',
					'../../static/type/58/photo3.jpg',
					'../../static/type/58/photo4.jpg',
					'../../static/type/58/photo5.jpg',
					'../../static/type/58/photo6.jpg',
					'../../static/type/58/photo7.jpg',

				],
				actionMethod: {
					method: "pause"
				},
				playState: 0, // 1 播放中 2 暂停中
				innerAudioContext: {},
				isZhuDongPause:false,
			}
		},
		methods: {
			link() {
				setTimeout(() => {
					window.location.href = "https://wj.qq.com/s2/3905578/1dcf/"
				}, 0)
			},
			play() {
				this.innerAudioContext.play()

			},
			pause() {
				this.innerAudioContext.pause()

			},
			toggle(){
				if(this.playState){
					if(this.playState === 1){
						this.pause()
					}
					if(this.playState === 2){
						this.play()
					}
				}
			},
			createdHtmlAudio() {
				this.innerAudioContext = document.createElement("audio")
				this.innerAudioContext.src = '../../static/type/58/music.mp3'
				this.innerAudioContext.autoplay = "autoplay"
				this.innerAudioContext.loop = "loop"

				//document.body.appendChild(this.innerAudioContext);
				//this.innerAudioContext.play()
				this.playState = 1
			},
			createdAudio() {

				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.loop = true
				this.innerAudioContext.src = '../../static/type/58/music.mp3'
				this.innerAudioContext.onPlay(() => {
					this.playState = 1
				});

				this.innerAudioContext.onPause(() => {
					this.playState = 2
					this.isZhuDongPause = true
				})
				setTimeout(()=>{
					if(!this.playState) this.playState = 2
				}, 2000);
			},
			touchstart(){
				
				if(this.playState == 2 && !this.isZhuDongPause ) {
					this.innerAudioContext.play()
					document.removeEventListener('touchstart', this.touchstart);
				}
			}
		},
		mounted() {
			document.addEventListener('touchstart', this.touchstart, false);
			this.$nextTick(() => {
				this.createdAudio()
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.fens-content {
		font-size: 0;
		line-height: 0;
		margin: 0;
		padding: 0;
		background-color: #070029;
		.play-music {
			width: 195upx;
			height: 44upx;
			position: absolute;
			//position: relative;
			top: 20upx;
			right: 20upx;

			.play-images {
				.music-title {
					image {
					
						width: 195upx;
						height: 44upx;
					}
				}

				.wrap {
					position: absolute;
					width: 155upx;
					height: 44upx;
					font-size: 0;
					top: 0;
					left:44upx;
					overflow: hidden;
					.cont {
						position: absolute;
						top: 0;
						left: 0;
						/* 宽度 大于容器的两倍即可 */
						width: 345upx;
						animation: 5s move infinite linear;
						.txt {
							font-size: 20upx;
							color: #fff;
							display: inline;
							width: 50%;
							height: 44upx;
							line-height: 44upx;
							text-align: center;
							margin-left: 15upx;
							
							@keyframes move {
								0% {
									left: 0;
								}
							
								100% {
									left: -100%;
								}
							}
						}
					}

					

				}
			}



		}

		.bottom-image {

			position: relative;
			width: 750upx;
			line-height: 0;
			.cover-img{
				display: block;
			}

			.warp-content {
				position: absolute;
				text-align: center;
				bottom: 160upx;
				right: 0;
				width: 750upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.fill-form {
					height: 30upx;
					color: #FFFFFF;
					font-size: 34upx;
					letter-spacing: 4upx;
				}

				.bottom-line {
					width: 185upx;
					border-bottom: 1upx solid #a19b9b;
				}
			}

		}
	}
</style>
