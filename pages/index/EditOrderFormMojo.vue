<template>
	<view class="panel-body">
		<view class="to-order">
			<view class="to-order-title">
				<view class="title-en">
					<image src="../../static/images/icons/place-an-order.png" mode=""></image>
				</view>
				<view class="title-cn">
					我要下单
				</view>
			</view>
			<view class="broadcast-order">

				<image class="broadcast-icon" src="../../static/images/icons/sound.png" mode=""></image>

				<view class="broadcast-desc">
					已有<text>668</text>人提交订单
				</view>
			</view>
		</view>
		<view class="goods_info_popup">
			<view class="base_info">
				<image class="poster" :src="backgrounds[currentSpecIndex]"></image>
				<view class="info_text">
					<view class="title">
						<view class="title_text">{{goods.title}}<br> <text class="desc_text">( {{goods.desc}} )</text> </view>

					</view>
					<view class="price">
						<text class="icon_rmb">¥</text>
						<text class="number">{{goods.price}}</text>
						<text class="source_price" v-if="goods.sourcePrice">原价 {{goods.sourcePrice}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="attrs-wrapper">
			<view class="attrs-wrapper-title">
				请选择规格
			</view>
			<view class="attrs-group">
				<view :key="index" class="item-color" :class="{active: index === currentSpecIndex,m4: (index%4 == 3 )}" @touchend="chooseSpec"
				 :data-index="index" v-for="(item,index) in spec">
					{{item.text}}
				</view>

			</view>
		</view>
		<view class="purchase-wrapper">
			<view class="purchase-title">
				购买数量
			</view>
			<view class="number-handle">
				<view class="del" @click="numsDownColor">
					-
				</view>
				<view class="number">
					{{buyNumbersColor}}
				</view>
				<view class="add" @click="numsUpColor">
					+
				</view>
			</view>
		</view>
		<view class="attrs_groups" :class="{'hide-show-taste':!isShowTastes}" v-if="this.goods.taste.length">
			<view class="taste-header">
				<view class="taste-header-right">
					<view class="taste-icon">
						<image src="../../static/images/icons/yantan.png" mode=""></image>
					</view>
					<view class="taster-title">
						超值加购烟弹
					</view>
				</view>

				<view class="taste-title-pop" @click="taggleTaste">
					<image src="../../static/images/icons/down-shanjiao.png" mode="widthFix" v-show="isShowTastes"></image>
					<image src="../../static/images/icons/addQty.png" mode="widthFix" v-show="!isShowTastes"></image>
				</view>
			</view>
			<view class="no-show-taste" v-show="isShowTastes">

				<view class="taste-detail">
					<view class="taste-image">
						<image :src="defaultShowTaste.src" mode=""></image>
					</view>
					<view class="taste-title">
						<view class="taste-item-title">
							MOTI 电子烟雾化烟弹
						</view>
						<view class="taste-item-spec">
							口味：{{defaultShowTaste.text}}
						</view>
						<view class="taste-price">
							￥<text>35.00</text>
						</view>
					</view>
				</view>
				<view class="taste-groups">
					<view class="taste-item" :key="index" @tap="chooseTaste" :data-index="index" :class="{active: index === currentTasteIndex, mr0: (index + 1) % 4 === 0}"
					 v-for="(item, index) in goods.taste">
						{{item.text}}
					</view>

				</view>
				<view class="purchase-wrapper">
					<view class="purchase-title mini-title">
						购买烟弹数量
					</view>
					<view class="number-handle">
						<view class="del" @click="numsDownTaste">
							-
						</view>
						<view class="number">
							{{buyNumbersTaste}}
						</view>
						<view class="add" @click="numsUpTaste">
							+
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="total-price">
			合计金额:<text class="price-type">￥</text><text class="price-number">{{totalPrice}}.00</text>
		</view>

		<view class="form-wrapper">
			<view class="form-title">
				收货信息
			</view>
			<view class="form-group">
				<view class="input-item" v-for="(item, index) in userInfo" :key="index">
					<view class="text">{{item.text}}</view>

					<!-- <ChoicArea v-if="index === 2"    @pickArea="getAreas"  :initData="areaObj" :isClear = "isClear" ></ChoicArea> -->
					<view class="input citySelect" v-if="index === 2">
						<input type="text" disabled="true"  @tap="showCityPicker"  placeholder-style="color: #b6b6b6;" :placeholder="item.placeholder" v-model="item.value">
						<image class="arrow-down" @tap="showCityPicker" src="/static/images/icons/arrow_down.png"></image>
					</view>
					<view  v-else class="input">
						<input type="text" placeholder-style="color: #b6b6b6;font-size:30upx;height: 30upx;line-height:30upx;"
						 :placeholder="item.placeholder" v-model="item.value">
					</view>

				</view>
			</view>
			<mpvueCityPicker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel"  @onConfirm="onConfirm"></mpvueCityPicker>
		</view>
	</view>

</template>



<script>
	import {

		checkMobile,

	} from "@/common/utils.js";
	import goodsConfig from "../../common/goodsConfig.js"
	import typeConfig from "../../common/typeConfig.js"
	/*import Goods from "./goodsMojo.js"
	import GoodsTwo from "./goodsMojo2.js"
	import GoodsMojoFree from "./goodsMojoFree.js"
	import GoodsMojo24 from "./goodsMojo24.js"*/
	import ChoicArea from "./ChoicArea.vue"
	import mpvueCityPicker from "../../component/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		data() {
			return {
				cityPickerValueDefault: [0, 0, 0],
				formScrolly:1160,
				currentSpecIndex: 0,
				currentTasteIndex: "",
				buyNumbersColor: 1,
				buyNumbersTaste: 0,
				isShowTastes: false,
				spec: [],
				backgrounds: [],
				goods: {},
				areaObj:{},
				userInfo: [{
						text: "收货人",
						value: "",
						placeholder: "请输入姓名"
					},
					{
						text: "联系方式",
						value: "",
						placeholder: "请填写手机号码"
					},
					 {
					 	text: '选择地区',
					 	value: '',
					 	placeholder: '选择地区'
					},
					{
						text: "详细地址",
						value: "",
						placeholder: "请填写详细地址"
					},
					{
						text: "留言备注",
						value: "",
						placeholder: "如果购买多件商品，可备注留言选择颜色"
					}

				],

			}
		},
		props: {
			isClear: {
				type: Boolean,
				default: false,
			},
			initData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			orderScrollTop:{
				type:Number,
				default:0
			},
			paramType:{
				type:Number,
				default:0
			}
		},
		computed: {

			totalPrice() {
				return this.buyNumbersColor * this.goods.price + this.buyNumbersTaste * 35.00;
			},
			defaultShowTaste() {
				let index = this.currentTasteIndex ? this.currentTasteIndex : 0;
				return this.goods.taste[index]
			},
			goodsInfo(){
				console.log(typeConfig[this.paramType].goodsName)
				return goodsConfig[typeConfig[this.paramType].goodsName]
				/*if(this.paramType == 24 || this.paramType == 29) return GoodsMojo24
				if(this.paramType == 23) return Goods
				if(this.paramType == 27 || this.paramType == 30) return GoodsMojoFree
				return GoodsTwo*/
			}
		},
		watch: {
			isClear() {

				this.currentSpecIndex = 0;
				this.buyNumbersColor = 1;
				this.currentTasteIndex = "";
				this.buyNumbersTaste = 0;
				this.areaObj = {}

				this.userInfo = [{
						text: "收货人",
						value: "",
						placeholder: "请输入姓名"
					},
					{
						text: "联系方式",
						value: "",
						placeholder: "请填写手机号码"
					},
					{
					 	text: '选择地区',
					 	value: '',
					 	placeholder: '请输入'
					},
					{
						text: "详细地址",
						value: "",
						placeholder: "请填写详细地址"
					},
					{
						text: "留言备注",
						value: "",
						placeholder: "如果购买多件商品，可备注留言选择颜色"
					}

				]
			}

		},
		created() {
			console.log("child init ..", this.initData)
			this.spec = this.goodsInfo.spec
			this.backgrounds = this.goodsInfo.backgrounds
			this.goods = this.goodsInfo.goods
			if (!this.initData || JSON.stringify(this.initData) === '{}') return;
			this.userInfo = Object.assign(this.userInfo, this.initData.userInfo)
			this.buyNumbersColor = this.initData.buyNumbersColor
			this.buyNumbersTaste = this.initData.buyNumbersTaste
			this.currentSpecIndex = this.initData.currentSpecIndex
			this.currentTasteIndex = this.initData.currentTasteIndex
			this.isShowTastes = this.initData.isShowTastes
			this.areaObj = this.initData.areaObj
			if(this.areaObj && JSON.stringify(this.areaObj) !== '{}'){
				this.cityPickerValueDefault = [this.areaObj.province.index,this.areaObj.city.index,this.areaObj.area.index]
			}

		},
		components:{
			ChoicArea,
			mpvueCityPicker
		},
		methods: {
			onConfirm(data){
				
				let labelArr = data.label.split("-")
				let cityCodeArr = data.cityCode.split("-")
				let indexArr = data.value.split("-")
				this.areaObj.province = {
					index:  parseInt(indexArr[0]),
					label: labelArr[0],
					value: cityCodeArr[0]
				}
				this.areaObj.city = {
					index:parseInt(indexArr[1]),
					label: labelArr[1],
					value: cityCodeArr[1]
				}
				this.areaObj.area = {
					index:parseInt(indexArr[2]),
					label: labelArr[2],
					value: cityCodeArr[2]
				}
				
				this.userInfo[2].value = labelArr.join(" ")
			},
			onCancel(){
				
			},
			showCityPicker(){
				this.$refs["mpvueCityPicker"].show()
			},
			getAreas(data){
				this.areaObj = data
			},
			chooseSpec(e) {
				this.currentSpecIndex = Number(e.currentTarget.dataset.index);
				this.buyNumbersColor < 1 && (this.buyNumbersColor = 1) && this.sum()

			},
			chooseTaste(e) {
				let choicIndex = Number(e.currentTarget.dataset.index)
				if (this.currentTasteIndex === choicIndex) {
					this.currentTasteIndex = ""
					this.buyNumbersTaste = 0
					return
				}
				this.currentTasteIndex = Number(e.currentTarget.dataset.index);
				if (this.buyNumbersTaste < 1) this.buyNumbersTaste = 1
			},
			numsUpColor(e) {
				if(this.buyNumbersColor>= 1 && (!typeConfig[this.paramType].isShowAgain)) return uni.showToast({
					title:"每次只能限购一个哦",
					icon:"none"
				})
				this.buyNumbersColor += 1;

			},
			numsDownColor(e) {
				this.buyNumbersColor > 0 && (this.buyNumbersColor -= 1);

			},
			numsUpTaste(e) {
				if(this.currentTasteIndex === "") return uni.showToast({
					title:"请选择您喜欢的口味",
					icon:"none"
				})
				this.buyNumbersTaste += 1;
			},
			numsDownTaste() {
				this.buyNumbersTaste > 0 && (this.buyNumbersTaste -= 1)
			},
			numsDownColorTaste(e) {
				this.buyNumbersTaste > 1 && (this.buyNumbersTaste -= 1);
			},
			taggleTaste() {
				this.isShowTastes = !this.isShowTastes;
				if (!this.isShowTastes) {
					this.currentTasteIndex = ""
					this.buyNumbersTaste = 0
				}
				this.$nextTick(()=>{
					this.getSrollHeight()
				})
			},
			checkSubmit() {
				let data = {code: 0, message: ""}
				
				if (!this.userInfo[3].value) {
					data = {
						code: 1,
						message: "请输入收货地址"
					}
				}
				
					if(!this.areaObj || JSON.stringify(this.areaObj) === "{}"){
					data = {
						code:1,
						message:"请选择省市区"
					}
				}else{
					
					
					if(JSON.stringify(this.areaObj.area) === "{}" || !this.areaObj.area ){
						data = {
							code:1,
							message:"请选择区/县"
						}
					}
					if(JSON.stringify(this.areaObj.city) === "{}" || !this.areaObj.city ){
						data = {
							code:1,
							message:"请选择城市"
						}
					}
					if(JSON.stringify(this.areaObj.province) === "{}" || !this.areaObj.province ){
						data = {
							code:1,
							message:"请选择省份"
						}
					}
				}
				
				if (!checkMobile(this.userInfo[1].value)) {	
					data = {
						code: 1,
						message: "请输入正确的联系电话"
					}	
				}
				
				if (!this.userInfo[0].value) {
					data = {
						code: 1,
						message: "请输入收货人名称"
					};
				}
				if(data.code) this.$nextTick(()=>{
				
					uni.pageScrollTo({
						duration:200,
						scrollTop:this.formScrolly
					})
				})
				
				if (this.buyNumbersColor < 1) {
					data = {
						code: 1,
						message: "请选择数量"
					}
				}

				if (this.currentTasteIndex !== "" && this.buyNumbersTaste < 1) {
					data =  {
						code: 1,
						message: "请选择口味数量"
					}
				
				}
				return data
			},
			getRegisterParams() {
				return {
					userName: this.userInfo[0].value,
					mobile: this.userInfo[1].value,
					userAddress: this.userInfo[3].value,
					quickType: 4 ,// 活动页注册来源
					provinceCode: this.areaObj.province.value,
					provinceName: this.areaObj.province.label,
					cityCode: this.areaObj.city.value,
					cityName: this.areaObj.city.label,
					districtName:this.areaObj.area.value,
					districtCode:this.areaObj.area.label
				}
			},
			getOrderParams() {
				
				const orderInfo = {
					userName: this.userInfo[0].value,
					address: this.userInfo[3].value,
					mobile: this.userInfo[1].value,
					tobaccoSkuPrice:this.goods.price,
					tobaccoSku: this.spec[this.currentSpecIndex].sku,
					tobaccoSkuNum: this.buyNumbersColor,
					cartridgesSku: this.currentTasteIndex === "" ? "" : this.goods.taste[this.currentTasteIndex].sku,
					cartridgesSkuNum: this.currentTasteIndex === "" ? 0 : this.buyNumbersTaste,
					remark: this.userInfo[4].value,
					provinceCode: this.areaObj.province.value,
					provinceName: this.areaObj.province.label,
					cityCode: this.areaObj.city.value,
					cityName: this.areaObj.city.label,
					districtName:this.areaObj.area.label,
					districtCode:this.areaObj.area.value
				};
				return orderInfo
			},
			getSrollHeight(){
				
				this.formScrolly = document.getElementsByClassName("form-wrapper")[0].offsetTop
			}

		},
		mounted() {
			this.$nextTick(() => {
				this.getSrollHeight()
			})
		}
	}
