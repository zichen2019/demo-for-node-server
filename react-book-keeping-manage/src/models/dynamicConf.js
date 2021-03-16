import {
  getConfigureList
} from '@/services/dynamicConf';
import { getResponse } from '@/utils'

export default {
  namespace: 'dynamicConf',
  state: {
    dynamicConfList: []
  },
  effects: {
    *fetchList({ payload }, { call }) {
      const response = getResponse(yield call(getConfigureList, payload));
      return response && response.data;
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}