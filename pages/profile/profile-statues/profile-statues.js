// pages/profile/profile-statues/profile-statues.js
const resumeService=require('../../../services/resume.service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeInfo:null,
  },

//获取简历信息并显示
//用户申请数据
getResumeId: async function (id) {
  let data = await resumeService.getResumeInfoByUserId(id); //调试时使用默认参数1
  let result=data.getResumeInfoByUserId;
  this.setData({
    resumeInfo: result
  })
  console.log("resumeInfo");
  console.log(this.data.resumeInfo);
  console.log("ppdp");
  return result;

},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResumeId(1);
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