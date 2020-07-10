/****CRUD****/
//CREATE
export function STORE_EXCHANGE_RATE(state, payload) {
  state.exchange_rates.push(payload.data)
}
//READ
export function SET_EXCHANGE_RATE(state, payload) {
  state.exchange_rates = payload.data
}
//UPDATE
export function UPDATE_EXCHANGE_RATE(state, payload) {
  let index = state.exchange_rates.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.exchange_rates.splice(index,1,payload.data)
}
//DELETE
export function DELETE_EXCHANGE_RATE(state, id) {
  state.exchange_rates = state.exchange_rates.filter(function (x) {
    return x._id !== id
  })
}
