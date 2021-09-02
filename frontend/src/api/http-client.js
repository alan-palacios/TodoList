import axios from 'axios'

axios.defaults.timeout = 4000; // for all requests
//const urlBaseDev = 'http://localhost:5000';
const urlBase = 'https://apyolt-api-todolist.herokuapp.com';
const commonHeaders ={
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://') ? url : `${urlBase}/${url}`
const composeHeaders = (headers)=>
  ({
    ...commonHeaders,   
    ...headers,
  });

const get = (url = '', headers = {}) => axios.get(readUrl(url), {
  headers: composeHeaders(headers)
})

const post = (url = '', body = {}, headers = {}) => axios.post(readUrl(url), body, {
  headers: composeHeaders(headers)
})

const put = (url = '', body = {}, headers = {}) => axios.put(readUrl(url), body, {
  headers: composeHeaders(headers)
})

const patch = (url = '', body = {}, headers = {}) => axios.patch(readUrl(url), body, {
  headers: composeHeaders(headers)
})

const del = (url = '', headers = {}) => axios.delete(readUrl(url), {
  headers: composeHeaders(headers)
})

const functions = {
  get,
  post,
  put,
  patch,
  delete: del,
};
export default functions;