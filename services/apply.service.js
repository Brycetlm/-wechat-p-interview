const gqlApplyService = require('../graphql/apply.gql');

const getApplyInfoByUserId = function(userId) {
  return gqlApplyService.getApplyInfoByUserId(userId);
}

const deleteApply = function(applyId) {
  return gqlApplyService.deleteApply(applyId);
}

const insertApply = function(applyInput) {
  return gqlApplyService.insertApply(applyInput);
}

module.exports = {
  getApplyInfoByUserId: getApplyInfoByUserId,
  deleteApply:deleteApply,
  insertApply:insertApply
};