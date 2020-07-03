const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');

Page({
  //事件处理函数
  data: {
    jobInfo: null,
  },
  bindTapHome: function () {
    // TODO
    this.onLoad();
  },
  onLoad: async function (options) {
    let job = await this.getJobInfoById(options.id);
    this.setData({
      jobInfo: job,
    });
  },
  getJobInfoById: async function (jobId) {
    let job = await jobsService.getJobById(jobId);
    job = job.getPositionById;
    let company = await companyService.getCompanyInfoById(job.company_id);
    company = company.getCompanyInfoById;
    return {
      company_name: company.name,
      company_profile: company.profile,
      province: company.province,
      city: company.city,
      region: company.region,
      assets: company.assets,
      birthday: company.birthday,
      phone: company.phone,
      corporate: company.corporate,
      logo_url: company.logo_url,
      ...job
    };
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