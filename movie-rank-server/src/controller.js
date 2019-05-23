const { formatMovieItem, formatStats } = require('./model');

module.exports = ({ containers, client }) => {

  const rankedMovies = containers['ranked-movies'];
  const stats = containers['stats'];

  const getMovieList = async (req, res) => {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.completed=@completed",
      parameters: [
        { name: "@completed", value: false }
      ]
    };

    const { result: results } = await rankedMovies.items
      .query(querySpec)
      .toArray();

    res.status(200).send(results.map(formatMovieItem));
  };

  const saveMovieRank = async (req, res) => {
    const movie = req.body;
    const { body: doc } = await rankedMovies.items.upsert({
      id: `${movie.imdbID}`,
      completed: false,
      ...movie
    });
    res.status(200).send(formatMovieItem(doc));
  };

  const getMyStats = async (req, res) => {
    const { result } = await stats.items.readAll()
      .toArray();

    const myStats = result
      .filter(({id})=>id==='my-stats')
      .map(formatStats)[0];

    res.status(200).send(myStats);
  };

  return { getMovieList, saveMovieRank, getMyStats };
};
