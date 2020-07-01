// pages/profile/process.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicsList: [{
      icon: 'usefullfill',
      name: '已投递'
    }, {
      icon: 'radioboxfill',
      name: '开始审核'
    }, {
      icon: 'roundclosefill',
      name: '审核中'
    }, {
      icon: 'roundcheckfill',
      name: '完成审核'
    }, ],
    basics: 0,
    numList: [{
      name: '已投递'
    }, {
      name: '开始审核'
    }, {
      name: '审核中'
    }, {
      name: '完成审核'
    }, ],
    num: 0,
    scroll: 0
  },
  basicsSteps() {
    this.setData({
      basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
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

  }
})