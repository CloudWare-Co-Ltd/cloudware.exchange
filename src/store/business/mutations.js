export function STORE_BUSINESS(state, payload) {
  state.businesses.push(payload.data)
}
export function SET_BUSINESS(state, payload) {
  state.businesses = payload.data
}
export function UPDATE_BUSINESS(state, payload) {
  let index = state.businesses.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.businesses.splice(index,1,payload.data)
}
export function DELETE_BUSINESS(state, id) {
  state.businesses = state.businesses.filter(function (x) {
    return x._id !== id
  })
}
