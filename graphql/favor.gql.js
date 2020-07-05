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

const GET_FAVOR_DEL = `
query ($userId: Int!) {
  getFavorDel(userId: $userId){
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

const INSERT_FAVORITE_RECORD = `
mutation ($favoriteInput: FavoriteInput!) {
  insertFavoriteRecord (favoriteInput: $favoriteInput) 
}
`

const DELETE_FAVOR = `
mutation ($favorId: Int!) {
  deleteFavor(favorId: $favorId)
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

const getFavorDel = function(userId) {
  console.log('favor.gql:userid:',userId);
  return gql.getGqlObject().query({
    query: GET_FAVOR_DEL,
    variables: {
      userId: +userId
    }
  });
}

const insertFavoriteRecord = function(favoriteInput) {
  console.log("favor.gql:favorInput:",favoriteInput);
  return gql.getGqlObject().mutate({
    mutation: INSERT_FAVORITE_RECORD,
    variables: {
      favoriteInput: favoriteInput
    }
  });
}

const deleteFavor = function(favorId) {
  return gql.getGqlObject().mutate({
    mutation: DELETE_FAVOR,
    variables: {
      favorId: favorId
    }
  });
}

module.exports = {
  getFavoriteById: getFavoriteById,
  getFavorDel: getFavorDel,
  insertFavoriteRecord: insertFavoriteRecord,
  deleteFavor: deleteFavor
}