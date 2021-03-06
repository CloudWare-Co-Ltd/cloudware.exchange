import $http from '../../boot/token_request'

export async function storeUser({commit}, data) {
  try {
    const res = await $http.post('/users', data);
    if (res.data.status) {
      commit('STORE_USER', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateUserPhoto({commit}, data) {
  let id = data.get('id');
  let putData = new FormData();
  putData.set('photo', data.get('photo'))
  try {
    const res = await $http.put('/users/' + id + '/update-photo', putData);
    if (res.data.status) {
      commit('UPDATE_USER', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function updateUser({commit}, data) {
  try {
    const res = await $http.put('/users/' + data.id + '/update', data.data);
    if (res.data.status) {
      commit('UPDATE_USER', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function fetchUserByBusiness({commit}, id) {
  try {
    const res = await $http.get('/users/' + id + '/fetch-by-business');
    if (res.data.status) {
      commit('SET_USER', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}

export async function editUser({commit}, id) {
  try {
    const res = await $http.get('/users/' + id + '/edit');
    return res.data
  } catch (e) {
    return false
  }
}

export async function deleteUser({commit}, id) {
  try {
    const res = await $http.delete('/users/' + id + '/delete');
    if (res.data.status) {
      commit('DELETE_USER', id);
    }
    return res.data
  } catch (e) {
    return false
  }
}
