/****CRUD****/
//CREATE
export function STORE_CURRENCY(state, payload) {
  state.currencies.push(payload.data)
}
//READ
export function SET_CURRENCY(state, payload) {
  state.currencies = payload.data
}
//UPDATE
export function UPDATE_CURRENCY(state, payload) {
  let index = state.currencies.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.currencies.splice(index,1,payload.data)
}
//DELETE
export function DELETE_CURRENCY(state, id) {
  state.currencies = state.currencies.filter(function (x) {
    return x._id !== id
  })
}
