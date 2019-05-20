const formatMovieItem = (movie) => {
  return Object.entries(movie)
    .filter(([key]) => !key.startsWith('_'))
    .reduce((o, [key, value]) => ({...o, [key]: value}), {})
};

module.exports = { formatMovieItem };
