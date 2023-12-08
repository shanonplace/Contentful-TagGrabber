const client = require("./contentfulClient");

async function getEnvironment() {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT
  );
  return environment;
}

async function fetchTags(environment) {
  try {
    return environment.getTags();
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const environment = await getEnvironment();

  const allTags = await fetchTags(environment);
  //for each tag, save out the sys.id and name and then fetch the entries for that tag
  for (const tag of allTags.items) {
    const tagId = tag.sys.id;
    const tagName = tag.name;
    const entries = await environment.getEntries({
      "metadata.tags.sys.id[in]": tagId,
    });

    //for each of the entries, console log tag name and id and then the entry id and title
    for (const entry of entries.items) {
      const entryId = entry.sys.id;
      const entryTitle = entry.sys.contentType.sys.id;
      console.log(`${tagName},${tagId},${entryId},${entryTitle}`);
    }
    //save out the entries
    //console.log(`Saving ${entries.items.length} entries for ${tagName}`);
    // console.log(JSON.stringify(entries));

    // Delay for 1/3 second (300 milliseconds) before making the next request
    await delay(100);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();

// client
//   .getEntries({ "metadata.tags.sys.id[in]": "portMacquarie" })
//   .then((response) => console.log(JSON.stringify(response)))
//   .catch(console.error);
