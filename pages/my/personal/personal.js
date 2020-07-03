// pages/my/personal/personal.js
const app = getApp();
const userService = require('../../../services/user.service');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    img: '',
    name: '',
    index: null,
    indexGender: null,
    date: '2020-7-11',
    picker: ['初中', '高中', '专科', '本科', '硕士', '博士'],
    gender: ['男', '女'],
    mail: '',
    phone: '',
    region: ['北京市', '北京市', '东城区'],
  },

  //自定义函数
  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputMail(e) {
    this.setData({
      mail: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          img: res.tempFilePaths
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '亲爱的用户',
      content: '确定要删除这张头像吗？',
      cancelText: '等等',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  GenderChange(e) {
    console.log(e);
    this.setData({
      indexGender: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  //后端接口函数
  Save: async function () {
    let name = this.data.name;
    let avatar = this.data.img;
    let gender = this.data.gender[this.data.indexGender];
    let birth = this.data.date;
    let edu = this.data.picker[this.data.index];
    let mail = this.data.mail;
    let phone = this.data.phone;
    let province = this.data.region[0];
    let city = this.data.region[1];
    let region = this.data.region[2];
    const result = await userService.updateUserInfo({
      name: name,
      birthday: birth,
      education: edu,
      province: province,
      city: city,
      region: region,
      email: mail,
      phone,
      phone,
      avatar_url: avatar
    }, 1)

    return result;
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