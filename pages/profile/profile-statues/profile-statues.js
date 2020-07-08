// pages/profile/profile-statues/profile-statues.js
const resumeService=require('../../../services/resume.service');
const applyService=require('../../../services/apply.service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeInfo:null,
    confirm:"确定",
    resumeId:1,
    showView:+1,
    modalName:null,
    deleteid:null,
  },

 
//获取简历信息并显示
//用户申请数据
getResumeId: async function (id) {
  let data = await resumeService.getResumeInfoByUserId(id); 
  let result=data.getResumeInfoByUserId;
  
  console.log(result);
  
  this.setData({
    resumeInfo: result,
  })
  return result;

},

getid:function(e)
{
  this.setData({
    deleteid: e.currentTarget.dataset.reid,
  })
  
  console.log(e.currentTarget.dataset.reid);
},

navigator:function()
{
  wx.navigateTo({
    url: '../form/form',
  })
},

deleteResume:async function(e)
{
  this.setData({
    modalName: null
  })
  //console.log(e.currentTarget.dataset.reid);
  await resumeService.deleteResume(this.data.deleteid);
  this.onLoad(this.options);
},

showModal(e) {
  this.setData({
    modalName: e.currentTarget.dataset.target
  })
},

hideModal(e) {
  this.setData({
    modalName: null
  })
},
confirmResume: async function(e) {
 
  this.setData({
    resumeId:e.currentTarget.dataset.reid,
  })
  let result = await applyService.insertApply({
    user_id: 1,
    position_id:+this.options.id,
    resume_id:+this.data.resumeId,
  });
  console.log(this.data.resumeId);
  wx.navigateBack();
},

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      showView:+options.showView,
    })
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
  //this.rollBack();
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