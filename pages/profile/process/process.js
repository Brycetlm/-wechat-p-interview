// pages/profile/process.js

const applyService = require('../../../services/apply.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  //   basicsList: [{
  //     icon: 'usefullfill',
  //     name: '已投递'
  //   }, {
  //     icon: 'radioboxfill',
  //     name: '审核中'
  //   }, {
  //     icon: 'roundclosefill',
  //     name: '未通过'
  //   },
  //   {
  //     icon: 'roundcheckfill',
  //     name: '通过'
  //   },  
  //  ],
  basicsList:null,
  applyList:null,
  basics: 0,  //-1 已投递
  scroll: 0,
  withDraw:null,
  },

  // basicsSteps() {
  //   this.setData({
  //     basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
  //   })
  // },

  
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    if(this.data.applyList[0].state!="POST")
    {
      this.setData({
        withDraw:"撤销失败，已开始审核"
      })
    }
    else {
      this.setData({
        withDraw:"撤销成功！"
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
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
  // console.log(this.data.applyList);
},

changeResult()
  {
    
    //
    // console.log("test");
    // console.log(this.data.applyList);
    // console.log((this.data.applyList[0].id));
    //if(this.data.applyList[0].id==1)
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
    
    // console.log("name");
    // console.log(this.data.applyList);
    // console.log(this.data.applyList.name);
    // console.log(this.data.basicsList);
    // console.log(this.data.basicsList[0].name);
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