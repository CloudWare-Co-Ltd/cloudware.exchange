import $http from '../../boot/token_request'

export async function storeLink({commit}, data) {
  try {
    const res = await $http.post('/links', data);
    if (res.data.status) {
      commit('STORE_LINK', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchLink({commit}) {
  try {
    const res = await $http.get('/links');
    if (res.data.status) {
      commit('SET_LINK', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
