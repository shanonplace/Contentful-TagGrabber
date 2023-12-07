require("dotenv").config();
const contentfulManagement = require("contentful-management");

const client = contentfulManagement.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_CMA_ACCESS_TOKEN,
});

module.exports = client;
