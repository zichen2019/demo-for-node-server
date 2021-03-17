import axios from 'axios';
const basicUrl = 'http://localhost:8081';

export function getValSet(query) {
  return axios.get(`${basicUrl}/dynamic/fetch-value-set`, {
    query
  })
}

export function getConfigureList(query) {
  return axios.get(`${basicUrl}/dynamic/fetch-configures`, {
    query
  })
}

export function getTableFieldsList(query) {
  return axios.get(`${basicUrl}/dynamic/fetch-data-list`, {
    query
  })
}

export function updateTableDataList(params) {
  return axios.post(`${basicUrl}/dynamic/update-data-list`, params)
}