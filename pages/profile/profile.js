// pages/profile/profile.js
const applyService = require('../../services/apply.service');
const positionService = require('../../services/position.service');
const companyService=require('../../services/company.service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyList:null,
    nameList:null,
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
getApplyInfoByUserId: async function (id) {
  let data = await applyService.getApplyInfoByUserId(id); //调试时使用默认参数1
  let result=data.getApplyInfoByUserId;
  return result;
},

loadApplyList: async function (id) {
  const result = await this.getApplyInfoByUserId(1); //调试时使用默认参数1  在onready中调用
  //console.log(result);
  this.setData({
    applyList: result
  })
  //console.log("applyList");
  //console.log(this.data.applyList);
},

getPositionIdCompanyname:async function(id)  //由positionId获取职位名和公司名
{
  const resultPosition=await positionService.getPositionById(id);   //测试onready中调用。默认为1
  const resultCompay=await companyService.getCompanyInfoById(resultPosition.getPositionById.company_id);
  let pName_cName=[];
  //console.log(resultCompay);
  pName_cName.push({
    position_name:resultPosition.getPositionById.name,
    company_name:resultCompay.getCompanyInfoById.name});
  this.setData({
    nameList:pName_cName
  })
  //console.log(pName_cName);
  //console.log("position");
  console.log(this.data.nameList);
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
  this.loadApplyList(1);
  this.getPositionIdCompanyname(1);
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