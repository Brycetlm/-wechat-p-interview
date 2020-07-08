// pages/profile/process.js

const applyService = require('../../../services/apply.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  basicsList:null,
  applyList:null,
  basics: 0,  //-1 已投递
  scroll: 0,
  withDraw:null,
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
  
  setStatue:async function(e)
  {
    let state=e.currentTarget.dataset.state;
    console.log(e.currentTarget.dataset.state);
    if(state!="POST")
    {
      this.setData({
        withDraw:"撤销失败，已开始审核或审核完成"
      })
    }
    else {
      applyService.deleteApply(e.currentTarget.dataset.applyid);  //给的测试applyid 1
      this.setData({
        withDraw:"撤销成功！"
      })
    }
  },

//申请状态获取
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
  // console.log("applyList");
  console.log(this.data.applyList);
},

changeResult()
  {
    
    this.setData(
      {
        basicsList:[{
          icon: 'usefullfill',
          name: '已投递'
        }, {
          icon: 'radioboxfill',
          name: '审核中'
        }, 
        {
          icon: 'roundcheckfill',
          name: '通过'
        }
        ]
      }
    )
    
   
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadApplyList(1);     //这里有个注意点就是要把这个函数放在onload里，不能放在onread不然就会导致后面获取不到数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.changeResult();   
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