const gql = require('./common');

const GET_POSITION_BY_ID = `
query ($positionId: Int!) {
  getPositionById(positionId:$positionId)
  {
    name,
    company_id,
    salary_min,
    salary_max,
    created_at,
  }
}
`;

//实际上不需要输入参数userid
const COUNT_POSITION = `
query ($userId: Int!) {
  countPosition(userId:$userId)
 
}
`;


const countPosition=function()
{
  return gql.getGqlObject().query({
    query:  COUNT_POSITION,
    variables: {
      userId: 1
    }
  });
}

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
  getPositionById:getPositionById,
  countPosition:countPosition,
}