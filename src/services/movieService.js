import http from './httpService';
import config from '../config.json';

export function getMovies() {
  return http.get(`${config.apiUrl}/movies`);
}

export function getMovie(movieId) {
  return http.get(`${config.apiUrl}/movies/${movieId}`);
}

export function saveMovie(movie) {
  const isNew = !movie._id;
  
  if (isNew)
    return create(movie);
  
  return update(movie);
}

function create(movie) {
  return http.post(`${config.apiUrl}/movies`, movie);
}

function update(movie) {
  const movieId = movie._id;
  delete movie._id;
  return http.put(`${config.apiUrl}/movies/${movieId}`, movie);
}

export function deleteMovie(movieId) {
  return http.delete(`${config.apiUrl}/movies/${movieId}`);
}