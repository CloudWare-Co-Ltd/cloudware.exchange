import $http from '../../boot/token_request'

/****CRUD****/
//CREATE
export async function storeCurrency({commit}, data) {
  try {
    const res = await $http.post('/currencies', data);
    if (res.data.status) {
      commit('STORE_CURRENCY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//READ
export async function fetchCurrencyByBusiness({commit}, id) {
  try {
    const res = await $http.get('/currencies/' + id + '/fetch-by-business');
    if (res.data.status) {
      commit('SET_CURRENCY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editCurrency({commit}, id) {
  try {
    const res = await $http.get('/currencies/' + id + '/edit');
    return res.data
  } catch (e) {
    return false
  }
}

//UPDATE
export async function updateCurrencyPhoto({commit}, data) {
  let id = data.get('id');
  let putData = new FormData();
  putData.set('photo', data.get('photo'))
  try {
    const res = await $http.put('/currencies/' + id + '/update-photo', putData);
    if (res.data.status) {
      commit('UPDATE_CURRENCY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateCurrency({commit}, data) {
  try {
    const res = await $http.put('/currencies/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_CURRENCY', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

//DELETE
export async function deleteCurrency({commit}, id) {
  try {
    const res = await $http.delete('/currencies/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_CURRENCY', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
