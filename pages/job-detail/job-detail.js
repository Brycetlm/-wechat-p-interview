const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');

Page({
  //事件处理函数
  data: {
    jobInfo: null,
    job:null,
  },

  onToStatues:function(e)
  {
    // console.log("da id");
    // console.log(this.data.job.id);
    wx.navigateTo({
      url: '../profile/profile-statues/profile-statues?id='+this.data.job.id+'&showView=1',
    })
  },

  bindTapHome: function () {
    // TODO
    this.onLoad();
  },
  onLoad: async function (options) {
    // console.log(options.id);
    let job = await this.getJobInfoById(options.id);
    this.setData({
      jobInfo: job,
    });
  },
  getJobInfoById: async function (jobId) {
    let job = await jobsService.getJobById(jobId);
    job = job.getPositionById;
    this.setData({
      job:job,
    })
    // console.log("jb");
    // console.log(job);
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