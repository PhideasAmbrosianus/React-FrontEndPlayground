import axios from 'axios';
import logger from './logService';

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //Headers specific to post request only

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
  if (!expectedError)  {
    logger.log('An unexpected error occured.');
  }

  console.log('wtf...', error);

  return Promise.reject(error); // This is like calling a next in Express.
  //We are returning a failed promise which gets captured by the catch block down stream
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

const exportObj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}

export default exportObj;