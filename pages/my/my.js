// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    text_surname: "孙",
    text_name: "孙剑桥",
    text_version: "软酷网 | Aondroid/Java",
    text1_1: "个人资料",
    text1_2: "投递记录",
    text1_3: "收藏",
    text1_4: "联系我们",
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
  btn1: function() {
    wx.navigateTo({
      url: './personal/personal',
    })
  },
  btn2: function() {
    
  },
  btn3: function() {
    
  },
  btn4: function() {
    
  },

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
    wx.redirectTo({
      url: '../profile/profile',
    })
  },
  bindTapMy: function() {
    this.onLoad();
  }
})