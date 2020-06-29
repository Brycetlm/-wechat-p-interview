const gql = require('./common');

const GET_NAME = `
query ($id: Int!) {
  getName(id: $id)
}
`;

const gqlLogsTest = function () {
  return gql.getGqlObject().query({
    query: GET_NAME,
    variables: {
      id: 1
    }
  })
}

module.exports = {
  gqlLogsTest: gqlLogsTest
}