import { API_URL } from './constants';

const get = url => fetch(`${API_URL}${url}`).then(res => res.json());
const post = (url, data) =>
  fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

export const getRankedMovies = () => get('/');
export const saveRank = movie => post('/', movie);
