const gqlApplyService = require('../graphql/apply.gql');

const getApplyInfoByUserId = function(userId) {
  return gqlApplyService.getApplyInfoByUserId(userId);
}

module.exports = {
  getApplyInfoByUserId: getApplyInfoByUserId,
};