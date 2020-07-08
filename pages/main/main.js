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
      url:'http://jyhelper.com/wp-content/uploads/2016/11/af.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2001322426,506825411&fm=26&gp=0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://upload.gongkong.com/Upload/gongkong/baiduEditorImage/201809/04/8fc56bd6c6fd4f5487420c0787337cee_w.jpg'
    }],
    jobsList: null,
    name: 'loading...',
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


    try {
      let url = await updateService.getAvatar('sa');
      let name = await updateService.getName('sa');
      console.log(url);
      console.log(name);
      //console.log("main:",url);
      this.setData({
        img: url,
        name: name,
      })
    } catch (e) {
      console.log('exception!:', e)
    }


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
        let companyInfo=await companyService.getCompanyInfoById(temp[0].company_id);
        companyInfo=companyInfo.getCompanyInfoById;
        //console.log(companyInfo);
        let url = companyInfo.logo_url;
       
        //console.log("main:",url);
        // this.setData({

        //   name: temp[0].company_name,
        // })
        //console.log(url);


      //console.log(temp);
      jobsInfo.push({
        logo_url:url,
        id:count,
        ...temp[0]
      })
      console.log(jobsInfo);
      showCount=showCount+1;
       }
       this.setData({
        jobsList:this.format(jobsInfo)
      })
      //console.log(this.data.jobsList);
       count=count+1;
    }
    if(showCount==0)
    {
      this.loadDefaultJobsList();
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