import $http from '../../boot/token_request'

/****CRUD****/
//CREATE
export async function storeExchangeRate({commit}, data) {
  try {
    const res = await $http.post('/exchange-rates', data);
    if (res.data.status) {
      commit('STORE_EXCHANGE_RATE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//READ
export async function fetchExchangeRateByBusiness({commit}, id) {
  try {
    const res = await $http.get('/exchange-rates/' + id + '/fetch-by-business');
    if (res.data.status) {
      commit('SET_EXCHANGE_RATE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//UPDATE
export async function updateExchangeRate({commit}, data) {
  try {
    const res = await $http.put('/exchange-rates/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_EXCHANGE_RATE', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//DELETE
export async function deleteExchangeRate({commit}, id) {
  try {
    const res = await $http.delete('/exchange-rates/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_EXCHANGE_RATE', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
