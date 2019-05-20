const config = require('config');
const server = require('./src/server');
const { initDb } = require('./src/database');

const bootstrap = async () => {
  try {
    const db = await initDb(config.database);
    console.log(`Connected to database at ${config.database.host}`);

    await server.start({ port: config.server.port, db });
    console.log(`API listening at port ${config.server.port}`);
  } catch(ex) {
    console.error(`Failed to start server,  reason: `, ex);
    process.terminate();
  }
};

bootstrap();
