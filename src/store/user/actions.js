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

export async function updateUserLogo({commit}, data) {
  let id = data.get('id');
  let putData = new FormData();
  putData.set('logo', data.get('logo'))
  try {
    const res = await $http.put('/users/' + id + '/update-logo', putData);
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

export async function fetchUser({commit}) {
  try {
    const res = await $http.get('/users');
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
