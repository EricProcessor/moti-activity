<template>
	<view class="index-content">
		<header-box :count="userCountNum"></header-box>
		<!-- <qrcode-img></qrcode-img> -->
		<footer-box></footer-box>
		<view class="joinBtn btn" @tap.stop="joinBtn">我要参与活动</view>
		<view class="pop-up" @tap="closeSelect" v-if="isJoin">
			<view class="pop"></view>
			<view class="pop-content">
				<view class="title">我要参与活动</view>
				<view class="tit">请选择参与方式，点击后不可进行修改哦</view>
				<view @tap.stop="selected(item.id, item.url)" :class="{ active: selectedIndex == item.id }" class="content-li" v-for="(item, index) in activityInfo" :key="index">
					<view class="content-top">{{ item.title }}</view>
					<view class="content">{{ item.content }}</view>
				</view>
				<view class="btn confirm" @tap.stop="confirm">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
import headerBox from '@/components/header.vue';
import footerBox from '@/components/footer.vue';
import qrcodeImg from '@/components/qrcodeimg.vue';
import { addWechatUser, queryHelpMasterByUserId, queryTaskMasterByActiId, saveHelpMaster,getUserAllInfo, userCount } from '@/common/request.js';
export default {
	components: {
		headerBox,
		footerBox,
		qrcodeImg
	},
	data() {
		return {
			isJoin: false,
			wxUserInfo: null,
			userCountNum: 0,
			selectedIndex: 0,
			activityInfo: [
				{
					title: '我没有电子烟产品',
					content: '需完成 36 个好友助力，获取限时购买资格',
					url: '/pages/userA/userA',
					id: 1
				},
				{
					title: '我有MOTI（MT）产品',
					content: '需完成 10 个好友助力+拍照上传 MOTI 照片 获取换购资格',
					url: '/pages/userB/userB',
					id: 2
				},
				{
					title: '我有其他品牌的换弹式电子烟',
					content: '需完成5个好友助力+寄回换弹式烟杆',
					url: '/pages/userC/userC',
					id: 3
				}
			],
			appId: '',
			secret: '',
			code: null,
			headImgUrl: null,
			nickname: null,
			openId: null,
			sexDesc: null,
			activityId: '423784446',
			wechatId: 0,
			isLogin: false, //用户是否已经授权
			option: null,
			isOnLoad: false
		};
	},
	onLoad(option) {
		this.isOnLoad = true
		this.option = option
		// 本地有微信信息说明已经授权过了, 不用再次授权
		const wxUserInfo = uni.getStorageSync('wxUserInfo')
		if (wxUserInfo) {
			this.initData('')
		} else if (option.code) {
			this.initData(option.code)
		} else {
			this.getWxCode()
		}
	},
	onShow() {
		this.userCount()
		if (this.option && !this.isOnLoad) {
			const wxUserInfo = uni.getStorageSync('wxUserInfo')
				// this.initData('')
			if (wxUserInfo) {
				this.initData('')
			} else {
				this.getWxCode()
			}
		}
		
	},
	methods: {
		async initData(wxcode) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			const _self = this
			let wxUserInfo = uni.getStorageSync('wxUserInfo')
			if (wxcode) {
				let infoData = await getUserAllInfo(wxcode);
				wxUserInfo = JSON.parse(infoData.result);
				uni.setStorageSync('wxUserInfo', wxUserInfo)
			}
			
			this.wxUserInfo = wxUserInfo
			
			let user = {
				headImgUrl: wxUserInfo.headImgUrl,
				nickname: wxUserInfo.nickname,
				openId: wxUserInfo.openId,
				sexDesc: wxUserInfo.sexDesc
			};
			const addWechatUserRes = await addWechatUser(user);
			if (addWechatUserRes.code == 0 && addWechatUserRes.result) {
				this.wechatId = addWechatUserRes.result.id
				let params = {
					activityId: this.activityId,
					wechatId: this.wechatId
				};
				let { code, msg, result } = await queryHelpMasterByUserId(params);
				if (code == 0 && result) {
					let ids = {
						activityId: result.activityId,
						helpMasterId: result.id,
						wechatId: result.wechatId
					}
					console.log("储存的本地======"+JSON.stringify(ids));
					uni.setStorageSync('ids', ids);
					let taskId = parseInt(result.taskId);
					if (!isNaN(taskId) && taskId > 0) {
						this.toPath(taskId)
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: `${addWechatUserRes.msg}`
				});
			}
			uni.hideLoading()
		},
		
		getWxCode() {
			const url = `${location.origin}/bluehd/#/`
			location.replace(
				`https://gezi.motivape.cn/auth.html?appid=wx80a7401a02e0f8ec&redirectUri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=gfhd`
			);
		},
		
		selected(index, url) {
			this.selectedIndex = index;
		},
		
		async joinBtn() {
			this.isJoin = true
		},
		closeSelect() {
			this.isJoin = false
		},
		async confirm() {
			// taskId
			let type = this.selectedIndex;
			if (type == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择身份！'
				});
			} else {
				let params = {
					activityId: this.activityId,
					openId: this.wxUserInfo.openId,
					shareUrl: 'string',
					taskId: type,
					wechatId: this.wechatId,
					wechatMasterId: '0'
				};
				// let {code,msg,result} = await queryTaskMasterByActiId(params);
				let succ = await saveHelpMaster(params);
				if (succ.code == 0) {
					let ids = {
						activityId: this.activityId,
						helpMasterId:  succ.result.helpMasterId,
						wechatId: this.wechatId
					}
					uni.setStorageSync('ids', ids);
					this.isJoin = false;
					this.toPath(type)
				} else {
					uni.showToast({
						icon: 'none',
						title: msg
					});
				}
			}
		},
		
		toPath: function (type){
			switch (type) {
				case 1:
					uni.navigateTo({
						url: `/pages/userA/userA`
					});
					break;
				case 2:
					uni.navigateTo({
						url: `/pages/userB/userB`
					});
					break;
				case 3:
					uni.navigateTo({
						url: `/pages/userC/userC`
					});
					break;
			}
		},
		
		buryPoint() {
			var _core = new WCore();
			var _user = new WCore.inputs.User();
			_user.uid = '#';
			var _pv = new WCore.inputs.PV(_user);
			var _event = new WCore.inputs.Event(_pv);
			_event.ec = 'Loginnnnnng';
			_event.ea = 'click';
			_core.send(_event);
		},
		async userCount() {
			const { result } = await userCount()
			this.userCountNum = result.count
		}
	},
};
</script>

