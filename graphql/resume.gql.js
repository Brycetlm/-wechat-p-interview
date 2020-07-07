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
    region,
    id,
    is_deleted,
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
const DELETE_RESUME = `
mutation ($resumeId: Int!) {
  deleteResumeInfo (resumeId: $resumeId) 
 
}
`

const deleteResume = function(resumeId) {
  //console.log(resumeId);
  return gql.getGqlObject().mutate({
    mutation: DELETE_RESUME,
    variables: {
      resumeId: resumeId
    }
  });
}

module.exports = {
  updateResumeInfo: updateResumeInfo,
  getResumeInfoByUserId:getResumeInfoByUserId,
  deleteResume:deleteResume
}