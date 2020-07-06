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
export async function updateBusinessFile({commit}, data) {
  let id = data.get('id');
  let putData = new FormData();
  putData.set('photo',data.get('photo'))
  try {
    const res = await $http.put('/businesses/file/'+id, putData);
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
    const res = await $http.put('/businesses/'+data.id, data.data);
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
export async function deleteBusiness({commit}, id) {
  try {
    const res = await $http.delete('/businesses/'+id+'/delete');
    if (res.data.status) {
      commit('DELETE_BUSINESS', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
