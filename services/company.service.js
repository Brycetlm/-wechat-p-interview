const gqlCompanyService = require('../graphql/company.gql');

const getCompanyInfoById = function(companyId) {
  return gqlCompanyService.getCompanyInfoById(companyId);
}

module.exports = {
  getCompanyInfoById: getCompanyInfoById,
};