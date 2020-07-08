const gql = require('./common');

const GET_APPLY_INFO_BY_ID = `
query ($userId: Int!) {
  getApplyInfoById(userId: $userId) {
   state,
   create_at,
  }
}
`
const DELETE_APPLY = `
mutation ($applyId: Int!) {
  deleteApply(applyId: $applyId)
}
`

//确定之后插入新apply
const INSERT_APPLY = `
mutation ($applyInput: ApplyInput!) {
  insertApplyRecord(applyInput: $applyInput)
}
`
const insertApply = function(applyInput) {
  return gql.getGqlObject().query({
    query: INSERT_APPLY,
    variables: {
      applyInput: applyInput
    }
  });
}

const deleteApply = function(applyId) {
  return gql.getGqlObject().mutate({
    mutation: DELETE_APPLY,
    variables: {
      applyId: applyId
    }
  });
}

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
    is_deleted,
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
  getApplyInfoByUserId:getApplyInfoByUserId,
  deleteApply:deleteApply,
  insertApply:insertApply
};