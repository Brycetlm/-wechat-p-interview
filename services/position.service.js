const gqlLogsService = require('../graphql/position.gql');



const getPositionById = function(positionId) {
  const result = gqlLogsService.getPositionById(positionId);
  return result;
}

module.exports = {
  getPositionById:getPositionById
}
