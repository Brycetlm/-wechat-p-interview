const gql = require('./common');

const GET_NAME = `
query ($id: Int!) {
  getName(id: $id)
}
`;

const BIND_OPENID = `
query($openId: String!){
  bindOpenId(openId:$openId)
 
}
`
const bindOpenId = function(openId) {
  return gql.getGqlObject().query({
    query:  BIND_OPENID,
    variables: {
      openId: openId
    }
  });
}
//console.log(bindOpenId("sa"));


const gqlLogsTest = function () {
  return gql.getGqlObject().query({
    query: GET_NAME,
    variables: {
      id: 1
    }
  })
}

module.exports = {
  gqlLogsTest: gqlLogsTest,
  bindOpenId: bindOpenId
}