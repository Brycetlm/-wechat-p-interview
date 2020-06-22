//logs.js
const util = require('../../utils/util.js')

var gql = require('../../graphql/wxgql.js');
var GraphQL = gql.GraphQL;

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

    // 初始化对象
    let gql = GraphQL({
      url: 'http://localhost:3000/graphql' // url必填 
    }, true); //第二个参数的true代表是否使用对象方法，如gql.query或gql.mutate，默认是函数方法，如gql({body: {query: '', variables: {}}})，建议写true，为true时可以使用promise

    gql.query({
      query: `query ($id: Int!) {
    getName(id: $id)
}`,
      variables: {
        id: 1
      }
    }).then(function (res) {
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });
  }
})