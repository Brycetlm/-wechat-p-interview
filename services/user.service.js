const gqlUserService = require('../graphql/user.gql');

const getUserInfoById = async function(userId) {
  let result = await gqlUserService.getUserInfoById(userId);
  return result;
}

const updateUserInfo = async function(userInput) {
  let result = gqlUserService.updateUserInfo(userInput);
  return result;
}

module.exports = {
  getUserInfoById: getUserInfoById,
  updateUserInfo: updateUserInfo,
}