// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

onToForm:function(param)
{
  wx.navigateTo({
    url: '/pages/profile/form/form',
  })
},

onToProcess:function(param)
{
  wx.navigateTo({
    url: '/pages/profile/process/process',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //事件处理函数
  bindTapHome: function() {
    // TODO
    wx.redirectTo({
      url: '../main/main',
    })
  },
  bindTapNews: function() {
    wx.redirectTo({
      url: '../Jobs/jobs',
    })
  },
  bindTapFile: function() {
    this.onLoad();
  },
  bindTapMy: function() {
    wx.redirectTo({
      url: '../my/my',
    })
  }
})