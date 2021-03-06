// pages/profile/form.js
const resumeService = require('../../../services/resume.service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['本科', '大专', '硕士', '博士', '高中'],
    arrayPay:['2k-3k','3k-5k','5k-8k','8k-12k','12k-16k','大于16k',],
    arrayWork:['无经验','一年以内','2-3年','3-4年','4年以上',],
    dataPay: [[2, 3], [3, 5], [5, 8], [8, 12], [12, 16], [16, -1]],
    arrayPermission: ['公开', '私有'],
    dataPermission: ['PUBLIC', 'PRIVATE'],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    permission: '公开',
    name: ''
  },
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindNameChange: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindPermissionChange: function(e) {
    this.setData({
      indexPermission: e.detail.value
    })
  },
  
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindArrChange: function(e) {
    this.setData({
      indexTitle: e.detail.value
    })
  },

bindPayChange: function(e) {
    
  this.setData({
      indexPay: e.detail.value
  })
},
bindWorkChange: function(e) {
    
  this.setData({
      indexWork: e.detail.value
  })
},

submitResume: async function() {
  //console.log(this.data.name, this.data.arrayPay[this.data.indexPay], this.data.arrayWork[this.data.indexWork], this.data.arrayPermission[this.data.indexPermission], this.data.region[0], this.data.region[1], this.data.region[2])
  let result = await resumeService.updateResumeInfo({
    name: this.data.name,
    user_id: 1,
    salary_min: this.data.dataPay[this.data.indexPay][0] * 1000,
    salary_max: this.data.dataPay[this.data.indexPay][1] * 1000,
    province: this.data.region[0],
    city: this.data.region[1],
    region: this.data.region[2],
    permission: this.data.dataPermission[this.data.indexPermission],
    exp: +this.data.indexWork
  });
  wx.navigateBack();
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