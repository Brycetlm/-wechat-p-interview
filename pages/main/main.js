// pages/main/main.js
const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');
const updateService = require('../../services/update.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
    jobsList: null,
    name: '孙剑桥',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    try {
      this.loadDefaultJobsList();
      let url = await updateService.getAvatar('sa');
      let name = await updateService.getName('sa');
      console.log("main:",url);
      this.setData({
        img: url,
        name: name,
      })
    } catch (e) {
      console.log('exception!:', e)
    }

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
    console.log("dataset");
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../job-detail/job-detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindTapHome: function () {
    // TODO
    this.onLoad();
  },
  bindTapNews: function () {
    wx.redirectTo({
      url: '../Jobs/jobs',
    })
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