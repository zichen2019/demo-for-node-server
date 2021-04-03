import request from '@/utils/request';
import axios from 'axios';
const baseUrl = 'http://localhost:8081';

export function getValSet(query) {
  return request(`/dynamic/fetch-value-set`, {
    method: 'GET',
    query,
  })
}

export function getConfigureList(query) {
  return request(`/dynamic/fetch-configures`, {
    method: 'GET',
    query
  })
}

export function getTableFieldsList(query) {
  return request(`/dynamic/fetch-data-list`, {
    method: 'GET',
    query
  })
}

export function updateTableDataList(params) {
  return request(`/dynamic/update-data-list`, {
    method: 'POST',
    body: params
  })
}