import {LocalStorage} from 'quasar'

export default function () {
  return {
    user: {
      _id: null,
      name: null,
      photo: null,
      phone: null,
      role: "user",
      verify: false,
      token: LocalStorage.getItem("userInfo") || '',
    },
  }
}
