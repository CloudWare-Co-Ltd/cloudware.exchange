import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import business from './business'
import user from './user'
import currency from './currency'
import exchange_rate from './exchange-rate'

Vue.use(Vuex)
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      business,
      user,
      currency,
      exchange_rate,
    },
    strict: process.env.DEV
  })
  return Store
}
