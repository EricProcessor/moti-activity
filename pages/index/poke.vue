<template>
	<view class="pokes">
		<block class="" v-for="(item,index) in imgs" :key="index" >
				<img :src="item.url" class="img-item" :style="{width: '750upx'}" v-if="item.href" @tap="popForm(index)" ></img>	
				<img :src="item.url" class="img-item" :style="{width: '750upx'}" v-else  ></img>	
		</block>
		<popCard @closePop="closePop" v-if="isShowPop">
			<view class="input-form">
				<view class="form-header">
					领取福利
				</view>
				<view class="form-body">
					<view class="form-item">
						<view class="form-title">
							手机号
						</view>
						<input type="text" v-model="form.mobile" placeholder="请输手机号" placeholder-style="font-size:30upx;" value="" />
					</view>
					<view class="form-item">
						<view class="form-title">
							短信验证码
						</view>
						<input type="text" v-model="form.verifyCode" placeholder="请输入短信验证码" placeholder-style="font-size:30upx;" value="" />
						<view class="form-btn" @tap="getVerifyCode" v-if="timeOut<=0">
							获取验证码
						</view>
						<view class="form-btn"  v-if="timeOut>0">
							{{timeOut}}秒后重新获取
						</view>
					</view>
				</view>
				<view class="form-submit" >
					<button class="submit" @tap="submitForm">提交</button>
				</view>
			</view>
		</popCard>
	</view>
</template>

<script>
	import popCard from "../../component/popCard.vue"
	import {checkMobile,post} from "../../common/utils.js"
	export default {
		data(){
			return {
				isShowPop:false,
				clickImgIndex:0,
				timeOut:0,
				codeType:"",
				form:{
					mobile:'',
					verifyCode:''
				},
				imgs:[
					{
						url:'../../static/type/56/1.png',
						
					},
					{
						url:'../../static/type/56/2.png',
						href:"https://poke.motivape.cn/?type=4",
						buryingPoint:""
						
					},
					{
						url:'../../static/type/56/3.png',
						href:"https://poke.motivape.cn/?type=7",
						buryingPoint:""
						
					},
					{
						url:'../../static/type/56/4.png',
						href:"https://poke.motivape.cn/?type=10",
						buryingPoint:""
						
					},
					{
						url:'../../static/type/56/5.png',
						href:"https://poke.motivape.cn/?type=9",
						buryingPoint:""
						
					},
					{
						url:'../../static/type/56/6.png',
						
					},
					{
						url:'../../static/type/56/7.png',
						
					},
					{
						url:'../../static/type/56/8.png',
						height:289
					},
				]
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
		methods:{
			closePop(){
				this.isShowPop = false
			},
			popForm(index){
				this.clickImgIndex = index
				this.isShowPop = true
				this.MonitorEvent(this.imgs[index].buryingPoint)
			},
			async getVerifyCode(){
				
				let res= await this.checkUserMobile(this.form.mobile)
				if(res.data.code === "1") return uni.showToast({
					title:res.msg,
					icon:"none"
				})
				if(res.data.code === "0"){
					this.codeType = 102
				}
				if(res.data.code === "4"){
					this.codeType = 101
				}
			
				let sendRes = await this.sendDynamicCode(this.form.mobile,this.codeType)
				if(sendRes.data.code !== "0"){
					return uni.showToast({
						title:sendRes.data.msg,
						icon:"none"
					})
				}
				this.timeOut = 90
				let timerId = setInterval(()=>{
					if(this.timeOut === 0){
						clearInterval(timerId)
					}
					this.timeOut--
				},1000)
			},
			async submitForm(){
				if(!checkMobile(this.form.mobile)) return uni.showToast({
					title:"请填写正确的手机号",
					icon:"none"
				})
				if(!this.form.verifyCode || this.form.verifyCode.length !== 6) return uni.showToast({
					title:"请输入有效的6位验证码",
					icon:"none"
				})
				let res = await  this.savePhoneNumber()
				if(res.data.code !== "0") return uni.showToast({
					title:res.data.msg,
					icon:"none"
				})
				uni.setStorageSync("mobile",this.form.mobile)
				console.log(this.imgs[this.clickImgIndex].href +"&orderSource="+this.urlParams.orderSource)
				location.href = this.imgs[this.clickImgIndex].href +"&orderSource="+this.urlParams.orderSource
			},
			async checkUserMobile(mobile){
				let res = await post("/activity1/user/checkUserMobile",{mobile:mobile })
				return res
			},
			async sendDynamicCode(mobile,codeType){
				let res = await post("/mall/h5/code/sendDynamicCode",{mobile:mobile,codeType:codeType })
				return res
			},
			async savePhoneNumber(){
				let res = await post("/activity1/user/savePhoneNumber",{dynamicCode :this.form.verifyCode,mobile:this.form.mobile,quickType:9,codeType:this.codeType})
				return res
			}
		},
		components:{
			popCard
		}
	}
</script>

<style lang="scss">
	.pokes{
		display: flex;
		flex-direction: column;
		
		background-color: #ff4a5f;//ff4a5f
		.img-item{
			display: block;
			margin:0;
			padding: 0;	
			line-height:0;		
		}
		.input-form{
			width: 702upx;
			height: 530upx;
			box-sizing: border-box;
			padding:50upx 40upx 40upx 40upx;
			.form-header{
				text-align: center;
				font-size: 36upx;
				font-weight: bold;
				margin-bottom: 66upx;
			}
			.form-body{
				.form-item{
					display: flex;
					
					border-bottom: 1upx solid #C2C2C2;
					font-size: 30upx;
					padding-bottom: 30upx;
					margin-bottom: 49upx;	
					justify-content:space-between;
				
					
					input{
						flex-grow:1;
						height: 42upx;
						line-height: 42upx;
						width: 240upx;
						
					}
					.form-title{
						margin-right: 16upx;
						line-height: 42upx;
					}
					.form-btn{
						line-height: 42upx;
						font-size: 28upx;
						color: #F93822;
						align-self:flex-end;
					}
					
				}
			}
			.form-submit{
				.submit{
					width:622upx;
					height:80upx;
					line-height: 80upx;
					background:#ff4a5f;
					border-radius:8upx;
					color: #FFFFFF;
				}
			}
			
		}
		
	}
</style>
