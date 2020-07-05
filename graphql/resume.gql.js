const gql = require('./common');


//更新resume
const UPDATE_RESUME_INFO = `
mutation ($resumeInput: ResumeInput!) {
  updateResumeInfo (resumeInput: $resumeInput) 
}
`;

const updateResumeInfo = function(resumeInput) {
  console.log(resumeInput);
  return gql.getGqlObject().mutate({
    mutation: UPDATE_RESUME_INFO,
    variables: {
      resumeInput: resumeInput
    }
  });
}

//获得resume信息
const GET_RESUME_INFO_BY_ID = `
query ($userId: Int!) {
  getResumeInfoByUserId (userId: $userId) 
  {
    name,
    salary_min,
    salary_max,
    exp,
    province,
    city,
    region
  }
}
`;

const getResumeInfoByUserId = function(userId) {
  //console.log(resumeId);
  return gql.getGqlObject().query({
    query: GET_RESUME_INFO_BY_ID,
    variables: {
      userId: userId
    }
  });
}


module.exports = {
  updateResumeInfo: updateResumeInfo,
  getResumeInfoByUserId:getResumeInfoByUserId
}