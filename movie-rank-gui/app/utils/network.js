const get = url => fetch(url).then(res => res.json());
const post = (url, data) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

export const getRankedMovies = apiUrl => get(`${apiUrl}/`);
export const saveRank = (apiUrl, movie) => post(`${apiUrl}/`, movie);
