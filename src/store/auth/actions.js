import $http from '../../boot/token_request'
export async function login ({commit},data) {
  try {
    const res = await $http.post('/auths/login', data);
    if (res.data.status) {
      commit('LOGIN', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function register ({commit},data) {
  try {
    const res = await $http.post('/auths/signup', data);
    if (res.data.status) {
      commit('LOGIN', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function updateUserData ({commit},data) {
  commit('UPDATE_USER_DATA', data);
}