<style lang="scss">
.index-content {
	height: 100%;
	display: flex;
	flex-direction: column;

	.btn {
		background: #f93822;
		color: #fff;
		text-align: center;
	}

	.joinBtn {
		line-height: 90upx;
		flex: 0 0 auto;
	}

	.pop-up {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;

		.pop {
			flex: 1 0 auto;
		}

		.pop-content {
			background: #fff;
			padding: 40upx 24upx 30upx;
			text-align: center;
			font-weight: 400;

			.title {
				font-size: 44upx;
				color: #333;
				font-weight: 600;
				line-height: 62upx;
			}

			.tit {
				font-size: 30upx;
				line-height: 42upx;
				margin: 10upx 0 40upx;
			}

			.confirm {
				line-height: 72upx;
				border-radius: 8upx;
			}

			.content-li {
				border-radius: 10upx;
				margin-bottom: 30upx;
				border: 1px solid rgba(51, 51, 51, 0.5);
				text-align: left;
				padding: 29upx 40upx;
				color: #333;

				.content-top {
					font-size: 32upx;
					font-weight: 500;
					line-height: 45upx;
				}

				.content {
					font-size: 26upx;
					line-height: 37px;
				}
			}

			.active {
				background: rgba(249, 56, 34, 1);
				border: none;
				color: #fff;
			}
		}
	}
}
</style>
