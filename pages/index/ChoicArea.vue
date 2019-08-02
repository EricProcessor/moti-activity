<template>
	<view class="choose_location">
		<picker class="picker" :range="provinceData" range-key="label" :value="provinceIndex"  @change="provinceChnage">
			<view class="picker_text">
				<view class="text" :class="{choosed: provinceObjct.label}">{{provinceObjct.label || '选择省'}}</view>
				<image src="/static/images/icons/arrow_down.png"></image>
			</view>
		</picker>
		<picker class="picker" :range="cityData[provinceIndex]"  :value="cityIndex" range-key="label" @change="cityChange">
			<view class="picker_text">
				<view class="text" :class="{choosed: cityObject.label}">{{cityObject.label || '选择市'}}</view>
				<image src="/static/images/icons/arrow_down.png"></image>
			</view>
		</picker>
		<picker class="picker" :range="areaData[provinceIndex][cityIndex]" :value="areaIndex"  range-key="label" @change="areaChange">
			<view class="picker_text">
				<view class="text" :class="{choosed: areaObjct.label}">{{areaObjct.label || '选择区'}}</view>
				<image src="/static/images/icons/arrow_down.png"></image>
			</view>
		</picker>
	</view>
</template>

<script>
	import provinceData from "@/common/city-data/province.js";
	import cityData from "@/common/city-data/city.js";
	import areaData from "@/common/city-data/area.js";
	export default{
		data(){
			return{
				provinceData: provinceData,
				cityData: cityData,
				areaData: areaData,
				
				provinceIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
			
				provinceObjct:{},
				cityObject:{},
				areaObjct:{}
			}
		},
		props:{
			initData:{
				type: Object,
				default:function(){
					return {}
				}			
			},
			isClear:{
				type:Boolean,
				default:false,
			}
		},
		watch:{
			isClear(){
				this.provinceIndex = this.cityIndex = this.areaIndex = 0;
				this.provinceObjct = {}
				this.cityObject = {}
				this.areaObjct = {}
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				
				if(JSON.stringify(this.initData) === '{}' || !this.initData) return ;
				this.provinceIndex = this.initData.province.index
				this.provinceObjct = this.initData.province
				
				this.cityIndex = this.initData.city.index
				this.cityObject = this.initData.city
				
				this.areaIndex = this.initData.area.index
				this.areaObjct = this.initData.area
				
			},		
			provinceChnage(e) {
				this.provinceIndex = e.detail.value;
				this.provinceObjct = this.provinceData[this.provinceIndex];
				this.provinceObjct.index = e.detail.value;
				this.$emit("pickArea",{province:this.provinceObjct,city:this.cityObject,area:this.areaObjct})
				
			},
			cityChange(e) {
				
				this.cityIndex = e.detail.value;
				this.cityObject = this.cityData[this.provinceIndex][this.cityIndex];
				this.cityObject.index = e.detail.value
				this.$emit("pickArea",{province:this.provinceObjct,city:this.cityObject,area:this.areaObjct})
				
			},
			areaChange(e) {
				
				this.areaIndex = e.detail.value;
				this.areaObjct = this.areaData[this.provinceIndex][this.cityIndex][this.areaIndex];
				this.areaObjct.index = e.detail.value;
				this.$emit("pickArea",{province:this.provinceObjct,city:this.cityObject,area:this.areaObjct})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.choose_location {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.picker {
			//flex-grow:1;
			margin-top: 23upx;
			width: 200upx;
			height: 76upx;
			border: 1px solid #b6b6b6;
			//border-bottom:  1px solid #b6b6b6;
			border-radius: 8upx;

			.picker_text {
				padding: 0 21upx;
				//padding-left: 21upx;
				height: 76upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.text {
					max-width: 180upx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					overflow: hidden;
					font-size: 30upx;
					color: #b6b6b6;
					margin-right: 30upx;

					&.choosed {
						color: #333;
					}
				}

				image {
					flex-shrink: 0;
					width: 24upx;
					height: 16upx;
				}
			}
		}
	}
</style>
