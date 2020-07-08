import $http from '../../boot/token_request'

export async function storeBusiness({commit}, data) {
  try {
    const res = await $http.post('/businesses', data);
    if (res.data.status) {
      commit('STORE_BUSINESS', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateBusinessLogo({commit}, data) {
  let id = data.get('id');
  let putData = new FormData();
  putData.set('logo', data.get('logo'))
  try {
    const res = await $http.put('/businesses/' + id + '/update-logo', putData);
    if (res.data.status) {
      commit('UPDATE_BUSINESS', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateBusiness({commit}, data) {
  try {
    const res = await $http.put('/businesses/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_BUSINESS', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchBusiness({commit}) {
  try {
    const res = await $http.get('/businesses');
    if (res.data.status) {
      commit('SET_BUSINESS', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editBusiness({commit}, id) {
  try {
    const res = await $http.get('/businesses/' + id + '/edit');
    return res.data
  } catch (e) {
    return false
  }
}

export async function deleteBusiness({commit}, id) {
  try {
    const res = await $http.delete('/businesses/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_BUSINESS', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
