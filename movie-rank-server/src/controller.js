const { formatMovieItem } = require('./model');

module.exports = ({ container, client }) => {

  const getMovieList = async (req, res) => {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.completed=@completed",
      parameters: [
        { name: "@completed", value: false }
      ]
    };

    const { result: results } = await container.items
      .query(querySpec)
      .toArray();

    res.status(200).send(results.map(formatMovieItem));
  };

  const saveMovieRank = async (req, res) => {
    const movie = req.body;
    console.log('***', movie)
    const { body: doc } = await container.items.upsert({
      id: `${movie.imdbID}`,
      completed: false,
      ...movie
    });
    res.status(200).send(formatMovieItem(doc));
  };

  const removeMovieRank = async (req, res) => {
    const { id } = req.params;
    const result = await container
      .item({ url: 'https://azureday-movie-rank.documents.azure.com/dbs/movies/colls/ranked-movies/docs/42'})
      .delete()

    res.status(200).send(result);
  };

  return { getMovieList, saveMovieRank, removeMovieRank };
};

const url = () => `https://azureday-movie-rank.documents.azure.com/dbs/movies/colls/ranked-movies/docs/42`
