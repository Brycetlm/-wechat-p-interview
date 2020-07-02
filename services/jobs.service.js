const gqlJobsService = require('../graphql/jobs.gql');

const getDefaultJobsList = function() {
  return gqlJobsService.gqlDefaultJobsList();
}

const getJobById = async function(jobId) {
  let result = await gqlJobsService.getJobById(jobId);
  return result;
}

module.exports = {
  getDefaultJobsList: getDefaultJobsList,
  getJobById: getJobById,
}