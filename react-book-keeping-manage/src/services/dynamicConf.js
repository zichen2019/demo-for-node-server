import axios from 'axios';
const basicUrl = 'http://localhost:8081';

export function getConfigureList(query) {
  return axios.get(`${basicUrl}/dynamic/fetch-configures`, {
    query
  })
}