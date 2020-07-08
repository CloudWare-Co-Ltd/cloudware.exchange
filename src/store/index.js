import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import business from './business'
import user from './user'

Vue.use(Vuex)
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      business,
      user,
    },
    strict: process.env.DEV
  })
  return Store
}
