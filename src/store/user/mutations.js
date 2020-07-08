export function STORE_USER(state, payload) {
  state.users.push(payload.data)
}
export function SET_USER(state, payload) {
  state.users = payload.data
}
export function UPDATE_USER(state, payload) {
  let index = state.users.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.users.splice(index,1,payload.data)
}
export function DELETE_USER(state, id) {
  state.users = state.users.filter(function (x) {
    return x._id !== id
  })
}
