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
    names:[],
    
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
  const result = await this.getApplyInfoByUserId(1);   //调试时使用默认参数1  在onready中调用
  console.log(result);

  
  for(var i=0;i<result.length;i++)
  {
   
    if(result[i].state=="ACCEPT"){result[i].state="已通过";}
    if(result[i].state=="POST"){result[i].state="已投递";}
    if(result[i].state=="REJECT"){result[i].state="已拒绝";}
    if(result[i].state=="REVISION"){result[i].state="审核中";}
  }
  this.setData({
    applyList: this.format(result),
  })
  this.getPositionIdCompanyname(result.length);
},

format: function(data) {
  for (let item of data) {
    let date = new Date(item.created_at);
    let formattedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    item.created_at = formattedDate;
    //console.log(item.created_at);
  }
  
  return data;
},

// loadApplyList: async function (id) {
//   const result = await this.getApplyInfoByUserId(1);   //调试时使用默认参数1  在onready中调用
//   console.log(result);

//   for(var i=0;i<result.length;i++)
//   {
//    
//     if(result[i].state=="ACCEPT"){result[i].state="已通过";}
//     if(result[i].state=="POST"){result[i].state="已投递";}
//     if(result[i].state=="REJECT"){result[i].state="已拒绝";}
//     if(result[i].state=="REVISION"){result[i].state="审核中";}
//   }
  
//   this.setData({
//     applyList: result
//   })
  
// },

// changeStatue: function (e) {
//   console.log(e.currentTarget.dataset);
//   //if(e.currentTarget.dataset.id)
 
// },
 
getPositionIdCompanyname:async function(infolength)  //由positionId获取职位名和公司名
{
  let inii=[];
  for(var i=1;i<=infolength;i++)
  {
    //console.log(this.data.applyList);
    //console.log(this.data.applyList[i-1].is_deleted);
    if(this.data.applyList[i-1].is_deleted==1){i++;}
    let resultPosition=await positionService.getPositionById(i);   
    resultPosition=resultPosition.getPositionById;
    let resultCompay=await companyService.getCompanyInfoById(resultPosition.company_id);

    inii.push(
      {
        position_name:resultPosition.name,
        company_name:resultCompay.getCompanyInfoById.name
      }
    )
  }
  //console.log(id);
 
  //console.log(resultPosition);
 
  
  //console.log(resultCompay);
  this.setData({
    names:inii,
   
  })
  // this.data.names.push({
  //   position_name:resultPosition.name,
  //   company_name:resultCompay.getCompanyInfoById.name
  // });
  // this.setData({
  //   nameList({
  //     position_name:resultPosition.name,
  //     company_name:resultCompay.getCompanyInfoById.name
  //   })
    
  // })
  
  //console.log(pName_cName);
  //console.log("position");
  console.log(this.data.names);
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