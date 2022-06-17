import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  const isNew = !movie._id;
  
  if (isNew)
    return create(movie);
  
  return update(movie);
}

function create(movie) {
  return http.post(apiEndpoint, movie);
}

function update(movie) {
  const body = {...movie};
  delete body._id;
  return http.put(movieUrl(movie._id), body);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}