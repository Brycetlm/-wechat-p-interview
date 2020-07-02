const gqlJobsService = require('../graphql/jobs.gql');

const getDefaultJobsList = function() {
  return gqlJobsService.gqlDefaultJobsList();
}

module.exports = {
  getDefaultJobsList: getDefaultJobsList,
}