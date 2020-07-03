//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // var Params = {
        //   code: res.code, //临时登录凭证
        //   //key: self.globalData.MD5Key
        // };
        var code=res.code;
        console.log(code);
        var appId=wx.getAccountInfoSync().miniProgram.appId;
        var secret=wx.getAccountInfoSync().miniProgram.secret;
      if (code) {
        //var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc6da604aaa087a32&secret=7e1af99f77f198e2cd473bc9bf26ebb1&js_code=' + code + '&grant_type=authorization_code';
        var url='https://api.weixin.qq.com/sns/jscode2session?appid'+appId+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
        wx.request({
          url: url,
          //method: 'GET',
          data:{},
          header:{
            'content-type':'json'
          },
          success: res => {
            this.globalData.openid = res.data.openid;
            var openid=res.data.openid;
            console.log("ppp");
            console.log(openid);
            console.log(res.data.openid);
            console.log(this.globalData.openid);
          }
        });
      }
      }
    })



    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获得系统信息：导航栏
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  }
})