const { CosmosClient } = require("@azure/cosmos");

const initDb = async ({ host, authKey, databaseId, collectionIds }) => {

  const client = new CosmosClient({
    endpoint: host,
    auth: {
      masterKey: authKey
    }
  });

  const database = await client.databases
    .createIfNotExists({id: databaseId})
    .then(dbResponse => dbResponse.database);

  const containers = {};

  for (collectionId of collectionIds) {
    containers[collectionId] = await database.containers
      .createIfNotExists({id: collectionId})
      .then(coResponse => coResponse.container);
  }

  return { database, containers, client };

};

module.exports = { initDb };
