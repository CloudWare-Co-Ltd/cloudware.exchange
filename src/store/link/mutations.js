export function STORE_LINK(state, payload) {
  state.links.push(payload.data)
}
export function SET_LINK(state, payload) {
  state.links = payload.data
}
