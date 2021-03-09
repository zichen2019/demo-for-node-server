import axios from 'axios';
const basicUrl = 'http://localhost:8081';

export async function getBookKeepList(params) {
  return axios.get(`${basicUrl}/book-keeping/get-list`, {
    params
  })
  
  // request(`${HZERO_FILE}/v1/${organizationId}/files`, {
  //   method: 'GET',
  //   query: params,
  // });
}