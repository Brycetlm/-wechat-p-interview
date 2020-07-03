let gql = null;
var gqlObj = require('./wxgql.js');
var GraphQL = gqlObj.GraphQL;
const getGqlObject = function() {
  if (!gql) {
    gql = GraphQL({
      url: 'http://localhost:3000/graphql'
    }, true);
  }
  return gql;
}

module.exports = {
  getGqlObject: getGqlObject
}