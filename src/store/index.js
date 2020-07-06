import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import business from './business'

Vue.use(Vuex)
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      business,
    },
    strict: process.env.DEV
  })
  return Store
}
