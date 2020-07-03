const gql = require('./common');

const GET_APPLY_INFO_BY_ID = `
query ($userId: Int!) {
  getApplyInfoById(userId: $userId) {
   state,
   create_at,
  }
}
`


const getApplyInfoById = function(userId) {
  return gql.getGqlObject().query({
    query: GET_APPLY_INFO_BY_ID,
    variables: {
      userId: userId
    }
  });
}

const GET_APPLY_INFO_BY_USER_ID = `
query ($userId: Int!) {
  getApplyInfoByUserId(userId: $userId) {
   id,
   created_at,
    state,
  }
}
`
 const getApplyInfoByUserId = function(userId) {
  return gql.getGqlObject().query({
    query: GET_APPLY_INFO_BY_USER_ID,
    variables: {
      userId: userId
    }
  });
}
//console.log("sk");
//console.log(getApplyInfoByUerId(1));

module.exports = {
  getApplyInfoById: getApplyInfoById,
  getApplyInfoByUserId:getApplyInfoByUserId
};