// import jweixin from 'jweixin-module'
import config from './config.js'
const jweixin = require('jweixin-module')
import {
	request
} from './request'

export default {
	//判断是否在微信中  
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			// console.log(‘是微信客户端‘)
			return true;
		} else {
			// console.log(‘不是微信客户端‘)
			return false;
		}
	},
        //初始化sdk配置  
    initJssdk:function(callback ,url){  
		//服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
		console.log('initJssdk', url);
		let urls = encodeURIComponent(url)
		uni.request({
			url:`${config.host}/open/pub/wechat/jsapi/jssdk2?url=${urls}`,
			method:'GET',
			success:function(res){
				console.log(JSON.stringify(res) )
				if(res.data){
					console.log("分享签名"+JSON.stringify(res))
					let shareSgin = JSON.parse(res.data.result)
					console.log("个事转化"+JSON.stringify(shareSgin))
				    jweixin.config({  
				         debug: true,  
				         appId: shareSgin.appId,  
				         timestamp:shareSgin.timestamp,  
				         nonceStr: shareSgin.nonceStr,  
				         signature:shareSgin.signature,  
				         jsApiList: [  
				             'checkJsApi',  
				             'onMenuShareTimeline',  
				             'onMenuShareAppMessage'  
				         ]  
				    });  
				    //配置完成后，再执行分享等功能  
				    if(callback){  
				        callback(shareSgin);  
				    }  
				}  
			}
		})
  //       request({
		// 	url: '/open/pub/wechat/jsapi/jssdk',
		// 	methods: 'POST',
		// 	contentType: 'application/json',
		// 	data: {
		// 		url: encodeURIComponent(`${url}`)
		// 		// url:'https://hnhd.motivape.cn'
		// 	}
		// }).then((res) => {
		// 	if(res.data){
		// 		console.log("分享签名"+JSON.stringify(res))
		// 		let shareSgin = JSON.parse(res.data.result)
		// 		console.log("个事转化"+JSON.stringify(shareSgin))
		// 	    jweixin.config({  
		// 	         debug: true,  
		// 	         appId: shareSgin.appId,  
		// 	         timestamp:shareSgin.timestamp,  
		// 	         nonceStr: shareSgin.nonceStr,  
		// 	         signature:shareSgin.signature,  
		// 	         jsApiList: [  
		// 	             'checkJsApi',  
		// 	             'onMenuShareTimeline',  
		// 	             'onMenuShareAppMessage'  
		// 	         ]  
		// 	    });  
		// 	    //配置完成后，再执行分享等功能  
		// 	    if(callback){  
		// 	        callback(shareSgin);  
		// 	    }  
		// 	}  
		// })
    },  
        //在需要自定义分享的页面中调用  
    share:function(data ,url){  
        url =url ? url :window.location.href;  
        if(!this.isWechat()){  
            return ;  
        }  
		//每次都需要重新初始化配置，才可以进行分享  
        this.initJssdk(function(signData){ 
            jweixin.ready(function(){    
                var shareData = {  
                     title: data&&data.title ? data.title: signData.site_name,  
                     desc: data&&data.desc ? data.desc: signData.site_description,  
                     link: url,  
                     imgUrl: data&&data.img ?data.img :signData.site_logo,  
                     success: function (res) {  
                                                 //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的  
                        request.post('/api/member/share');  
                     },  
                     cancel: function (res) {  
                     }  
                 };  
                 //分享给朋友接口  
                 jweixin.onMenuShareAppMessage(shareData);  
                 //分享到朋友圈接口  
                 jweixin.onMenuShareTimeline(shareData);  
            });  
        } ,url);  
    } 
}