</script>


<style lang="scss" scoped>
	.panel-body {
		padding: 20upx  40upx 0upx 40upx;
		
		background-color: #FFFFFF;
	}

	.to-order {
		text-align: center;
		

		.to-order-title {
			font-weight: bold;
			margin-bottom: 71upx;

			.title-en {
				height: 32upx;
				text-align: center;
				margin-bottom: 20upx;
				image{
					height: 100%;
					width: 425upx;
					display: inline-block;
				}
			}

			.title-cn {
				font-size: 55upx;
			}
		}

		.broadcast-order {
			display: flex;
			padding: 0 67upx;
			align-items: center;
			width: 670upx;
			height: 88upx;
			box-sizing: border-box;
			border-radius: 43.75upx;
			border: 1upx solid #b6b6b6;
			line-height: 88upx;
			font-size: 36upx;
			margin-bottom: 80upx;
			//box-shadow: #ff4d3d;
			box-shadow:0px 20upx 40upx -25upx #fddbdf;

			.broadcast-desc {
				margin-left: 70upx;

				text {
					font-weight: bold;
					color: #ff4e3e;

				}
			}

			.broadcast-icon {
				width: 52upx;
				height: 46upx;
			}

		}
	}

	.goods_info_popup {

		.base_info {
			display: flex;

			.poster {
				width: 160upx;
				height: 160upx;
				box-sizing: border-box;
				border-radius: 10upx;
				border: 1upx solid #b6b6b6;
				flex-shrink: 0;
			}

			.info_text {
				margin-left: 41upx;

				.title {
					.title_text {
						font-size: 34upx;
						font-weight: bold;
						color: #333333;
					}

					.desc_text {
						font-size: 26upx;
						color: #a0a0a0;
						font-weight: normal;
						margin-left: 10upx;


					}
				}

				.price {
					color: #ff4d3d;

					.icon_rmb {
						font-size: 26.6upx;
					}

					.number {
						font-size: 50upx;
						font-weight: bold;
					}

					.source_price {
						margin-left: 10upx;
						font-size: 26upx;
						text-decoration: line-through;
						color: #999999;
					}
				}
			}
		}
	}

	.attrs-wrapper {
		margin-top: 50upx;

		.attrs-wrapper-title {
			font-size: 34upx;
			font-weight: bold;
			color: #333333;
		}

		.attrs-group {
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			//justify-content: space-between;

			.item-color {
				width: 146upx;
				height: 60upx;
				margin-bottom: 15upx;
				
				margin-right: 27upx;
				
				border: 1upx #333333 solid;
				border-radius: 8upx;
				text-align: center;
				font-size: 26upx;
				line-height: 60upx;


				&.active {
					border: none;
					background-color: #ff5041;
					color: #FFFFFF;
				}
				&.m4{
					margin-right: 0upx;
				}
			}
			
		}

	}

	.purchase-wrapper {
		margin-top: 50upx;
		display: flex;
		justify-content: space-between;

		.purchase-title {
			line-height: 60upx;
			font-size: 34upx;
			font-weight: bold;
		}

		.mini-title {
			font-size: 26upx;
		}

		.number-handle {
			display: flex;
			text-align: center;
			line-height: 60upx;

			.del {
				border: 1upx solid #333333;
				width: 82upx;
				height: 60upx;
				border-top-left-radius: 7upx;
				border-bottom-left-radius: 7upx;
			}

			.number {
				border-top: 1upx solid #333333;
				border-bottom: 1upx solid #333333;
				width: 129upx;
				height: 60upx;
				color: #ff5041;
			}

			.add {
				border: 1upx solid #333333;
				width: 82upx;
				height: 60upx;
				border-top-right-radius: 7upx;
				border-bottom-right-radius: 7upx;
			}
		}
	}

	.attrs_groups {
		margin-top: 50upx;
		padding: 19upx 41upx 53upx 41upx;
		border-radius: 8upx;
		border: 1upx solid #333333;

		.taste-header {
			display: flex;
			justify-content: space-between;
			padding-bottom: 16upx;
			border-bottom: 2upx solid #cccccc;

			.taste-header-right {
				display: flex;

				.taste-icon {
					width: 85upx;
					height: 55upx;

					image {
						width: 85upx;
						height: 55upx;
					}
				}

				.taster-title {
					margin-left: 20upx;
					height: 55upx;
					line-height: 55upx;
					font-size: 34upx;
					font-weight: bold;
				}
			}

			.taste-title-pop {
				height: 55upx;
				line-height: 55upx;

				image {
					height: 17upx;
					width: 28upx;
				}
			}

		}

		.taste-detail {
			display: flex;
			margin-top: 55upx;

			.taste-image {
				width: 120upx;
				height: 120upx;

				image {
					/* 	border: 1upx solid #b6b6b6;
					border-radius: 10upx; */
					width: 120upx;
					height: 120upx;
				}
			}

			.taste-title {
				margin-left: 21upx;

				.taste-item-title {
					font-size: 26upx;
					font-weight: bold;
				}

				.taste-item-spec {
					font-size: 26upx;
					color: #a0a0a0;
				}

				.taste-price {
					color: #ff5041;
					font-size: 26.6upx;

					text {
						font-size: 40upx;
						font-weight: bold;
					}
				}
			}
		}

		.taste-groups {
			display: flex;

			flex-wrap: wrap;

			.taste-item {
				font-size: 26upx;
				height: 49upx;
				width: 130upx;
				line-height: 25upx;
				border-radius: 6upx;
				color: #333333;
				border: 1upx solid #333333;
				padding: 11upx 12upx;
				box-sizing: border-box;
				margin-right: 22upx;
				margin-top: 40upx;

				&.mr0 {
					margin-right: 0;
				}

				&.active {
					border: none;
					color: #FFFFFF;
					background-color: #ff5041;
				}
			}
		}

		&.hide-show-taste {
			height: 95upx;
			box-sizing: border-box;

			.taste-header {
				border: none;
			}
		}

	}

	.total-price {
		text-align: right;
		font-size: 34upx;
		margin-top: 50upx;

		.price-type {
			color: #ff4d3d;
			font-size: 26upx;

		}

		.price-number {
			font-size: 50upx;
			font-weight: bold;
			color: #ff4d3d;
		}

	}

	.form-wrapper {
		padding-top: 69upx;
		margin-bottom: 10upx;

		.form-title {
			font-size: 34upx;
			//font-weight: bold;
		}

		.input-item {
			margin-top: 51upx;

			.text {
				line-height: 1;
				font-size: 30upx;
				color: #323232;
			}

			.input {
				//margin-top: 27upx;
				padding: 27upx 0 15upx 0;
				border-bottom: 1upx solid #b6b6b6;
				font-size: 30upx;
				color: #323232;
				
				
				&.citySelect{
					display: flex;
					justify-content: space-between;
					align-items: center;
					//position: relative;
				}
				.arrow-down{
					display: position;
					width: 26upx;
					height: 14upx;
					right: 0;
				}

				input {
					//line-height: normal;
					transform: translateZ(0);
					height: 30upx;
					flex-grow:1,
				}
			}

		}
	}
</style>
