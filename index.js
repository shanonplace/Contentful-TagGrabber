const client = require("./contentfulClient");

async function fetchTags() {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT
  );

  try {
    return environment.getTags();
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const allTags = await fetchTags();
  console.log(allTags);
}

main();

// client
//   .getEntries({ "metadata.tags.sys.id[in]": "portMacquarie" })
//   .then((response) => console.log(JSON.stringify(response)))
//   .catch(console.error);
