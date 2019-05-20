const { CosmosClient } = require("@azure/cosmos");

const initDb = async ({ host, authKey, databaseId, collectionId }) => {

  const client = new CosmosClient({
    endpoint: host,
    auth: {
      masterKey: authKey
    }
  });

  const database = await client.databases
    .createIfNotExists({id: databaseId})
    .then(dbResponse => dbResponse.database);

  const container = await database.containers
    .createIfNotExists({id: collectionId})
    .then(coResponse => coResponse.container);

  return { database, container, client };

};

module.exports = { initDb };
