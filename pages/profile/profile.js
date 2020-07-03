// pages/profile/profile.js
const applyService = require('../../services/apply.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyList:null,
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

//用户申请数据
getApplyInfoByUserId: async function () {
  let data = await applyService.getApplyInfoByUserId(1);
  //console.log("pooooo");
  //console.log(data);
  // for (let item of data.getApplyInfoByUerId.list) {
  //   let apply = await applyService.getApplyInfoByUerId(item.user_id);
  //   apply = apply.getApplyInfoByUerId;
  //   result.push({
  //     apply_state:apply.state,
  //     apply_create_time:apply.created_at,
  //     ...item
  //   });
  //let result=data.getApplyInfoByUerId;
  //}
  //result=data.getApplyInfoByUerId;
  console.log(data);
  let result=data.getApplyInfoByUserId;
  //console.log(result);
  console.log(result);
  return result;
},

loadApplyList: async function () {
  const result = await this.getApplyInfoByUserId();
  console.log(result);
  this.setData({
    applyList: result
  })
  console.log("applyList");
  console.log(this.data.applyList);
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
  this.loadApplyList();
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