//logs.js
const util = require('../../utils/util.js');
const logsService = require('../../services/logs.service');

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  gqlTest: function () {
    logsService.getLogTest().then(res => {
      console.log("展现层：", res)
    }).catch(error => {
      console.log(error);
    })
//     // 初始化对象
    

//     gql.query({
//       query: `query ($id: Int!) {
//     getName(id: $id)
// }`,
//       variables: {
//         id: 1
//       }
//     }).then(function (res) {
//       console.log(res);
//     }).catch(function (error) {
//       console.log(error);
//     });
//   }
  }
})