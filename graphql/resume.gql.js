const gql = require('./common');

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

module.exports = {
  updateResumeInfo: updateResumeInfo
}