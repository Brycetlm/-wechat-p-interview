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
  },

  // setConfirm:function()
  // {
  //   this.setData({
  //     confirm:this.options.confirm
  //   })
  // },

  // rollBack:function(options)
  // {
  //   this.setData({
  //     showView:options.showView
  //   })
    
  // },
//获取简历信息并显示
//用户申请数据
getResumeId: async function (id) {
  let data = await resumeService.getResumeInfoByUserId(id); //调试时使用默认参数1
  let result=data.getResumeInfoByUserId;
  // for(var i=0;i<result.length;i++)
  // {
  //   if(result[i].is_deleted==1)
  //   {
  //     result.splice(i,1);
  //   }
  // }
 
  console.log(result);
  
  this.setData({
    resumeInfo: result
  })
  return result;

},

deleteResume:async function(e)
{
  console.log(e.currentTarget.dataset.reid);
  await resumeService.deleteResume(e.currentTarget.dataset.reid);
  this.onLoad(this.options);
},

confirmResume: async function(e) {
  //console.log(this.data.name, this.data.arrayPay[this.data.indexPay], this.data.arrayWork[this.data.indexWork], this.data.arrayPermission[this.data.indexPermission], this.data.region[0], this.data.region[1], this.data.region[2])
  //console.log(this.options.id);
  // console.log("resumeid");
  // console.log(e);
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
    console.log(options);
    console.log(this.data.showView);
    // var app=getApp();
    // console.log(app.globalData.showBnt);
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