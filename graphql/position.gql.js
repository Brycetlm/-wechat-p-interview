const gql = require('./common');

const GET_POSITION_BY_ID = `
query ($positionId: Int!) {
  getPositionById(positionId:$positionId)
  {
    name,
    company_id,
  }
}
`;

const getPositionById = function(positionId) {
  return gql.getGqlObject().query({
    query:  GET_POSITION_BY_ID,
    variables: {
      positionId: positionId
    }
  });
}
//console.log(bindOpenId("sa"));



module.exports = {
  getPositionById:getPositionById
}