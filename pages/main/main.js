// pages/main/main.js
const jobsService = require('../../services/jobs.service');
const companyService = require('../../services/company.service');
const updateService = require('../../services/update.service');
const recommendService = require('recommend');
const positionService = require('../../services/position.service');

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
  onLoad: async function (options) {
    
    //recommendService.match();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    var positionNumber=10;   //对比position的数量

    //规范position查询数量，以免超过数据库position数量
    let number=await positionService.countPosition();
    number=number.countPosition;
    if(positionNumber>number){positionNumber=number;}

   
    //推荐信息
    var count=1;
    var showCount=0;
    let jobsInfo=[];
    while(count<positionNumber)  //搜索数据库中的10个职位推荐 可设置  最后这些设置都应该被放到globaldata里
    {
      
      //console.log(recommendService.match(count));
      var temp=await recommendService.match(count);
      if(temp!=0)
      {
      //console.log(temp);
      jobsInfo.push({
        ...temp[0]
      })
      //console.log(jobsInfo);
      showCount=showCount+1;
       }
       this.setData({
        jobsList:jobsInfo,
      })
      //console.log(this.data.jobsList);
       count=count+1;
    }
    if(showCount==0)
    {
      this.loadDefaultJobsList();
    }
    try {
      
      let url = await updateService.getAvatar('sa');
      let name = await updateService.getName('sa');
      //console.log("main:",url);
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
    //console.log(data);
    let result = [];
    //for (let item of data.getDefaultPositions.list) {
      var positionInfo=data.getDefaultPositions.list[0];
      let company = await companyService.getCompanyInfoById(positionInfo.company_id);
      company = company.getCompanyInfoById;
      console.log(company);
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
        name:positionInfo.name,
        updated_at:positionInfo.updated_at,
        id:positionInfo.id,
        //...item
      });
    //}
    return result;
  },

  loadDefaultJobsList: async function () {
    const result = await this.getDefaultJobsData();
    console.log(result);
    this.setData({
      jobsList: result,
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