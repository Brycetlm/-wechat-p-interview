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
    dataPay: [[2,3],[3,5],[5,8],[8,12],[12,16],[16,-1]],
    region: ['广东省', '广州市', '海珠区'],
    checkbox: [{
      value: 0,
      name: '游戏',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '信息安全',
      checked: false,
      hot: false,
    }, {
      value: 2,
      name: '移动互联网',
      checked: false,
      hot: true,
    }, {
      value: 3,
      name: '互联网',
      checked: false,
      hot: false,
    }, {
      value: 4,
      name: '计算机软件',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '其他行业',
      checked: false,
      hot: false,
    }],
    jobsList: null,
    searchInput: "",
    filterInput: null,
    skip: 0,
    take: 5
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

  ChooseCheckbox: function(e) {
    console.log(e);
    let state = !this.data.checkbox[e.currentTarget.dataset.index].checked;
    this.setData({
      ['checkbox[' + e.currentTarget.dataset.index + '].checked']: state,
    })
  },

  getJobsDetail: async function(data) {
    let result = [];
    for (let item of data.list) {
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

  getDefaultJobsData: async function () {
    let data = await jobsService.getDefaultJobsList();
    return await this.getJobsDetail(data.getDefaultPositions);
  },

  getFilteredJobsData: async function(searchInput, filterInput, skip, take) {
    let data = await jobsService.searchFilteredPositions(searchInput, filterInput, skip, take);
    return await this.getJobsDetail(data.searchFilteredPositions);
  },

  loadDefaultJobsList: async function () {
    const result = await this.getDefaultJobsData();
    this.setData({
      jobsList: result
    })
  },

  loadFilteredJobsList: async function(searchInput, filterInput, skip, take) {
    const result = await this.getFilteredJobsData(searchInput, filterInput, skip, take);
    this.setData({
      jobsList: result
    });
  },

  search: async function(e) {
    this.setData({
      searchInput: e.detail.value
    });
    this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
  },

  filter: async function(e) {
    let tags = [];
    for (let item of this.data.checkbox) {
      if (item.checked) {
        tags.push(item.name);
      }
    }
    this.setData({
      filterInput: {
        salary_min: this.data.indexPay !== -1 ? this.data.dataPay[this.data.indexPay][0] * 1000: null,
        salary_max: this.data.indexPay !== -1 ? this.data.dataPay[this.data.indexPay][1] * 1000: null,
        province: this.data.region[0],
        city: this.data.region[1],
        region: this.data.region[2],
        tag: tags == [] ? tags : null
      }
    });
    this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
    this.hideModal();
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
  TapCollection: function() {
    wx.navigateTo({
      url: '../collection/collection',
    })
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