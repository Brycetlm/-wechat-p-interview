const gql = require('./common');

const GET_COMPANY_INFO_BY_ID = `
query ($companyId: Int!) {
  getCompanyInfoById(companyId: $companyId) {
    id
    name
    profile
    province
    city
    region
    corporate
    assets
    birthday
    phone
    logo_url
  }
}
`

const getCompanyInfoById = function(companyId) {
  return gql.getGqlObject().query({
    query: GET_COMPANY_INFO_BY_ID,
    variables: {
      companyId: companyId
    }
  });
}
//console.log(getCompanyInfoById(1));








module.exports = {
  getCompanyInfoById: getCompanyInfoById
};