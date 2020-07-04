const gqlJobsService = require('../graphql/jobs.gql');

const getDefaultJobsList = function() {
  return gqlJobsService.gqlDefaultJobsList();
}

const getJobById = async function(jobId) {
  let result = await gqlJobsService.getJobById(jobId);
  return result;
}

const searchFilteredPositions = async function(searchInput, filterInput, skip, take) {
  return await gqlJobsService.searchFilteredPositions(searchInput, filterInput, skip, take);
} 

module.exports = {
  getDefaultJobsList: getDefaultJobsList,
  getJobById: getJobById,
  searchFilteredPositions: searchFilteredPositions
}