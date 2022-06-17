import axios from 'axios';
import logger from './services/logService';

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
  if (!expectedError)  {
    logger.log('An unexpected error occured.');
  }

  return Promise.reject(error); // This is like calling a next in Express.
  //We are returning a failed promise which gets captured by the catch block down stream
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}