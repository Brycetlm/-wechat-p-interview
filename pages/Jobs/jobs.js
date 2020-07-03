// pages/Jobs/jobs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    checkbox: [{
      value: 0,
      name: '条件1',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '条件2',
      checked: true,
      hot: false,
    }, {
      value: 2,
      name: '条件3',
      checked: true,
      hot: true,
    }, {
      value: 3,
      name: '条件4',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '条件5',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '条件6',
      checked: false,
      hot: false,
    }]
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
  detail: function() {
    wx.navigateTo({
      url: '../job-detail/job-detail',
    })
  },
  showModal: function(e) {
    this.setData({
      modalName: "FilterModal"
    });
  },
  hideModal: function() {
    this.setData({
      modalName: null
    })
  },
  chooseCheckbox: function() {

  },
  bindTapHome: function() {
    // TODO
    wx.redirectTo({
      url: '../main/main',
    })
  },
  bindTapNews: function() {
    this.onLoad();
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