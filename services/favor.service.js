const gqlFavorService = require('../graphql/favor.gql')

const getFavorById = async function(userId) {
  let result = await gqlFavorService.getFavoriteById(userId);
  return result;
}

module.exports = {
  getFavorById: getFavorById
}