const gqlResumeService = require('../graphql/resume.gql');

const updateResumeInfo = function(resumeInput) {
  return gqlResumeService.updateResumeInfo(resumeInput);
}

const getResumeInfoByUserId = function(userId) {
  return gqlResumeService.getResumeInfoByUserId(userId);
}

const deleteResume = function(resumeId) {
  return gqlResumeService.deleteResume(resumeId);
}


module.exports = {
  updateResumeInfo: updateResumeInfo,
  getResumeInfoByUserId:getResumeInfoByUserId,
  deleteResume:deleteResume
}