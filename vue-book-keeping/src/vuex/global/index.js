import { getBookKeepList } from '@/services/bookKeepServices'


const state = {
  showBookRecord: false
}

const getters = {};
const mutations = {};
const actions = {};
let upperCaseKey;
Object.keys(state).forEach(key => {
  upperCaseKey = key.substr(0, 1).toUpperCase() + key.substr(1);
  // set basic getters
  getters[`get${upperCaseKey}`] = state => state[key];

  // set basic mutations
  mutations[`set${upperCaseKey}`] = function (state, payload) {
    state[key] = payload;
  }

  // set basic actions
  actions[`patch${upperCaseKey}`] = function ({ commit, state }, payload) {
    commit(`set${upperCaseKey}`, payload);
  }
})

actions.getBookKeepList = async function({ commit, state }, {type, ...params}) {
  console.log('params=', params)
  const result = await getBookKeepList(params);
  return result && result.data;
}



export default {
  state,
  getters,
  mutations,
  actions
}

