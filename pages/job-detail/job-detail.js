Page({
  //事件处理函数
  bindTapHome: function() {
    // TODO
    this.onLoad();
  },
  bindTapNews: function() {
    wx.redirectTo({
      url: '../Jobs/jobs',
    })
  },
  bindTapFile: function() {
    wx.redirectTo({
      url: '../profile/profile',
    })
  },
  bindTapMy: function() {
    wx.redirectTo({
      url: '../my/my',
    })
  }
})