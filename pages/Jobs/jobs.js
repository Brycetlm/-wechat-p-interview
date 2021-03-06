// pages/Jobs/jobs.js

const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');
const favorService = require('../../services/favor.service');
const logservice = require('../../services/logs.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    isOrderShowed: false,
    ascOrder: false,
    arrayOrder: [{
      value: 'UPDATED_AT',
      name: '时间',
      checked: false,
    }, {
      value: 'SALARY_MIN',
      name: '最小工资',
      checked: false
    }, {
      value: 'SALARY_MAX',
      name: '最大工资',
      checked: false
    }],
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
    filterInput: {},
    skip: 0,
    take: 5,
    isCollected: [],
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

  collect: async function (e) {
    console.log(e.currentTarget);
    let index = e.currentTarget.dataset.id;
    let target = 'isCollected[' + index + ']';
    this.setData({
      [target]: true
    })
    console.log('joblist:', this.data.jobsList);
    console.log('cid:', this.data.jobsList[index].id);
    let position_id = this.data.jobsList[index].id;
    let user_id = await logservice.bindOpenId('sa');
    console.log('uid:', user_id.bindOpenId);
    console.log("pid:", position_id);
    let result = await favorService.insertFavor({
      user_id: user_id.bindOpenId,
      position_id: position_id
    })
    console.log('result:', result);

    if (result) {
      wx.showModal({
        content: '收藏成功',
        showCancel: false,
      })
    } else {
      wx.showModal({
        content: '收藏失败',
        showCancel: false,
      })
    }

  },

  cancel: async function (e) {
    let index = e.currentTarget.dataset.id;
    console.log(index);
    let target = 'isCollected[' + index + ']';
    this.setData({
      [target]: false
    })

    let position_id = this.data.jobsList[index].id;
    console.log('pos:', position_id);
    let user = await logservice.bindOpenId('sa');
    let user_id = user.bindOpenId;
    console.log('user',user);
    let result = await favorService.deleteFavor(position_id, user_id);
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

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindPayChange: function (e) {
    this.setData({
      indexPay: e.detail.value
    })
  },

  ChooseCheckbox: function (e) {
    console.log(e);
    let state = !this.data.checkbox[e.currentTarget.dataset.index].checked;
    this.setData({
      ['checkbox[' + e.currentTarget.dataset.index + '].checked']: state,
    })
    console.log('checkbox[' + e.currentTarget.dataset.index + '].checked set to ' + state);
  },

  getJobsDetail: async function (data) {
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

  getFilteredJobsData: async function (searchInput, filterInput, skip, take) {
    let data = await jobsService.searchFilteredPositions(searchInput, filterInput, skip, take);
    return await this.getJobsDetail(data.searchFilteredPositions);
  },

  loadDefaultJobsList: async function () {
    const result = await this.getDefaultJobsData();
    this.setData({
      jobsList: this.format(result)
    })
  },

  format: function(data) {
    for (let item of data) {
      let date = new Date(item.updated_at);
      let formattedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      item.updated_at = formattedDate;
    }
    return data;
  },

  loadFilteredJobsList: async function (searchInput, filterInput, skip, take) {
    const result = await this.getFilteredJobsData(searchInput, filterInput, skip, take);
    this.setData({
      jobsList: this.format(result)
    });
  },

  search: async function (e) {
    this.setData({
      searchInput: e.detail.value
    });
    this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
  },

  filter: async function (e) {
    let tags = [];
    for (let item of this.data.checkbox) {
      if (item.checked) {
        tags.push(item.name);
      }
    }
    console.log(this.data.indexPay);
    this.setData({
      filterInput: {
        salary_min: this.data.indexPay ? this.data.dataPay[this.data.indexPay][0] * 1000 : null,
        salary_max: this.data.indexPay ? this.data.dataPay[this.data.indexPay][1] * 1000 : null,
        province: this.data.region[0],
        city: this.data.region[1],
        region: this.data.region[2],
        tag: tags.length ? tags : null
      }
    });
    try {
      this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
      this.hideModal();
    } catch(err) {
      console.log(err);
      wx.showModal({
        content: '筛选失败！',
        showCancel: false,
      })
    }
  },

  showOrder: function() {
    this.setData({
      isOrderShowed: !this.data.isOrderShowed
    });
  },

  clearOrder: function() {
    for (let index in this.data.arrayOrder) {
      if (this.data.arrayOrder[index].checked) {
        this.setData({
          ["arrayOrder[" + index + "].checked"]: false
        });
      }
    }
  },

  switchOrder: function() {
    this.setData({
      ascOrder: !this.data.ascOrder
    });
    this.setData({
      ["filterInput.order"]: this.data.ascOrder ? 'ASC' : 'DESC'
    });
    this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
  },

  selectOrder: function(e) {
    this.clearOrder();
    console.log(e);
    this.setData({
      ["arrayOrder[" + e.currentTarget.dataset.index + "].checked"]: true
    });
    this.setData({
      ["filterInput.order_by"]: this.data.arrayOrder[e.currentTarget.dataset.index].value
    });
    this.loadFilteredJobsList(this.data.searchInput, this.data.filterInput, this.data.skip, this.data.take);
    this.showOrder();
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
  TapCollection: function () {
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