const gql = require('./common');

const GET_DEFAULT_POSITIONS = `
query {
  getDefaultPositions {
    list {
      id
      company_id
      name
      profile
      condition
      tags
      created_at
      updated_at
    }
  }
}
`;

const gqlDefaultJobsList = function () {
  return gql.getGqlObject().query({
    query: GET_DEFAULT_POSITIONS,
  })
}

module.exports = {
  gqlDefaultJobsList: gqlDefaultJobsList
}