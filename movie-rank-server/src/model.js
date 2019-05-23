const formatMovieItem = (movie) => {
  return Object.entries(movie)
    .filter(([key]) => !key.startsWith('_'))
    .reduce((o, [key, value]) => ({...o, [key]: value}), {})
};

const formatStats = (stats) => {
  return Object.entries(stats)
    .filter(([key]) => !key.startsWith('_'))
    .filter(([key]) => key !== 'id')
    .reduce((o, [key, value]) => ({...o, [key]: value}), {})
};

module.exports = { formatMovieItem, formatStats };
