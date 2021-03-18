import {
  getValSet,
  getConfigureList,
  getTableFieldsList,
  updateTableDataList,
} from '@/services/dynamicConf';
import { getResponse } from '@/utils'

export default {
  namespace: 'dynamicConf',
  state: {
    dynamicConfList: [],
    dynamicTableList: [],
  },
  effects: {
    *fetchConfigureList({ payload }, { call }) {
      const response = getResponse(yield call(getConfigureList, payload));
      return response && response.data;
    },
    *fetchValSet({ payload }, { call }) {
      const response = getResponse(yield call(getValSet, payload));
      return response && response.data;
    },
    *fetchTableFieldsList({ payload }, { call }) {
      const response = getResponse(yield call(getTableFieldsList, payload));
      return response && response.data;
    },
    *saveTableDataList({ payload }, { call }) {
      const response = getResponse(yield call(updateTableDataList, payload));
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