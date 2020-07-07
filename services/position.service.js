const gqlLogsService = require('../graphql/position.gql');



const getPositionById = function(positionId) {
  const result = gqlLogsService.getPositionById(positionId);
  return result;
}

const countPosition = function() {
  const result = gqlLogsService.countPosition();
  return result;
}

module.exports = {
  getPositionById:getPositionById,
  countPosition:countPosition
}
