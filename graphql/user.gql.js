const gql = require('./common');

const GET_USER_INFO_BY_ID = `
query ($uid: Int!){
  getUserInfoById(userId: $uid){
    id
    openid
    name
    birthday
    education
    province
    city
    region
    avatar_url
    email
    phone
  }
}
`

const UPDATE_USER_INFO = `
mutation ($userInput: UserInfoUpdateInput!){
  updateUserInfo(userInput: $userInput)
}
`


const getUserInfoById = function(userId){
  return gql.getGqlObject().query({
    query: GET_USER_INFO_BY_ID,
    variables: {
      userId: +userId
    }
  });
}

const updateUserInfo = function(userInput){
  console.log(userInput);
  return gql.getGqlObject().mutate({
    mutation: UPDATE_USER_INFO,
    variables: {
      userInput: userInput
    }
  });
}

module.exports = {
  getUserInfoById: getUserInfoById,
  updateUserInfo: updateUserInfo
}
