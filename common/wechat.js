// import jweixin from 'jweixin-module'

const jweixin = require('jweixin-module')
import { post } from './request'

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
    initJssdkShare: function(callback, url) {
        //服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
        post(
            'https://fbyc.microchainsoft.cn/index/wechat/getSignPackage',
            {
                url: url
            },
            function(res) {
                // console.log(res)
                if (res.data) {
                    jweixin.config({
                        debug: true,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'getLocation'
                        ]
                    });
                    //配置完成后，再执行分享等功能  
                    if (callback) {
                        callback(res.data);
                    }
                }
        });
    },
    initJssdk:function(callback){
        post('',{},
            function (res) {
                if(res.data){
                    jweixin.config({
                        debug: true,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'getLocation'
                        ]
                    });
                    //配置完成后，再执行分享等功能  
                    if (callback) {
                        callback(res.data);
                    }
                }
            })
    },
    }