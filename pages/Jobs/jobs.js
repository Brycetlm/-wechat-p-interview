// pages/Jobs/jobs.js

const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    arrayPay:['2k-3k','3k-5k','5k-8k','8k-12k','12k-16k','大于16k',],
    region: ['广东省', '广州市', '海珠区'],
    checkbox: [{
      value: 0,
      name: '条件1',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '条件2',
      checked: true,
      hot: false,
    }, {
      value: 2,
      name: '条件3',
      checked: true,
      hot: true,
    }, {
      value: 3,
      name: '条件4',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '条件5',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '条件6',
      checked: false,
      hot: false,
    }],
    jobsList: null,
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
    this.loadDefaultJobsList();
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

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindPayChange: function(e) {
    this.setData({
        indexPay: e.detail.value
    })
  },

  getDefaultJobsData: async function () {
    let data = await jobsService.getDefaultJobsList();
    let result = [];
    for (let item of data.getDefaultPositions.list) {
      let company = await companyService.getCompanyInfoById(item.company_id);
      company = company.getCompanyInfoById;
      result.push({
        company_name: company.name,
        company_profile: company.profile,
        province: company.province,
        city: company.city,
        region: company.region,
        assets: company.assets,
        birthday: company.birthday,
        phone: company.phone,
        logo_url: company.logo_url,
        ...item
      });
    }
    return result;
  },

  loadDefaultJobsList: async function () {
    const result = await this.getDefaultJobsData();
    this.setData({
      jobsList: result
    })
  },

  detail: function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../job-detail/job-detail?id=' + e.currentTarget.dataset.id,
    })
  },
  showModal: function (e) {
    this.setData({
      modalName: "FilterModal"
    });
  },
  hideModal: function () {
    this.setData({
      modalName: null
    })
  },
  chooseCheckbox: function () {

  },
  bindTapHome: function () {
    // TODO
    wx.redirectTo({
      url: '../main/main',
    })
  },
  bindTapNews: function () {
    this.onLoad();
  },
  bindTapFile: function () {
    wx.redirectTo({
      url: '../profile/profile',
    })
  },
  bindTapMy: function () {
    wx.redirectTo({
      url: '../my/my',
    })
  }
})