const gqlUserService = require('../graphql/user.gql');
const gqlLogsService = require('../graphql/logs.gql');

const getAvatar = async function(openId) {
  const ID = await gqlLogsService.bindOpenId(openId);
  const id = parseInt(ID.bindOpenId);
  let userInfo = await gqlUserService.getUserInfoById(id);
  let avatar = userInfo.getUserInfoById.avatar_url;
  return avatar;
}

const getName = async function(openId) {
  const ID = await gqlLogsService.bindOpenId(openId);
  const id = parseInt(ID.bindOpenId);
  let userInfo = await gqlUserService.getUserInfoById(id);
  let name = userInfo.getUserInfoById.name;
  return name;
}

const getMail = async function(openId) {
  const ID = await gqlLogsService.bindOpenId(openId);
  const id = parseInt(ID.bindOpenId);
  let userInfo = await gqlUserService.getUserInfoById(id);
  let mail = userInfo.getUserInfoById.email;
  return mail;
}

module.exports = {
  getAvatar: getAvatar,
  getName: getName,
  getMail: getMail,
}