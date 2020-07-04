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

const GET_POSITION_BY_ID = `
query ($positionId: Int!) {
	getPositionById(positionId: $positionId) {
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
`;

const SEARCH_FILTERED_POSITIONS = `
query ($skip: Int, $take: Int, $filterInput: PositionFilterInput, $searchInput: String) {
	searchFilteredPositions(skip: $skip, take: $take, filterInput: $filterInput, searchInput: $searchInput) {
    list {
      id
      company_id
      name
      profile
      condition
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

const getJobById = function(jobId) {
  return gql.getGqlObject().query({
    query: GET_POSITION_BY_ID,
    variables: {
      positionId: +jobId
    }
  });
}

const searchFilteredPositions = function(searchInput, filterInput, skip, take) {
  return gql.getGqlObject().query({
    query: SEARCH_FILTERED_POSITIONS,
    variables: {
      searchInput: searchInput,
      filterInput: filterInput,
      skip: skip,
      take: take
    }
  });
}

module.exports = {
  gqlDefaultJobsList: gqlDefaultJobsList,
  getJobById: getJobById,
  searchFilteredPositions: searchFilteredPositions
}