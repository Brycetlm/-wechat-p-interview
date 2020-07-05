// pages/collection/collection.js
const favorService = require('../../services/favor.service');
const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');
const LogsService = require('../../services/logs.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList: null,
    isCollected: [false],
  },

  //自定义函数
  detail: function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../job-detail/job-detail?id=' + e.currentTarget.dataset.id,
    })
  },

  loadFavorList: async function () {
    let user = await LogsService.bindOpenId('sa');
    let userId = parseInt(user.bindOpenId);
    console.log('id', userId);
    let favorList = await favorService.getFavorDel(userId);
    console.log('fav', favorList);
    let result = []
    console.log('favorlist', favorList);
    for (let item of favorList.getFavorDel.list) {
      console.log('positionid:', item.position_id);
      let job = await jobsService.getJobById(item.position_id);
      console.log('job:', job);
      let company = await companyService.getCompanyInfoById(job.getPositionById.company_id);
      console.log('company:', company);
      company = company.getCompanyInfoById;
      result.push({
        position_id: job.getPositionById.id,
        company_name: company.name,
        company_profile: company.profile,
        province: company.province,
        city: company.city,
        region: company.region,
        assets: company.assets,
        birthday: company.birthday,
        phone: company.phone,
        logo_url: company.logo_url,
        name: job.getPositionById.name,
        created_at: job.getPositionById.created_at,
        updated_at: job.getPositionById.updated_at
      });
    }
    this.setData({
      favorList: result
    })
  },

  cancel: async function (e) {
    let index = e.currentTarget.dataset.id;

    console.log('favorlist:', this.data.favorList);
    let position_id = this.data.favorList[index].position_id;
    let user = await LogsService.bindOpenId('sa');
    let user_id = user.bindOpenId;
    let result = await favorService.deleteFavor(position_id, user_id);
    this.loadFavorList();
    if (result) {
      wx.showModal({
        content: '取消收藏成功',
        showCancel: false,
      })
    } else {
      wx.showModal({
        content: '取消收藏失败',
        showCancel: false,
      })
    }
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
    this.loadFavorList();
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