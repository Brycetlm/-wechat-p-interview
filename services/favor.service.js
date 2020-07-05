const gqlFavorService = require('../graphql/favor.gql')

const getFavorById = async function(userId) {
  let result = await gqlFavorService.getFavoriteById(userId);
  return result;
}

const getFavorDel = async function(userId) {
  let result = await gqlFavorService.getFavorDel(userId);
  return result;
}

const insertFavor = async function(favoriteInput) {
  return gqlFavorService.insertFavoriteRecord(favoriteInput);
}

const deleteFavor = async function(positionId, userId) {
  return gqlFavorService.deleteFavor(positionId, userId);
}

module.exports = {
  getFavorById: getFavorById,
  getFavorDel: getFavorDel,
  insertFavor: insertFavor,
  deleteFavor: deleteFavor
}