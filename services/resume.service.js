const gqlResumeService = require('../graphql/resume.gql');

const updateResumeInfo = function(resumeInput) {
  return gqlResumeService.updateResumeInfo(resumeInput);
}

module.exports = {
  updateResumeInfo: updateResumeInfo
}