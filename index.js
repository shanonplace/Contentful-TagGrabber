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

async function getEntriesForTag(environment, tagId) {
  return await environment
    .getEntries({
      "metadata.tags.sys.id[in]": tagId,
    })
    .catch((err) => {
      console.log(err);
    });
}

async function main() {
  //get the current contentful environment
  const environment = await getEnvironment();

  //grab all of those tags
  //Note: need the CMA to get private tags and i'm not paginating because the total number of tags is smaller than the response limit
  const allTags = await fetchTags(environment);

  //for each tag, save out the sys.id and name and then fetch the entries for that tag
  for (const tag of allTags.items) {
    const tagId = tag.sys.id;
    const tagName = tag.name;
    const entries = await getEntriesForTag(environment, tagId);

    //for each of the entries, console log tag name and id and then the entry id and title
    for (const entry of entries.items) {
      const entryId = entry.sys.id;
      const entryTitle = entry.sys.contentType.sys.id;
      console.log(`${tagName},${tagId},${entryId},${entryTitle}`);
    }

    //delay vs promise pools for now as it's a small dataset
    await delay(300);
  }
}

//chill out for a bit
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
