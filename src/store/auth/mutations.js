import {LocalStorage} from 'quasar'

export function LOGIN(state, payload) {
  state.user.name = payload.user.name;
  state.user.phone = payload.user.phone;
  state.user.photo = payload.user.photo;
  state.user.role = payload.user.role;
  state.user.verify = payload.user.verify;
  state.user.token = payload.token;
  state.user._id = payload.user._id;
  LocalStorage.set("userInfo", {user_info: state.user})
}

export function UPDATE_USER_DATA(state, payload) {
  state.user._id = payload.user_info._id;
  state.user.name = payload.user_info.name;
  state.user.photo = payload.user_info.photo;
  state.user.phone = payload.user_info.phone;
  state.user.role = payload.user_info.role;
  state.user.verify = payload.user_info.verify;
  state.user.token = payload.user_info.token;
}
