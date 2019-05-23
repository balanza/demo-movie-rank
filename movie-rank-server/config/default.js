module.exports = {
  database: {
    host: 'https://azureday-movie-rank.documents.azure.com:443/',
    authKey: 'JLQaWJgMna7JRRsCdTmnG9czOPF56gAqJlGsexVKR37kEUabNulu3uzYIZqcUUa4n9YPb4DiuqbOyQFG5U0yHg==',
    databaseId: 'movies',
    collectionIds: ['ranked-movies', 'stats'],
  },
  server: {
    port: 3001
  }
};
