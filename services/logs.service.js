const gqlLogsService = require('../graphql/logs.gql');

const getLogTest = function() {
  const result = gqlLogsService.gqlLogsTest();
  console.log("业务层：", result);
  return result;
}

module.exports = {
  getLogTest: getLogTest
}
