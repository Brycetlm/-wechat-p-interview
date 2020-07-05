const gql = require('./common');

const GET_FAVORITE_BY_ID = `
query ($userId: Int!) {
  getFavoriteInfoByUser(userId: $userId){
    list {
      id
      user_id
      position_id
      created_at
      updated_at
      is_deleted
    }
  }
}
`

const getFavoriteById = function(userId) {
  console.log('favor.gql:userid:',userId);
  return gql.getGqlObject().query({
    query: GET_FAVORITE_BY_ID,
    variables: {
      userId: +userId
    }
  });
}

module.exports = {
  getFavoriteById: getFavoriteById
}